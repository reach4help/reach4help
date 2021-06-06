import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';

dotenv.config();
const algoliaAdminKey = process.env.REACT_APP_ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID || 'undefined';
const client = algoliasearch(algoliaAppId, algoliaAdminKey);

export const isValidMarkerJSON = json => {
  const latlng = json?.loc?.latlng;
  const isValid = latlng?.latitude && latlng?.longitude;
  return isValid ? true : false;
};

export const configAlgoliaIndex = async indexName => {
  const index = client.initIndex(indexName);
  await index.setSettings({
    searchableAttributes: ['source.name'],
    paginationLimitedTo: 5000,
    hitsPerPage: 1000,
    customRanking: ['desc(links_count)'],
  });
  console.log('Index configured.');
};

export async function processAlgolia(dataJSON, indexName, deleteAppendMode) {
  const hits = dataJSON.hits ? dataJSON.hits : dataJSON;

  if (!validateMarkerJSON(dataJSON)) {
    throw 'Invalid json';
  }
  hits.forEach(marker => {
    // double check JSON is valid
    console.log('a');
    if (isValidMarkerJSON(marker)) {
      const latlng = marker?.loc?.latlng;
      marker._geoloc = {
        lat: latlng?.latitude,
        lng: latlng?.longitude,
      };
      marker.objectID = marker.id;
    } else {
      throw 'One or more records are invalid.  Run validate script.';
    }
    console.log('b', marker.objectID, marker._geoloc);
  });
  const index = client.initIndex(indexName);
  console.log('Getting initial count');
  const initialSearch = await index.search('', { attributesToRetrieve: null });
  const initialCount = initialSearch.nbHits;
  if (deleteAppendMode != 'DELETE' && deleteAppendMode != 'UPSERT') {
    throw 'Specify DELETE or UPSERT for third parameter';
  } else if (deleteAppendMode === 'DELETE') {
    console.log('Deleting', algoliaAdminKey, algoliaAppId);
    await index.clearObjects();
  }
  console.log(`Found ${initialCount}`);
  console.log('Saving');
  await index.saveObjects(dataJSON);
  console.log('Getting final count');
  const finalSearch = await index.search('', { attributesToRetrieve: null });
  const finalCount = finalSearch.nbHits;
  await configAlgoliaIndex(indexName);
  console.log(`Initial count: ${initialCount}`);
  console.log(`Final count (may not be accurate due to timing): ${finalCount}`);
}

export function validateMarkerJSON(dataJSON) {
  const hits = dataJSON.hits ? dataJSON.hits : dataJSON;
  let badJSON = [];
  hits.forEach((marker, i) => {
    if (!isValidMarkerJSON(marker)) {
      badJSON.push({ record: i + 1, marker });
    }
  });

  if (badJSON.length === 0) {
    console.log('Records are valid');
    return true;
  }
  console.log(`${badJSON.length} records are invalid.`);
  console.log('Bad JSON', badJSON);
  console.log('Bad JSON as string', JSON.stringify(badJSON));
  return false;
}

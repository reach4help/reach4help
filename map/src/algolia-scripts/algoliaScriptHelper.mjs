/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const algoliaAdminKey = process.env.REACT_APP_ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID || 'undefined';
const client = algoliasearch(algoliaAppId, algoliaAdminKey);

export const isValidMarkerJSON = json => {
  const latlng = json?.loc?.latlng;
  const isValid = latlng?.latitude && latlng?.longitude;
  // eslint-disable-next-line no-unneeded-ternary
  return isValid ? true : false;
};

export const configAlgoliaIndex = async indexName => {
  const index = client.initIndex(indexName);
  await index.setSettings({
    searchableAttributes: ['source.name'],
    paginationLimitedTo: 5000,
    hitsPerPage: 1000,
  });
  console.log('Index configured.');
};

export const validateMarkerJSON = dataJSON => {
  const hits = dataJSON.hits ? dataJSON.hits : dataJSON;
  const badJSON = [];
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
};

export const processAlgolia = async (dataJSON, indexName, deleteAppendMode) => {
  const hits = dataJSON.hits ? dataJSON.hits : dataJSON;

  if (!validateMarkerJSON(dataJSON)) {
    throw new Error('Invalid json');
  }
  hits.forEach(marker => {
    // double check JSON is valid
    if (isValidMarkerJSON(marker)) {
      const latlng = marker?.loc?.latlng;
      marker._geoloc = {
        lat: latlng?.latitude,
        lng: latlng?.longitude,
      };
      if (!marker.id) {
        marker.id = uuidv4();
      }
      marker.objectID = marker.id;
    } else {
      throw new Error('One or more records are invalid.  Run validate script.');
    }
  });
  const index = client.initIndex(indexName);
  let initialCount = 0;
  if (await index.exists()) {
    const initialSearch = await index.search('', {
      attributesToRetrieve: null,
    });
    initialCount = initialSearch.nbHits;
  }
  if (deleteAppendMode !== 'DELETE' && deleteAppendMode !== 'UPSERT') {
    throw new Error('Specify DELETE or UPSERT for third parameter');
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
};

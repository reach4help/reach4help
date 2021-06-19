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
  const isValid = !!(latlng?.latitude && latlng?.longitude);
  // eslint-disable-next-line no-unneeded-ternary
  return isValid;
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

export const deleteAll = async indexName => {
  const index = client.initIndex(indexName);
  await index.clearObjects();
};

export const deleteByKeyWord = async (indexName, keyWord) => {
  const index = client.initIndex(indexName);
  try {
    // note: for below to work, source.name has to be specified in config of
    // Algolia index for both filters and facetFilters.
    const results = await index
      .deleteBy({ filters: `source.name:${keyWord}` })
      .catch(err => console.log(err));
    console.log('Deleted ', indexName, keyWord, results);
  } catch (err) {
    console.log(err);
  }
};

export const processAlgolia = async (dataJSON, indexName) => {
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
      marker.createdAt = new Date();
      marker.updatedAt = marker.createdAt;
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

  console.log(`Found ${initialCount}`);
  console.log('Saving');
  await index.saveObjects(dataJSON);
  console.log('Getting temporary count.');
  const finalSearch = await index.search('', { attributesToRetrieve: null });
  const finalCount = finalSearch.nbHits;
  console.log(
    `Temporary count: ${finalCount}.  Count may not be accurate as processing ` +
      'may not be complete.',
  );
  await configAlgoliaIndex(indexName);
};

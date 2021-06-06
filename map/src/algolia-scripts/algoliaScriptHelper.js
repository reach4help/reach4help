import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';

dotenv.config();
const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.ALGOLIA_APP_ID || 'undefined';
const client = algoliasearch(algoliaAppId, algoliaAdminKey);

export const isValidMarkerJson = json => {
  const isValid =
    json?.loc?.latlng?.latitude && json?.loc?.latlng?.longitude && json?.id;
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

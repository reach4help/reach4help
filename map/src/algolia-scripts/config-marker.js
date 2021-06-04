/* eslint-disable no-console */
import algoliasearch from 'algoliasearch';

const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY;
const algoliaAppId = process.env.ALGOLIA_APP_ID;
const client = algoliasearch(algoliaAppId, algoliaAdminKey);
const index = client.initIndex('markers-dev');

index
  .setSettings({
    searchableAttributes: ['source.name'],
    paginationLimitedTo: 5000,
    hitsPerPage: 1000,
    customRanking: ['desc(links_count)'],
  })
  .then(() => {
    console.log('done');
  })
  .catch(err => {
    console.log('err', err);
  });

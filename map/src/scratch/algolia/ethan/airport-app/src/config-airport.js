import dotenv from 'dotenv';
dotenv.config();

import algoliasearch from 'algoliasearch';

const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('airports');
console.log(ALGOLIA_APP_ID, 'x', ALGOLIA_ADMIN_KEY);
index
  .setSettings({
    searchableAttributes: ['name', 'city', 'country', 'iata_code'],
    customRanking: ['desc(links_count)'],
  })
  .then(() => {
    console.log('done');
  })
  .catch(err => {
    console.log('err', err);
  });

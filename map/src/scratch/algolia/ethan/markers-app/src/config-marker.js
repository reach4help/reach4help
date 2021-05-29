import algoliasearch from 'algoliasearch';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
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


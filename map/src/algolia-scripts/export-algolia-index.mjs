/* eslint-disable no-console */

/**
 * Exports algolia index to specified json file
 *
 * @param param1 Name of json file
 * @param param2 Name of existing Algolia index
 */

import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
const jsonFilename = argv[2];
const indexName = argv[3];

const algoliaAdminKey = process.env.REACT_APP_ALGOLIA_ADMIN_KEY;
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID;
const client = algoliasearch(algoliaAppId, algoliaAdminKey);
const index = client.initIndex(indexName);

if (!indexName) {
  throw new Error('Index name required');
}

let hits = [];
index
  .browseObjects({
    // eslint-disable-next-line no-return-assign
    query: '', // Empty query will match all records
    hitsPerPage: 1000,
    batch: batch => {
      hits = hits.concat(batch);
    },
  })
  .then(() => {
    console.log(
      'Loading inished! We got %d hits.  Now, writing file.',
      hits.length,
    );
    fs.writeFileSync(
      jsonFilename,
      JSON.stringify(hits, null, 2),
      'utf-8',
      err => {
        if (err) {
          throw err;
        }
        console.log('Your index was successfully exported!');
      },
    );
  })
  .catch(err => {
    console.log(err);
  });

/* eslint-disable no-console */
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import fs from 'fs';

// eslint-disable-next-line import/extensions
import { markerConfig } from './config-algolia-index.js';

dotenv.config();
// argv holds an array of values passed to this script
// argv[0] => info about node
// argv[1] => file spec for the script
// argv[2...n] => values passed to the script
const { argv } = process;
let jsonFilename = argv[2];
const indexName = argv[3];
const confirm = argv[4];

jsonFilename = jsonFilename.includes('/') ? jsonFilename : `./${jsonFilename}`;

if (indexName === 'markers' && confirm !== 'confirm-markers') {
  // eslint-disable-next-line no-throw-literal
  throw 'If index is marker,  third parameter must be "confirm-markers".';
}

/* eslint-disable no-console */
/**
 * Loads a json file of markers into a new or existing Algolia index
 *
 * @param param1 Name of json file
 * @param param2 Name of new or existing Algolia index
 * @param param3 Confirm parameter, if loading into markers index.  Must have value 'markers' if loading into markers index.
 */

const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.ALGOLIA_APP_ID || 'undefined';
const client = algoliasearch(algoliaAppId, algoliaAdminKey);
const index = client.initIndex(indexName);
await index.clearObjects();

markerConfig(indexName);

let dataJSON = fs.readFileSync(jsonFilename, {
  encoding: 'utf8',
  flag: 'r',
});
dataJSON = JSON.parse(dataJSON);

const hits = dataJSON.hits ? dataJSON.hits : dataJSON;
let num = 0;

for (const marker of hits) {
  const latlng = marker.loc?.latlng;
  if (latlng) {
    num += 1;
    marker._geoloc = { lat: latlng.latitude, lng: latlng.longitude };
    marker.objectID = marker.id;
  }
}

index
  .saveObjects(dataJSON, {
    autoGenerateObjectIDIfNotExist: true,
  })
  .then(console.log('Records processed..wait for completed'))
  .catch(err => console.log(`error ${JSON.stringify(err, null, 2)}`));

console.log('Completed...wait for script to finish');

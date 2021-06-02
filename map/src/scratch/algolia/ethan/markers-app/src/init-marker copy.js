
/**
 * Loads a json file of markers into a new or existing Algolia index
 * 
 * @param param1 Name of json file
 * @param param2 Name of new or existing Algolia index
 * @param param3 Confirm parameter, if loading into markers index.  Must have value "markers" if loading into markers index.
 */

import algoliasearch from 'algoliasearch';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// argv holds an array of values passed to this script
// argv[0] => info about node
// argv[1] => file spec for the script
// argv[2...n] => values passed to the script
const argv = process.argv;
let jsonFile = argv[2];
const index = argv[3];
const confirm = argv(4);

jsonFile = jsonFile.includes('/') ? jsonFile : './' + jsonFile;

if (!jsonFile || !index ) {
  throw 'Parameters required.  Read script documentation in file for info';
}

const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(index);
await index.clearObjects();
// await client.deleteIndex(index);


index
  .setSettings({
    searchableAttributes: ['source.name'],
    paginationLimitedTo: 5000,
    customRanking: ['desc(links_count)'],
  })
  .then(() => {
    console.log('done');
  })
  .catch(err => {
    console.log('err', err);
  });

let dataJSON = fs.readFileSync(, {
  encoding: 'utf8',
  flag: 'r',
});

dataJSON = JSON.parse(dataJSON);
let num = 0;
for (const marker of dataJSON) {
  const latlng = marker.loc?.latlng;
  if (latlng) {
    num = num + 1;
    marker._geoloc = { lat: latlng.latitude, lng: latlng.longitude };
  }
}
console.log('num', num, dataJSON.length);
index
  .addObjects(dataJSON, {
    autoGenerateObjectIDIfNotExist: true,
  })
  .then(console.log('Records processed'))
  .catch(err => console.log('error ' + JSON.stringify(err, null, 2)));

console.log('Completed');

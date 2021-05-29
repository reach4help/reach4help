import algoliasearch from 'algoliasearch';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('markers-dev');
await client.deleteIndex('markers-dev');

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

let dataJSON = fs.readFileSync('./markers.json', {
  encoding: 'utf8',
  flag: 'r',
});

dataJSON = JSON.parse(dataJSON);
let num = 0;
for (const marker of dataJSON) {
  const latlng = marker.loc?.latlng;
  if ( latlng ){
    num = num+1;
    marker._geoloc = { lat: latlng.latitude, lng: latlng.longitude}
  }
}
console.log('num', num, dataJSON.length)
index
  .addObjects(dataJSON, {
    autoGenerateObjectIDIfNotExist: true,
  })
.then(console.log('added'))
.catch(err => console.log('error ' + JSON.stringify(err, null, 2)));

console.log('after');

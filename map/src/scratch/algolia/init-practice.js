const TEMP_ALGOLIA_SEARCH_KEY = '64cbbb13b660c14d05c65214d63b1ea8';
const ALGOLIA_APP_ID = 'F7OG87T3T6';
import algoliasearch from 'algoliasearch';
import fs from 'fs';

const client = algoliasearch(ALGOLIA_APP_ID, TEMP_ALGOLIA_SEARCH_KEY);
const index = client.initIndex('contacts');

index
  .setSettings({
    searchableAttributes: [
      'lastname',
      'firstname',
      'company',
      'email',
      'city',
      'address',
    ],
  })
  .then(() => {
    // done
    console.log('done adding searchable attributes');
  });

// Calling the readFileSync() method
// to read 'input.txt' file
let contactsJSON = fs.readFileSync('./contacts.json', {
  encoding: 'utf8',
  flag: 'r',
});

contactsJSON = JSON.parse(contactsJSON);

index
  .saveObjects(contactsJSON, {
    autoGenerateObjectIDIfNotExist: true,
  })
  .then(result => {
    console.log('I am here');
    console.log(result);
  })
  .catch(err => console.log('error ' + JSON.stringify(err, null, 2)));

console.log('after');

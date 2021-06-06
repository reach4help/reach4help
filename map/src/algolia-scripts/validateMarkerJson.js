/* eslint-disable no-console */

/**
 * Validates json file has objectId and loc.latlng
 *
 * @param param1 Name of json file
 */

import fs from 'fs';

import dotenv from 'dotenv';

import { isValidMarkerJson } from './algoliaScriptHelper.js';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
const jsonFilename = argv[2];

export function validateMarkerJson(jsonFilename) {
  let dataJSON = fs.readFileSync(jsonFilename, {
    encoding: 'utf8',
    flag: 'r',
  });
  dataJSON = JSON.parse(dataJSON);

  const hits = dataJSON.hits ? dataJSON.hits : dataJSON;
  let badJson = [];
  hits.forEach((marker, i) => {
    if (!isValidMarkerJson(marker)) {
      badJson.push({ record: i + 1, marker });
    }
  });

  if (badJson.length === 0) {
    console.log('Records are valid');
    return true;
  }
  console.log(`${badJson.length} records are invalid.`);
  console.log('Bad JSON', badJson);
  console.log('Bad JSON as string', JSON.stringify(badJson));
  return false;
}

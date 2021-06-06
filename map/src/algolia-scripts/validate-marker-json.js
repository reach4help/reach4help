/* eslint-disable no-console */

/**
 * Validates json file has objectID and loc.latlng
 *
 * @param param1 Name of json file
 */

import dotenv from 'dotenv';
import { validateMarkerJSON } from './algoliaScriptHelper.js';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
const jsonFilename = argv[2];

let dataJSON = fs.readFileSync(jsonFilename, {
  encoding: 'utf8',
  flag: 'r',
});
dataJSON = JSON.parse(dataJSON);
validateMarkerJSON(dataJSON);

// TODO: add parameter for whether to delete or upsert, change to use await

/**
 * Loads a json file of markers into a new or existing Algolia index.
 *
 * Required env variables: REACT_APP_ALGOLIA_APP_ID, REACT_APP_ALGOLIA_ADMIN_KEY
 *
 * Example:
 * node import-marker-json-to-algolia-index json/markers-downloaded-from-prod markers-dev =>
 *    uploads json file to an Algolia index
 *
 * @param param1 Name of json file
 * @param param2 Name of new or existing Algolia index
 * @param param3 Required to provide if loading into markers index as a precaution.  Must have value 'confirm-markers' if loading into markers index.
 *               Parameter is the name of the production index, so value is required if loading into markers index.
 */

/* eslint-disable no-console */
import dotenv from 'dotenv';
import fs from 'fs';

// eslint-disable-next-line import/extensions
import { processAlgolia } from './algoliaScriptHelper.mjs';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
let jsonFilename = argv[2];
const indexName = argv[3];

jsonFilename = jsonFilename?.includes('/') ? jsonFilename : `./${jsonFilename}`;

/* eslint-disable no-console */

let dataJSON = fs.readFileSync(jsonFilename, {
  encoding: 'utf8',
  flag: 'r',
});
dataJSON = JSON.parse(dataJSON);

await processAlgolia(dataJSON, indexName);

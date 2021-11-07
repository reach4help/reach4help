/* eslint-disable no-console */

/**
 * Deletes all objects (records) from an index
 *
 * @param param1 Name of existing Algolia index
 */

import dotenv from 'dotenv';

import { deleteAll } from './algoliaScriptHelper.mjs';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
const indexName = argv[2];

if (!indexName) {
  throw new Error('Index name required');
}
deleteAll(indexName);

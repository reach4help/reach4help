/* eslint-disable no-console */

/**
 * Deletes all records where source.name is mutualaidhub.org
 *
 * @param param1 Name of existing Algolia index
 */

import dotenv from 'dotenv';

import { deleteByKeyWord } from './algoliaScriptHelper.mjs';

const MUTUAL_AID_HUB_VALUE = 'mutualaidhub.org';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
const indexName = argv[2];

if (!indexName) {
  throw new Error('Index name required');
}
deleteByKeyWord(indexName, MUTUAL_AID_HUB_VALUE);

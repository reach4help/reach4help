/* eslint-disable no-console */

/**
 * Validates json file has objectId and loc.latlng
 *
 * @param param1 Name of json file
 */

import dotenv from 'dotenv';
import { validateMarkerJson } from './validateMarkerJson.js';

dotenv.config(); // enables process.env to work.  Required for JS, not React.
const { argv } = process;
const jsonFilename = argv[2];

validateMarkerJson(jsonFilename);

/* eslint max-len: 0 */
import merge from 'lodash/merge';
import { difference } from 'src/util';

import { PartialLanguage } from '../iface';
import stringsEN from './en.json';
import stringsBR from './pt-BR.json';
import stringsPT from './pt-PT.json';

// Remove strings that are just english
const filteredStringsPT = difference(stringsPT, stringsEN);
const filteredStringsBR = difference(stringsBR, stringsEN);

const LANG: PartialLanguage = {
  meta: {
    name: 'Português',
    direction: 'ltr',
  },
  // Use both brazillian and portuguese strings, prioritizing non-brazillian
  strings: merge(filteredStringsBR, filteredStringsPT),
};

export default LANG;

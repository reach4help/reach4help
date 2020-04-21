/* eslint max-len: 0 */
import { PartialLanguage } from '../iface';
import strings from './hi.json';

const LANG: PartialLanguage = {
  meta: {
    name: 'हिन्दी',
    direction: 'ltr',
  },
  strings,
};

export default LANG;

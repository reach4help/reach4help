/* eslint max-len: 0 */
import { PartialLanguage } from '../iface';
import strings from './zh-CN.json';

const LANG: PartialLanguage = {
  meta: {
    name: '中文',
    direction: 'ltr',
  },
  strings,
};

export default LANG;

import { Strings } from './iface';
import en from './langs/en';

const STRINGS = {
  en,
};

type Language = keyof typeof STRINGS;

const getLanguage = (): Language => 'en';

export const t = (extract: (s: Strings) => string): string =>
  extract(STRINGS[getLanguage()]);

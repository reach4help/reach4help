import { Strings } from './iface';
import en from './langs/en';
import ru from './langs/ru';

const STRINGS = {
  en,
  ru,
};

type Language = keyof typeof STRINGS;

const selectedLanguage = localStorage.getItem('selectedLanguage');

const getLanguage = (): Language => selectedLanguage || 'en';

export const t = (extract: (s: Strings) => string): string =>
  extract(STRINGS[getLanguage()]);

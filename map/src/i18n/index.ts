import { Strings } from './iface';
import en from './langs/en';
import ru from './langs/ru';

const STRINGS = {
  en,
  ru,
};

type Language = keyof typeof STRINGS;

const selectedLanguage = localStorage.getItem('selectedLanguage');

const isValidLanguage = (lang: string | null): lang is Language =>
  !!(lang && lang in STRINGS);

const getLanguage = (): Language => {
  const x = isValidLanguage(selectedLanguage) ? selectedLanguage : 'en';
  return x;
};

export const t = (extract: (s: Strings) => string): string =>
  extract(STRINGS[getLanguage()]);

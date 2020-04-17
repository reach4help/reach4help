import merge from 'lodash/merge';

import { Strings } from './iface';
import en from './langs/en';
import ru from './langs/ru';

export const LANGUAGES = {
  en,
  // Fill in missing russian strings with english
  ru: merge({}, en, ru),
};

type Language = keyof typeof LANGUAGES;

export const LANGUAGE_KEYS = Object.keys(LANGUAGES) as Language[];

const selectedLanguage = localStorage.getItem('selectedLanguage');

const queryLanguage = window.location.href.split('/')[3];

const browserLanguage = window.navigator.language.split('-')[0];

export const isValidLanguage = (lang: string | null): lang is Language =>
  !!(lang && lang in LANGUAGES);

const getLanguage = (): Language => {
  if (isValidLanguage(selectedLanguage)) {
    return selectedLanguage;
  }
  if (isValidLanguage(queryLanguage)) {
    return queryLanguage;
  }
  if (isValidLanguage(browserLanguage)) {
    return browserLanguage;
  }
  return 'en';
};

export const t = (extract: (s: Strings) => string): string =>
  extract(LANGUAGES[getLanguage()].strings);

export interface Internationalization {
  language?: Language;
}

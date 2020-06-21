import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import CONSTANTS from 'src/constants';

import en from './en.json';
import fr from './fr-FR.json';
import pt from './pt-PT.json';

const { localStorageKey } = CONSTANTS;

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: localStorageKey,
    },
    fallbackLng: 'en',
    resources: {
      en,
      fr,
      pt,
    },
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

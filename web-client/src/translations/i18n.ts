import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import es from './es-ES.json';
import fr from './fr-FR.json';
import pt from './pt-PT.json';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['navigator'],
    },
    fallbackLng: 'en',
    resources: {
      en,
      es,
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

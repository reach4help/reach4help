import { t } from 'src/i18n';

import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    label: t(s => s.services.food),
    color: COLORS.red,
  },
  supplies: {
    label: t(s => s.services.supplies),
    color: COLORS.green,
  },
  aid: {
    label: t(s => s.services.aid),
    color: COLORS.yellow,
  },
  mobility: {
    label: t(s => s.services.mobility),
    color: COLORS.purple,
  },
  medicine: {
    label: t(s => s.services.medicine),
    color: COLORS.blue,
  },
  manufacturing: {
    label: t(s => s.services.manufacturing),
    color: COLORS.orange,
  },
  financial: {
    label: t(s => s.services.financial),
    color: COLORS.orange,
  },
  information: {
    label: t(s => s.services.information),
    color: COLORS.orange,
  },
} as const;

export type Service = keyof typeof SERVICES;

export const isService = (service: string): service is Service =>
  service in SERVICES;

export const SERVICE_TYPES = Object.keys(SERVICES) as Service[];

export interface Filter {
  service?: Service;
}

export const LANGUAGES = {
  en: {
    label: t(s => s.languages.en),
  },
  ru: {
    label: t(s => s.languages.ru),
  },
};

export type Language = keyof typeof LANGUAGES;

export const isLanguage = (language: string): language is Language =>
  language in LANGUAGES;

export const LANGUAGE_TYPES = Object.keys(LANGUAGES) as Language[];

export interface Translate {
  language?: Language;
}

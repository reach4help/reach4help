import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    label: 'Food',
    color: COLORS.red,
  },
  supplies: {
    label: 'Supplies',
    color: COLORS.green,
  },
  aid: {
    label: 'Aid',
    color: COLORS.yellow,
  },
  mobility: {
    label: 'Mobility',
    color: COLORS.purple,
  },
  medicine: {
    label: 'Medicine',
    color: COLORS.blue,
  },
  manufacturing: {
    label: 'Manufacturing',
    color: COLORS.orange,
  },
  financial: {
    label: 'Financial',
    color: COLORS.orange,
  },
  information: {
    label: 'Information',
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
    label: 'English',
  },
  ru: {
    label: 'Russian',
  },
};

export type Language = keyof typeof LANGUAGES;

export const isLanguage = (language: string): language is Language =>
  language in LANGUAGES;

export const LANGUAGE_TYPES = Object.keys(LANGUAGES) as Language[];

export interface Translate {
  language?: Language;
}

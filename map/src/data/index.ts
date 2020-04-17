import { t } from 'src/i18n';

import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    label: t(s => s.services.food),
    color: COLORS.red,
  },
  medicine: {
    label: 'Medicine',
    color: COLORS.blue,
  },
  /**
   * Non food-or-medicine supplies
   */
  supplies: {
    label: 'Other Supplies',
    color: COLORS.green,
  },
  mobility: {
    label: t(s => s.services.mobility),
    color: COLORS.purple,
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
  shelter: {
    label: 'Shelter',
    color: COLORS.orange,
  },
  /**
   * Other types of support Support,
   * e.g. support tailored for specific groups like vulnerable people, people at
   * risk from domestic abuse etc...
   */
  support: {
    label: 'Support',
    color: COLORS.yellow,
  },
  /**
   * Providing resources for networking (e.g. betwen mutual aid organizations)
   */
  network: {
    label: 'Network',
    color: COLORS.yellow,
  },
} as const;

export type Service = keyof typeof SERVICES;

export type MarkerType =
  | {
      /**
       * The main datapoints we're interested in
       */
      type: 'mutual-aid-group';
    }
  | {
      /**
       * Organization / Government-Run / NPO / Company
       */
      type: 'org';
      services: Service[];
    }
  | {
      /**
       * A fundraising effort that can be donated to, or have requests made of it
       */
      type: 'financial';
    }
  | {
      /**
       * An information provider for a specific region (e.g: a local website)
       */
      type: 'information';
    }
  | {
      type: 'other';
    };

export type MarkerTypeString = MarkerType['type'];

export const MARKER_TYPES = {
  'mutual-aid-group': {
    label: 'Mutual Aid Group',
    color: COLORS.red,
  },
  org: {
    label: 'Organization / Company',
    color: COLORS.blue,
  },
  financial: {
    label: 'Financial',
    color: COLORS.green,
  },
  information: {
    label: 'Information',
    color: COLORS.purple,
  },
  other: {
    label: 'Other',
    color: COLORS.orange,
  },
};

export const isMarkerType = (type: string): type is MarkerTypeString =>
  type in MARKER_TYPES;

export const MARKER_TYPE_STRINGS = Object.keys(
  MARKER_TYPES,
) as MarkerTypeString[];

export interface Filter {
  type?: MarkerTypeString;
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

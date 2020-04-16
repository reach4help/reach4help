import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    label: 'Food',
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
    label: 'Mobility',
    color: COLORS.purple,
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

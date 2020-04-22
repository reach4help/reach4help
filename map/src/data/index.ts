import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    color: COLORS.red,
  },
  medicine: {
    color: COLORS.blue,
  },
  /**
   * Non food-or-medicine supplies
   */
  supplies: {
    color: COLORS.green,
  },
  mobility: {
    color: COLORS.purple,
  },
  manufacturing: {
    color: COLORS.orange,
  },
  financial: {
    color: COLORS.orange,
  },
  information: {
    color: COLORS.orange,
  },
  shelter: {
    color: COLORS.orange,
  },
  /**
   * Other types of support Support,
   * e.g. support tailored for specific groups like vulnerable people, people at
   * risk from domestic abuse etc...
   */
  support: {
    color: COLORS.yellow,
  },
  /**
   * Providing resources for networking (e.g. betwen mutual aid organizations)
   */
  network: {
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
    color: COLORS.red,
  },
  org: {
    color: COLORS.blue,
  },
  financial: {
    color: COLORS.green,
  },
  information: {
    color: COLORS.purple,
  },
  other: {
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

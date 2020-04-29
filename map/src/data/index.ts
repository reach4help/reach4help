import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    color: COLORS.red,
  },
  medicine: {
    color: COLORS.blue,
  },
  supplies: {
    color: COLORS.green,
  },
  mobility: {
    color: COLORS.purple,
  },
  shelter: {
    color: COLORS.orange,
  },
  support: {
    color: COLORS.yellow,
  },
  information: {
    color: COLORS.orange,
  },
  network: {
    color: COLORS.yellow,
  },
  manufacturing: {
    color: COLORS.orange,
  },
  financial: {
    color: COLORS.orange,
  },
  other: {
    color: COLORS.yellow,
  },
} as const;

export type Service = keyof typeof SERVICES;

export const SERVICE_STRINGS = Object.keys(SERVICES) as Service[];
export const isService = (type?: string): type is Service =>
  (type && type in SERVICES) || false;

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

export const isMarkerType = (
  type: string | undefined,
): type is MarkerTypeString => (type && type in MARKER_TYPES) || false;

export const MARKER_TYPE_STRINGS = Object.keys(
  MARKER_TYPES,
) as MarkerTypeString[];

export interface Filter {
  type?: MarkerTypeString;
}

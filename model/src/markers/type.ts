export const SERVICE_STRINGS = [
  'food',
  'medicine',
  'supplies',
  'mobility',
  'shelter',
  'support',
  'information',
  'network',
  'manufacturing',
  'financial',
  'other',
] as const;

export type Service = typeof SERVICE_STRINGS[number];

export const isService = (service?: string): service is Service =>
  (service && SERVICE_STRINGS.includes(service as Service)) || false;

export const MARKER_TYPE_STRINGS = [
  'mutual-aid-group',
  'org',
  'financial',
  'information',
  'other',
] as const;

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

export const isMarkerType = (
  type: string | undefined,
): type is MarkerTypeString =>
  (type && MARKER_TYPE_STRINGS.includes(type as MarkerTypeString)) || false;

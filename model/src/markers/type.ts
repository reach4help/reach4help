export const SERVICE_STRINGS = [
  'food',
  'shelter',
  'beds',
  'oxygen',
  'medicine',
  'home-care',
  'blood',
  'quarantine',
  'telehealth',
  'financial',
  'mobility',
  'information',
  'manufacturing',
  'vaccine',
  'network',
  'support',
  'supplies',
  'other',
] as const;

export type Service = typeof SERVICE_STRINGS[number];

export const isService = (service?: string): service is Service =>
  (service && SERVICE_STRINGS.includes(service as Service)) || false;

export const MARKER_TYPE_STRINGS = [
  'mutual-aid-group',
  'org',
  'hospital',
  'medical',
  'company',
  'individual',
  // 'financial',
  // 'information',
  'other',
] as const;

export type MarkerType =
  // TODO: merge mutual-aid-group with org
  | {
      /**
       * The main datapoints we're interested in
       */
      type: 'mutual-aid-group';
      services: Service[];
    }
  | {
      /**
       * Organization / Government-Run / NGO
       */
      type: 'org';
      services: Service[];
    }
  | {
      /**
       * Hospital
       */
      type: 'hospital';
      services: Service[];
    }
  | {
      /**
       * Medical Services (volunteer doctors, pharmacies, clinics)
       */
      type: 'medical';
      services: Service[];
    }
  | {
      /**
       * Company (for-profit)
       */
      type: 'company';
      services: Service[];
    }
  | {
      /**
       * Individual good samaritans
       */
      type: 'individual';
      services: Service[];
    }
  // | {
  //     /**
  //      * A fundraising effort that can be donated to, or have requests made of it
  //      */
  //     type: 'financial';
  //   }
  // | {
  //     /**
  //      * An information provider for a specific region (e.g: a local website)
  //      */
  //     type: 'information';
  //   }
  | {
      type: 'other';
      services: Service[];
    };

export type MarkerTypeString = MarkerType['type'];

export const isMarkerType = (
  type: string | undefined,
): type is MarkerTypeString =>
  (type && MARKER_TYPE_STRINGS.includes(type as MarkerTypeString)) || false;

export const SERVICES = {
  food: {
    label: 'Food',
    color: '#DB4437',
  },
  supplies: {
    label: 'Supplies',
    color: '#0F9D58',
  },
  aid: {
    label: 'Aid',
    color: '#F4B400',
  },
  mobility: {
    label: 'Mobility',
    color: '#742388',
  },
  medicine: {
    label: 'Medicine',
    color: '#4285F4',
  },
  manufacturing: {
    label: 'Manufacturing',
    color: '#f47400',
  },
  financial: {
    label: 'Financial',
    color: '#f47400',
  },
  information: {
    label: 'Information',
    color: '#f47400',
  },
} as const;

export type Service = keyof typeof SERVICES;

export function isService(service: string): service is Service {
  return service in SERVICES;
}

export const SERVICE_TYPES = Object.keys(SERVICES) as Service[];

export interface Filter {
  service?: Service;
}

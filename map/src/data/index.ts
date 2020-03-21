export const SERVICES = {
  food: 'Food',
  supplies: 'Supplies',
  aid: 'Aid',
  mobility: 'Mobility',
  medicine: 'Medicine'
} as const;

export type Service = keyof typeof SERVICES;

export function isService(service: string): service is Service {
  return service in SERVICES;
}

export const SERVICE_TYPES = Object.keys(SERVICES) as Service[];

export interface Filter {
  service?: Service;
}

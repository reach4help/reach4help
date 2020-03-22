import { Service } from './index';

export interface MarkerInfo {
  contentTitle: string;
  contentBody: string;
  services: Service[];
  contact: {
    web: string;
    phone: string;
    email: string;
  };
  lat: number;
  lng: number;
  serviceRadius: number;
}

export const MARKERS: MarkerInfo[] = [
  {
    contentTitle: 'REMOVE LLC.',
    contentBody:
      'REMOVE is a small business modernizing trash and junk removal services through community outreach and redistribution. We can help provide moving and removal services for families and individuals who need help clearing space in their yards or their home as they "stay in place". Additionally, any who needs any items (beds, tables, appliances) please reach out as we have many items we can give away free of charge.',
    services: ['aid', 'mobility'],
    contact: {
      web: 'https://www.removela.com',
      phone: '+12135452062',
      email: 'contact@removela.com',
    },
    lat: 34.047364,
    lng: -118.242999,
    serviceRadius: 46660, // 29 miles
  },
];

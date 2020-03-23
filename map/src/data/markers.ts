import { Service } from './index';

export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string };
  phone?: string[];
  email?: string[];
}

export interface MarkerInfo {
  contentTitle: string;
  contentBody?: string;
  services: Service[];
  contact: {
    general?: ContactDetails;
    getHelp?: ContactDetails;
    volunteers?: ContactDetails;
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
      getHelp: {
        web: {
          Website: 'https://www.removela.com',
        },
        phone: ['+1 213 545 2062'],
        email: ['contact@removela.com'],
      },
    },
    lat: 34.047364,
    lng: -118.242999,
    serviceRadius: 46660, // 29 miles
  },
  {
    contentTitle: 'Birmingham Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/birminghammutualaid/',
        web: {
          'Google Doc':
            'https://docs.google.com/document/d/12wY7BG4wzI0TJ6IHIg231iJX6bZ7T0NqPKRiexCColo/edit',
        },
      },
      getHelp: {
        web: {
          Form: 'https://bit.ly/BHAMMA_RequestsForm',
        },
        phone: ['+1 213 545 2062'],
        email: ['contact@removela.com'],
      },
      volunteers: {
        web: {
          Form: 'https://bit.ly/BHAMMA_OffersForm',
        },
        email: ['bigfeelingsqueer@gmail.com'],
      },
    },
    lat: 33.5186,
    lng: -86.8104,
    serviceRadius: 35000,
  },
  {
    contentTitle: 'Kinlani (Flagstaff) Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSe4pQRyPNF9nqly1KNQobRtMUCf_kVSUp2RyBFknfUmejvfLA/viewform',
        },
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSe4pQRyPNF9nqly1KNQobRtMUCf_kVSUp2RyBFknfUmejvfLA/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSe4pQRyPNF9nqly1KNQobRtMUCf_kVSUp2RyBFknfUmejvfLA/viewform',
        },
      },
    },
    lat: 35.1983,
    lng: -111.6513,
    serviceRadius: 15000,
  },
  {
    contentTitle: 'Phoenix Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/144504496872461/145065600149684/',
        web: {
          'Google Form':
            'https://docs.google.com/spreadsheets/d/1OVJ1AMWXH3tjutOq8cKYJIK8RByqmaVLV8TYRS-48OU/edit#gid=0',
        },
      },
    },
    lat: 33.4484,
    lng: -112.074,
    serviceRadius: 45000,
  },
  {
    contentTitle: 'Tucson Community Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSdXG35r7SWGr3tSlTJb5UDa_lpUqd79l5zZ38jo6StYd4gt0Q/viewform?fbclid=IwAR11Pb7xk6shNjAsu8ue3OWBpL5oH9u7zUNE86NQeVbdtads9S0AnNh4Cv4',
        },
      },
    },
    lat: 32.2226,
    lng: -110.9747,
    serviceRadius: 45000,
  },
];

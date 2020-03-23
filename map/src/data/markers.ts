import { Service } from './index';

export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string };
  phone?: string[];
  email?: string[];
}

export interface Location {
  description?: string;
  lat: number;
  lng: number;
  serviceRadius: number;
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
  loc: Location;
}

const LOCATIONS = {
  USA: {
    AL_BHAM: {
      description: 'Birmingham, Alabama',
      lat: 33.5186,
      lng: -86.8104,
      serviceRadius: 35000,
    },
    AZ_FLAGSTAFF: {
      description: 'Flagstaff, Arizona',
      lat: 35.1983,
      lng: -111.6513,
      serviceRadius: 15000,
    },
    AZ_PHOENIX: {
      description: 'Phoenix, Arizona',
      lat: 33.4484,
      lng: -112.074,
      serviceRadius: 45000,
    },
    AZ_TUCSON: {
      description: 'Tucson, Arizona',
      lat: 32.2226,
      lng: -110.9747,
      serviceRadius: 45000,
    },
    CA_BAY_AREA: {
      locationDescription: 'Bay Area, California',
      lat: 37.8272,
      lng: -122.2913,
      serviceRadius: 85000,
    },
    CA_BAY_AREA_EAST: {
      locationDescription: 'East Bay, California',
      lat: 37.8334,
      lng: -122.2601,
      serviceRadius: 15000,
    },
    CA_BAY_AREA_OAKLAND: {
      locationDescription: 'Oakland, California',
      lat: 37.8044,
      lng: -122.2712,
      serviceRadius: 5000,
    },
    CA_LONG_BEACH: {
      locationDescription: 'Long Beach, California',
      lat: 33.8045,
      lng: -118.1678,
      serviceRadius: 9000,
    },
    CA_LA: {
      locationDescription: 'Los Angeles, California',
      lat: 34.0522,
      lng: -118.2437,
      serviceRadius: 25000,
    },
    CA_ORANGE_COUNTY: {
      locationDescription: 'Orange County, California',
      lat: 33.702964,
      lng: -117.759801,
      serviceRadius: 28000,
    },
    CA_SACRAMENTO: {
      locationDescription: 'Sacramento, California',
      lat: 38.575042,
      lng: -121.496461,
      serviceRadius: 13000,
    },
    CA_SANTA_CLARA: {
      locationDescription: 'Santa Clara County, California',
      lat: 37.368645,
      lng: -121.967235,
      serviceRadius: 7000,
    },
    CA_SOUTH_BAY: {
      locationDescription: 'South Bay Area, California',
      lat: 37.279845,
      lng: -121.831213,
      serviceRadius: 30000,
    },
    CA_VENTURA_COUNTY: {
      locationDescription: 'Ventura County, California',
      lat: 34.515831,
      lng: -119.078374,
      serviceRadius: 55000,
    },
  },
};

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
    loc: LOCATIONS.USA.CA_LA,
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
    loc: LOCATIONS.USA.AL_BHAM,
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
    loc: LOCATIONS.USA.AZ_FLAGSTAFF,
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
    loc: LOCATIONS.USA.AZ_PHOENIX,
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
    loc: LOCATIONS.USA.AZ_TUCSON,
  },
  {
    contentTitle: 'Covid-19 Financial Solidarity',
    services: ['financial'],
    contact: {
      general: {
        web: {
          'Google Sheet': 'http://bit.ly/COVIDmutualaid',
        },
      },
      getHelp: {
        web: {
          'Google Form': 'http://bit.ly/COVIDmutualaidrequestform',
        },
      },
    },
    loc: LOCATIONS.USA.CA_BAY_AREA,
  },
  {
    contentTitle: 'Bay Area Senior/Disability/Worker Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/1hqLnUN22aMoRnKnJJF2CzNP7u-RG5-rhZAz509z9wxE/viewform',
        },
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/1hqLnUN22aMoRnKnJJF2CzNP7u-RG5-rhZAz509z9wxE/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/1hqLnUN22aMoRnKnJJF2CzNP7u-RG5-rhZAz509z9wxE/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.CA_BAY_AREA,
  },
  {
    contentTitle: 'East Bay Disabled Folks COVID-19 Support',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      getHelp: {
        web: {
          'Google Form': 'https://tinyurl.com/DJCCsupportform',
        },
      },
      volunteers: {
        web: {
          'Google Form': 'https://tinyurl.com/DJCCally',
        },
      },
    },
    loc: LOCATIONS.USA.CA_BAY_AREA_EAST,
  },
  {
    contentTitle: 'Long Beach Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          'Google Sheet':
            'https://docs.google.com/spreadsheets/d/1P97OgODtjy9MIhLJFJUoZ8VgzaF1Zap8QFgF-ozp4fM',
        },
      },
    },
    loc: LOCATIONS.USA.CA_LONG_BEACH,
  },
  {
    contentTitle: 'Coronavirus Long Beach Community support group',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/longbeachcoronavirussupport/',
      },
    },
    loc: LOCATIONS.USA.CA_LONG_BEACH,
  },
  {
    contentTitle: 'COVID-19 Mutual Aid - LA - Ground Game',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        facebookGroup: 'http://facebook.com/mutualaidLA',
        web: {
          GoFundMe: 'https://www.gofundme.com/f/covid19-mutual-aid-network',
          'Ground Game Website': 'http://groundgamela.org/',
        },
      },
    },
    loc: LOCATIONS.USA.CA_LA,
  },
  {
    contentTitle: 'Oakland At Risk',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          Website: 'https://www.oaklandatrisk.com/',
        },
        phone: ['+1 510 306 4973'],
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSf72Nd_SzKqoZkr0nRICpVfZjI2ipVy5meOpARUTanGkkNb5w/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSeocUMsWW9al0K8AQ2aFtHHdkWJ_QDClT_MjXUDpita7IlTQA/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.CA_BAY_AREA_OAKLAND,
  },
  {
    contentTitle: 'Orange County COVID-19 Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          'Google Sheet':
            'https://docs.google.com/spreadsheets/d/1UqvDWmL4Wt_fOphAL_EZddI2WWZPeBNt3yt9RKosBJI/edit#gid=634347005',
        },
      },
    },
    loc: LOCATIONS.USA.CA_ORANGE_COUNTY,
  },
  {
    contentTitle: 'Sacramento COVID-19 Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          'Google Sheet':
            'https://docs.google.com/spreadsheets/d/1iRTr4P5fJsGlJ5ogNqogZMOFtuOsdMSiDylkjZo-AKE/edit#gid=634347005',
        },
      },
    },
    loc: LOCATIONS.USA.CA_SACRAMENTO,
  },
  {
    contentTitle: 'How Can I Help? Bay Area',
    contentBody:
      'Document detailing many ways in which you can help with the COVID-19 crisis in the Bay Area',
    services: ['information'],
    contact: {
      general: {
        web: {
          'Google Sheet':
            'https://docs.google.com/spreadsheets/d/1gQlAmgIsXdEUdISa3gKYd5PX6eq6nc5WALdmNxQpNGw/edit#gid=0',
        },
      },
    },
    loc: LOCATIONS.USA.CA_BAY_AREA,
  },
  {
    contentTitle: 'SF Bay Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      getHelp: {
        web: {
          'Airtable Form': 'https://airtable.com/shrYOG9wFVvurJl15',
        },
      },
      volunteers: {
        web: {
          'Airtable Form': 'https://airtable.com/shrOvUwUKyuN6zyqv',
        },
      },
    },
    loc: LOCATIONS.USA.CA_BAY_AREA,
  },
  {
    contentTitle: 'Sacramento Mutual Aid',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          Website: 'https://www.sacmutualaid.org/',
        },
      },
    },
    loc: LOCATIONS.USA.CA_SACRAMENTO,
  },
  {
    contentTitle: 'Santa Clara County COVID-19 Financial Solidarity',
    services: ['financial'],
    contact: {
      general: {
        web: {
          Website:
            'https://archive408.com/2020/03/15/santa-clara-county-covid-19-financial-solidarity/',
          'Google Doc':
            'https://docs.google.com/spreadsheets/d/1qHTKAU55y10zXsxUG2CZ6x8rOWv4c6JQun9Z1i_iyGc/edit#gid=1149136249',
        },
      },
    },
    loc: LOCATIONS.USA.CA_SANTA_CLARA,
  },
  {
    contentTitle: 'South Bay Mutual Aid Intake',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      getHelp: {
        web: {
          'Google Form (English)':
            'https://docs.google.com/forms/d/e/1FAIpQLSce8fn2o3E1ypc2qWsyGjT4tRLIHtbD-XSOQhx756Qfu5haqw/viewform',
          'Google Form (Español)':
            'https://docs.google.com/forms/d/168A-e95XgSPP5eoIlkHgucjHg4jDATAFOE2Y_AnWQXQ/viewform?edit_requested=true',
        },
      },
      volunteers: {
        web: {
          'Google Form (English)':
            'https://docs.google.com/forms/d/e/1FAIpQLSelE_VdJNsuMdO1Z8OE-y5ltQZCZSeFG1pkknvKNmv11HAssw/viewform',
          'Google Form (Español)':
            'https://docs.google.com/forms/d/1qbZtxiIcLFHRb2Y26w708-Ex4lnN4g9JEiEaxRlsDU8/viewform?edit_requested=true',
        },
      },
    },
    loc: LOCATIONS.USA.CA_SOUTH_BAY,
  },
  {
    contentTitle: 'COVID-19 Mutual Aid - VENTURA COUNTY DSA',
    services: ['aid', 'mobility', 'food', 'supplies', 'medicine'],
    contact: {
      general: {
        web: {
          Website: 'https://www.dsaventuracounty.org/covid_19_mutual_aid',
        },
      },
      getHelp: {
        web: {
          'Google Form': 'https://forms.gle/zFqr16DZGCTbBfz86',
        },
      },
      volunteers: {
        web: {
          'Google Form': 'https://forms.gle/ufH4acmKsKN7th9n7',
        },
      },
    },
    loc: LOCATIONS.USA.CA_VENTURA_COUNTY,
  },
];

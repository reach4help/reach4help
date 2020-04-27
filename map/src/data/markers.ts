import firebase from 'firebase';

/* eslint max-len: 0 */
import { MarkerType } from './index';

/**
 * Contact details capture various methods to contact an organization.
 */
export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string }; // List of URLs
  phone?: string[];
  email?: string[];
}

/**
 * Locations can be saved so they can be re-used for other markers.
 *
 * See the LOCATIONS array.
 */
export interface Location {
  /**
   * Human readable name for the location -- displayed on the web.
   */
  description: string;
  /**
   * Firestore compatible lat-lng object
   */
  latlng: firebase.firestore.GeoPoint;
  /**
   *  Measured in Meters (per Google Maps standard)
   */
  serviceRadius: number;
}

export interface ContactGroup {
  /** general contact information */
  general?: ContactDetails;
  /** details of how those that need help can interact with the organization  */
  getHelp?: ContactDetails;
  /** details of how those who want to help can interact with the organization  */
  volunteers?: ContactDetails;
}

/**
 * A marker that will be rendered on the map. A short title and description is also visible to users.
 *
 * TODO: remove type parameter when OldMarkerInfo is deleted
 */
interface EitherMarkerInfo<Location> {
  /** name of the organization or community effort */
  contentTitle: string;
  /** description of the organization or community effort */
  contentBody?: string;
  /**
   * What type of datapoint is this?
   */
  type: MarkerType;
  /**
   * the different avenues with which to contact an organization,
   * depending on your desired involvement
   */
  contact: ContactGroup;
  /**
   * The location data for this organization
   */
  loc: Location;
}

export interface MarkerInfo extends EitherMarkerInfo<Location> {
  /**
   * Whether the marker has been made visible to everyone
   *
   * (i.e. has it been reviewed for accuraccy).
   */
  visible: boolean;
}

export type OldMarkerInfo = EitherMarkerInfo<{
  description: string;
  lat: number;
  lng: number;
  serviceRadius: number;
}>;

const LOCATIONS = {
  PT: {
    ALMADA: {
      description: 'Almada, Portugal',
      lat: 38.678506,
      lng: -9.164985,
      serviceRadius: 5000,
    },
    LISBON_BELEM: {
      description: 'Lisbon, Belém, Portugal',
      lat: 38.7026973,
      lng: -9.2089478,
      serviceRadius: 2000,
    },
    PORTO_FOZ_DO_DOURO: {
      description: 'Porto, Foz do Douro, Portugal',
      lat: 41.1675792,
      lng: -8.7027557,
      serviceRadius: 2000,
    },
    ALL: {
      description: 'PT',
      lat: 39.475803,
      lng: -8.591411,
      serviceRadius: 311000,
    },
  },
  DE: {
    BERLIN: {
      description: 'Berlin, Germany',
      lat: 52.511528,
      lng: 13.406853,
      serviceRadius: 24000,
    },
  },
  UK: {
    NEWCASTLE_TYNE: {
      description: 'Newcastle upon Tyne, UK',
      lat: 54.975601,
      lng: -1.613076,
      serviceRadius: 9000,
    },
    ALL: {
      description: 'UK',
      lat: 54.200981,
      lng: -4.513111,
      serviceRadius: 545330,
    },
  },
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
      description: 'Bay Area, California',
      lat: 37.8272,
      lng: -122.2913,
      serviceRadius: 85000,
    },
    CA_BAY_AREA_EAST: {
      description: 'East Bay, California',
      lat: 37.8334,
      lng: -122.2601,
      serviceRadius: 15000,
    },
    CA_BAY_AREA_OAKLAND: {
      description: 'Oakland, California',
      lat: 37.8044,
      lng: -122.2712,
      serviceRadius: 5000,
    },
    CA_LONG_BEACH: {
      description: 'Long Beach, California',
      lat: 33.8045,
      lng: -118.1678,
      serviceRadius: 9000,
    },
    CA_LA: {
      description: 'Los Angeles, California',
      lat: 34.0522,
      lng: -118.2437,
      serviceRadius: 25000,
    },
    CA_ORANGE_COUNTY: {
      description: 'Orange County, California',
      lat: 33.702964,
      lng: -117.759801,
      serviceRadius: 28000,
    },
    CA_SACRAMENTO: {
      description: 'Sacramento, California',
      lat: 38.575042,
      lng: -121.496461,
      serviceRadius: 13000,
    },
    CA_SAN_DIEGO: {
      description: 'San Diego, California',
      lat: 32.838665,
      lng: -117.146094,
      serviceRadius: 25000,
    },
    CA_SANTA_CLARA: {
      description: 'Santa Clara County, California',
      lat: 37.368645,
      lng: -121.967235,
      serviceRadius: 7000,
    },
    CA_SOUTH_BAY: {
      description: 'South Bay Area, California',
      lat: 37.279845,
      lng: -121.831213,
      serviceRadius: 30000,
    },
    CA_VENTURA_COUNTY: {
      description: 'Ventura County, California',
      lat: 34.515831,
      lng: -119.078374,
      serviceRadius: 55000,
    },
    CO: {
      description: 'Colorado',
      lat: 39.026468,
      lng: -105.414834,
      serviceRadius: 308820,
    },
    CO_AURORA: {
      description: 'Aurora, Colorado',
      lat: 39.71408,
      lng: -104.70603,
      serviceRadius: 17700,
    },
    CO_BOULDER: {
      description: 'Boulder, Colorado',
      lat: 40.014671,
      lng: -105.282252,
      serviceRadius: 12160,
    },
    CO_DENVER: {
      description: 'Denver, Colorado',
      lat: 39.727881,
      lng: -104.992892,
      serviceRadius: 31500,
    },
    CO_SPRINGS: {
      description: 'Colorado Springs, Colorado',
      lat: 38.825097,
      lng: -104.823277,
      serviceRadius: 24200,
    },
    CO_DURANGO_LA_PLATA: {
      description: 'Durango & La Plata County, Colorado',
      lat: 37.310604,
      lng: -107.884585,
      serviceRadius: 55030,
    },
    CO_GRAND_JUNCTION: {
      description: 'Grand Junction, Colorado',
      lat: 39.07661,
      lng: -108.554731,
      serviceRadius: 11820,
    },
    CO_CARBONDALE: {
      description: 'Carbondale, Colorado',
      lat: 39.40057,
      lng: -107.2135,
      serviceRadius: 8046,
    },
    CT_HBWNH: {
      description:
        'Connecticut: Hartford, Bridgeport, Waterbury, and New Haven',
      lat: 41.480676,
      lng: -72.919991,
      serviceRadius: 43720,
    },
    CT_NEW_HAVEN: {
      description: 'New Haven, Connecticut',
      lat: 41.305505,
      lng: -72.93047,
      serviceRadius: 7300,
    },
    CT_NEW_LONDON: {
      description: 'New London, Connecticut',
      lat: 41.352049,
      lng: -72.091404,
      serviceRadius: 5190,
    },
    DC: {
      description: 'District of Columbia / Washington',
      lat: 38.897851,
      lng: -77.030027,
      serviceRadius: 10310,
    },
    FL_GAINESVILLE: {
      description: 'Gainesville, Florida',
      lat: 29.670145,
      lng: -82.342751,
      serviceRadius: 12530,
    },
    FL_TAMPA: {
      description: 'Tampa, Florida',
      lat: 27.996837,
      lng: -82.424077,
      serviceRadius: 25250,
    },
    GA_ATHENS: {
      description: 'Athens, Georgia',
      lat: 33.944255,
      lng: -83.372645,
      serviceRadius: 14660,
    },
    IL_CHICAGO: {
      description: 'Chicago, Illinois',
      lat: 41.856756,
      lng: -87.628718,
      serviceRadius: 32460,
    },
    IN: {
      description: 'Indiana',
      lat: 39.72427,
      lng: -86.15267,
      serviceRadius: 263360,
    },
    IN_MONROE_COUNTY: {
      description: 'Monroe County, Indiana',
      lat: 39.161021,
      lng: -86.527803,
      serviceRadius: 22290,
    },
    KS_KANSAS_CITY: {
      description: 'Kansas City, Kansas',
      lat: 39.085067,
      lng: -94.580735,
      serviceRadius: 43890,
    },
    KY: {
      description: 'Kentucky',
      lat: 37.513389,
      lng: -85.259611,
      serviceRadius: 382260,
    },
    KY_LEXINGTON: {
      description: 'Lexington, Kentucky',
      lat: 38.048063,
      lng: -84.499267,
      serviceRadius: 27510,
    },
    KY_LOUSVILLE: {
      description: 'Louisville, Kentucky',
      lat: 38.266396,
      lng: -85.760549,
      serviceRadius: 35040,
    },
    MD_BALTIMORE: {
      description: 'Baltimore, Maryland',
      lat: 39.17,
      lng: -76.37,
      serviceRadius: 60000,
    },
    VT_BARRE: {
      description: 'Greater Barre, Vermont',
      lat: 44.194269,
      lng: -72.501209,
      serviceRadius: 7000,
    },
    VT_ADDISON_COUNTY: {
      description: 'Addison County, Vermont',
      lat: 44.047818,
      lng: -73.165371,
      serviceRadius: 30000,
    },
    VT_STATE: {
      description: 'Vermont',
      lat: 43.987126,
      lng: -72.717293,
      serviceRadius: 132230,
    },
    VA_AUGUSTA: {
      description: 'Augusta, Virginia',
      lat: 38.14915,
      lng: -79.122097,
      serviceRadius: 32670,
    },
    VA_NORFOLK: {
      description: 'Norfolk, Virginia',
      lat: 36.846224,
      lng: -76.284361,
      serviceRadius: 32670,
    },
    VA_NOVA: {
      description: 'Northern Virginia',
      lat: 38.896749,
      lng: -77.260354,
      serviceRadius: 70000,
    },
    WA_SEATTLE_AREA: {
      description: 'Seattle Area, Washington',
      lat: 47.602591,
      lng: -122.333826,
      serviceRadius: 96020,
    },
    WA_SEATTLE: {
      description: 'Seattle, Washington',
      lat: 47.602591,
      lng: -122.333826,
      serviceRadius: 14450,
    },
    WA_SOUTH_SEATTLE: {
      description: 'Southside Seattle, Washington',
      lat: 47.563911,
      lng: -122.331661,
      serviceRadius: 9200,
    },
    WA_TACOMA: {
      description: 'Tacoma, Washington',
      lat: 47.248302,
      lng: -122.445154,
      serviceRadius: 26000,
    },
    WA_WHITMAN_COUNTY: {
      description: 'Whitman County, Washington',
      lat: 46.931241,
      lng: -117.509873,
      serviceRadius: 44000,
    },
    WI_APPLETON: {
      description: 'Appleton, Wisconsin',
      lat: 44.256519,
      lng: -88.415864,
      serviceRadius: 40000,
    },
    WI_DANE_COUNTY: {
      description: 'Dane County, Wisconsin',
      lat: 43.058324,
      lng: -89.398872,
      serviceRadius: 40000,
    },
    WI_MADISON: {
      description: 'Madison, Wisconsin',
      lat: 43.058324,
      lng: -89.398872,
      serviceRadius: 16960,
    },
    WY_LARAMIE: {
      description: 'Laramie, Wyoming',
      lat: 41.315027,
      lng: -105.593089,
      serviceRadius: 7000,
    },
    WY_CHEYENNE: {
      description: 'Cheyenne, Wyoming',
      lat: 41.133032,
      lng: -104.813754,
      serviceRadius: 12630,
    },
    WY_STATE: {
      description: 'Wyoming',
      lat: 42.901456,
      lng: -107.553939,
      serviceRadius: 289450,
    },
  },
};

const OLD_MARKERS: OldMarkerInfo[] = [
  {
    contentTitle: 'REMOVE LLC.',
    contentBody:
      'REMOVE is a small business modernizing trash and junk removal services through community outreach and redistribution. We can help provide moving and removal services for families and individuals who need help clearing space in their yards or their home as they "stay in place". Additionally, any who needs any items (beds, tables, appliances) please reach out as we have many items we can give away free of charge.',
    type: {
      type: 'org',
      services: ['support', 'mobility'],
    },
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
    contentTitle: 'Carbondale Colorado Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/CarbondaleCOMutualAid/',
        web: {
          'Carbondale Task Force':
            'https://www.carbondalegov.org/government/emergency/index.php',
        },
      },
    },
    loc: LOCATIONS.USA.CO_CARBONDALE,
  },
  {
    contentTitle: 'Birmingham Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'financial',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    contentTitle: 'The Jacobs & Cushman San Diego Food Bank',
    type: {
      type: 'org',
      services: ['food'],
    },
    contentBody: `The Jacobs & Cushman San Diego Food Bank and our North County Food Bank chapter comprise the largest hunger-relief organization in San Diego County. Last year, the Food Bank distributed 28 million pounds of food, and the Food Bank serves, on average, 350,000 people per month in San Diego County.

    Through our North County Food Bank chapter and by partnering with nearly 500 nonprofit partners with feeding programs, the Food Bank provides nutritious food to individuals and families in need in communities throughout San Diego County.`,
    contact: {
      general: {
        web: {
          Homepage: 'https://sandiegofoodbank.org/',
          Programs: 'https://sandiegofoodbank.org/programs/',
        },
        phone: ['+1 858 527 1419', '+1 866 350 3663'],
      },
      getHelp: {
        web: {
          'Contact Help':
            'https://sandiegofoodbank.org/contact/?looking-for=Help',
        },
        phone: ['+1 858 527 1419'],
      },
      volunteers: {
        web: {
          Volunteer: 'https://sandiegofoodbank.org/volunteer/',
          'Donate Food':
            'https://sandiegofoodbank.org/food-drives/host-a-food-drive/',
          'Donate Funds':
            'https://interland3.donorperfect.net/weblink/weblink.aspx?name=E33999&id=3',
        },
      },
    },
    loc: LOCATIONS.USA.CA_SAN_DIEGO,
  },
  {
    contentTitle: 'Serving Seniors',
    type: {
      type: 'org',
      services: ['support', 'food', 'supplies', 'information'],
    },
    contentBody: `Serving Seniors is a nonprofit organization in San Diego, California, serving low-income older adults aged 60 and above. We help poor and homeless seniors thrive using an innovative model of whole-person, wraparound support including meals, housing, health and social services, and lifelong learning.

    Working at 15 sites across the county and in the homes of hundreds of homebound seniors, we provide 640,000 meals and coordinated services to 5,000 older adults each year, most of them living on less than $1,000 per month. Serving Seniors is the largest provider of meals to seniors in the county, and one of the only organizations in the nation providing such a broad base of services to vulnerable, at-risk older adults.`,
    contact: {
      general: {
        web: {
          Homepage: 'https://servingseniors.org/',
          Mission: 'https://servingseniors.org/who-we-are/mission.html',
          Team: 'https://servingseniors.org/who-we-are/board-leadership.html',
        },
        phone: ['+1 619 235 6572'],
      },
      volunteers: {
        web: {
          Volunteer: 'https://servingseniors.org/get-involved/volunteer.html',
          'Donate Funds': 'https://servingseniors.org/get-involved/donate.html',
        },
        phone: ['+1 619 487 0605'],
        email: ['elle.leidy@servingseniors.org'],
      },
    },
    loc: LOCATIONS.USA.CA_SAN_DIEGO,
  },
  {
    contentTitle: 'United Way of San Diego County',
    type: {
      type: 'org',
      services: ['support', 'information', 'food', 'financial'],
    },
    contentBody: `We strengthen our community when we align with partners and leverage our resources to transform lives.

    UWSD works in alignment with partners to address inequities in our region and help underserved communities. Together, we leverage the use of data and our partners’ expertise to better understand root causes, and put impactful solutions into action.

    Today, in partnership with others, we use shared goals, innovation, and proven practices to resolve inequities and transform the lives of children, young adults, and families.`,
    contact: {
      general: {
        web: {
          Homepage: 'https://uwsd.org/',
          Team: 'https://uwsd.org/about-us/leadership/',
        },
        email: ['info@uwsd.org'],
        phone: ['+1 858 492 2000'],
      },
      volunteers: {
        web: {
          Volunteer: 'https://uwsd.org/get-involved/volunteer/',
          'Donate Funds': 'https://uwsd.org/donate/',
          'Planned Giving': 'https://uwsd.org/get-involved/planned-giving/',
        },
      },
    },
    loc: LOCATIONS.USA.CA_SAN_DIEGO,
  },
  {
    contentTitle: 'How Can I Help? Bay Area',
    contentBody:
      'Document detailing many ways in which you can help with the COVID-19 crisis in the Bay Area',
    type: {
      type: 'information',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'financial',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
    type: {
      type: 'mutual-aid-group',
    },
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
  {
    contentTitle: 'DC Mutual Aid Network East of the River',
    contentBody: `In the wake of the COVID-19, the people of D.C. are mobilizing to launch and expand real grassroots mutual aid efforts.
Black Lives Matter DC is raising funds for our Mutual Aid Network East of the River in Washington, D.C.
Black Lives Matter DC is a member-based abolitionist organization centering Black people most at risk for state violence in DC, creating the conditions for Black Liberation through the abolition of systems and institutions of white supremacy, capitalism, patriarchy, and colonialism. We are located in Washington, DC,
This Mutual Aid Network is a grassroots, community focused and lead ecosystem for folks in DC (District of Columbia) are engaged in or are looking to plug in. We are collecting and purchasing supplies to make hygiene bags, sack lunches and provide other material support that we have started distributing. We are working to support as many of our neighbors who are housing and food insecure as well as others that need support East of the River in Wards 7 & 8 as possible.`,
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'https://www.gofundme.com/f/blmcovid',
          Twitter: 'https://twitter.com/DMVBlackLives',
          Instagram: 'https://www.instagram.com/blacklivesmatterdc/',
        },
        email: ['info@dcblm.org'],
        phone: ['+1 202 630 0336'],
        facebookGroup: 'https://www.facebook.com/BLMDC',
      },
      getHelp: {
        phone: ['+1 202 630 0336'],
      },
      volunteers: {
        web: {
          Donate: 'https://www.gofundme.com/f/blmcovid',
        },
        phone: ['+1 202 630 0336'],
      },
    },
    loc: LOCATIONS.USA.DC,
  },
  {
    contentTitle: 'Front Range Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      getHelp: {
        web: {
          Form: 'http://bit.ly/getcovidaidcolorado',
        },
      },
      volunteers: {
        web: {
          Form: 'http://bit.ly/covidaidcolorado',
        },
      },
    },
    loc: LOCATIONS.USA.CO,
  },
  {
    contentTitle: 'Mutual Aid Infrastructure- Aurora, Colorado',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/2704399092941296/?ref=share',
      },
    },
    loc: LOCATIONS.USA.CO_AURORA,
  },
  {
    contentTitle: 'Boulder Coronavirus Community Coping Crew',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/199467514668513/?ref=share',
      },
    },
    loc: LOCATIONS.USA.CO_BOULDER,
  },
  {
    contentTitle: 'COS Mutual Aid Network = Red de Ayuda Mutua en COS',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/580039515935157/?ref=share',
        web: {
          Etherpad:
            'https://pad.disroot.org/p/COS_Mutual_Aid_Links?fbclid=IwAR1cl_yvgZXzlRXKmzksgxa0Evbb8cn-2hcxeH1Bcidup1VzeT4HwjyLm50',
        },
      },
    },
    loc: LOCATIONS.USA.CO_SPRINGS,
  },
  {
    contentTitle: 'CV19 Quarantine Delivery Taskforce',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/1750449275097011/?ref=share',
        web: {
          'Logistics Document':
            'https://docs.google.com/document/d/198HdHPMreqPaWhsFjQjVWl-qx9rcik1vIPOYvR5Kiig/edit',
        },
      },
    },
    loc: LOCATIONS.USA.CO_DENVER,
  },
  {
    contentTitle: 'Help Needed in Denver Metro',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/516631032588738/?ref=share',
      },
    },
    loc: LOCATIONS.USA.CO_DENVER,
  },
  {
    contentTitle:
      'Durango & La Plata County Area Donation Opportunities + Community & Information Resources',
    type: {
      type: 'information',
    },
    contact: {
      general: {
        web: {
          'Main Document':
            'https://docs.google.com/document/d/1odc1Vtb8StICRLBHEC9bvOJyFUQYkHjaBwqaLa1iap8/edit',
        },
      },
    },
    loc: LOCATIONS.USA.CO_DURANGO_LA_PLATA,
  },
  {
    contentTitle: 'Be KIND Durango CO',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/beKINDurango/',
      },
    },
    loc: LOCATIONS.USA.CO_DURANGO_LA_PLATA,
  },
  {
    contentTitle: 'Stand Together Durango COVID19',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/2710235775748052/?ref=group_header',
      },
    },
    loc: LOCATIONS.USA.CO_DURANGO_LA_PLATA,
  },
  {
    contentTitle: 'Grand Junction Mutual Aid #grandjunctionmutualaid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/606348506878942/?ref=share',
      },
    },
    loc: LOCATIONS.USA.CO_GRAND_JUNCTION,
  },
  {
    contentTitle: 'Mutual Aid Waterbury, Bridgeport, New Haven',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          English: 'http://bit.ly/2Wg2pvc',
          Español: 'http://bit.ly/38N1Z24',
          عربى:
            'https://docs.google.com/document/d/1FqsjuQxZltQD1e-24ZYSzu8qKsw7OfjzuZQfpKy4yiM/edit',
        },
      },
      getHelp: {
        web: {
          Form:
            'https://docs.google.com/forms/d/e/1FAIpQLSftDN2mV9dCv_5uF2n341h21hNfT80bzNYmVJQaBFHUvi909A/viewform',
        },
      },
      volunteers: {
        web: {
          'Offerings Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSeWN1V25kvvY-zO5yNpeLf1_VpFVfz1RXntPw98TBin3g0GXw/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.CT_HBWNH,
  },
  {
    contentTitle:
      'Información y apoyo mutuo durante el coronavirus: New Haven, Connecticut',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/apoyo.mutuo.new.haven/?ref=share',
        web: {
          Newsletter: 'https://ulanewhaven.org/informacion-coronavirus/',
        },
      },
    },
    loc: LOCATIONS.USA.CT_NEW_HAVEN,
  },
  {
    contentTitle: 'New London Mutual Aid Collective - Community Network',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/646521702359874/?ref=share',
      },
    },
    loc: LOCATIONS.USA.CT_NEW_LONDON,
  },
  {
    contentTitle: 'DC Mutual Aid Network',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/492881801379594/?ref=share',
      },
    },
    loc: LOCATIONS.USA.DC,
  },
  {
    contentTitle: 'Gainesville COVID-19 Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/243135496869312/?ref=share',
      },
    },
    loc: LOCATIONS.USA.FL_GAINESVILLE,
  },
  {
    contentTitle: 'Mutual Aid Greater Tampa - Resources and Information',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          'Google Doc':
            'https://docs.google.com/document/d/1qSt4xTJpEZ0pa5-ZxbUi5WZX5w6JI4Do8u4zU6nENLg/edit',
          'Google Drive':
            'https://drive.google.com/drive/folders/1dCGSfkz8pQwJj2bjiCXk3FiWGbtwEofW',
        },
      },
    },
    loc: LOCATIONS.USA.FL_TAMPA,
  },
  {
    contentTitle: 'Tampa Mutual Aid Response- Coronavirus',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Document:
            'https://docs.google.com/document/d/1opIYkD-cXzUu2tLp59EkktPHExZeBqPN9k7i107X3UE/mobilebasic',
        },
      },
    },
    loc: LOCATIONS.USA.FL_TAMPA,
  },
  {
    contentTitle: 'Mutual Aid/Relief Fundraiser',
    contentBody: `Focused on distributing needed items to working class black and brown people, seniors, queer and trans folx. If you have extra baby formula, pampers, over the counter medication such as cold and flu meds, Ibuprofen, boxed food, canned food, bagged food, water or toiletries message the FB link and coordinated volunteers can schedule a drop off of those items at a private location for our Baltimore Mutual Aid/Emergency Relief efforts! 
Food, Clothing & Resistance Collective - Maroon Movement is doing a mutual aid & emergency relief fundraising drive providing electronic or delivered distributions of resources for anyone who may need some "extra assistance" to stock up food, toiletries and medical supplies in Baltimore during this still very early stage of an emerging pandemic (Covid-19), in the middle of another pandemic (Influenza).
Due to so many local closures and loss of income for some now, and many others possibly in the near future, we as usual want to do our part to help out those who are most vulnerable in our community. Please help us with a monetary donation or donation of canned, boxed or bagged food items, baby formula, produce, toiletries (including pampers) and over the counter medical supplies.
For more info, or to set up a scheduled drop off of items, or to volunteer please message us or email us at: maroonmovement@gmail.com. Thank you for your solidarity!`,
    type: {
      type: 'financial',
    },
    contact: {
      general: {
        web: {
          PayPal: 'Paypal: fcrcollective@gmail.com',
          Cashapp: '$Simaleerbg',
          Venmo: 'Venmo: @Simaleerbg',
        },
        email: ['maroonmovement@gmail.com'],
        phone: [''],
        facebookGroup:
          'https://www.facebook.com/donate/201582851152373/563301290955017/',
      },
      getHelp: {
        email: ['maroonmovement@gmail.com'],
      },
      volunteers: {
        email: ['maroonmovement@gmail.com'],
        web: {
          Donate:
            'https://www.facebook.com/donate/201582851152373/563301290955017/',
        },
      },
    },
    loc: LOCATIONS.USA.MD_BALTIMORE,
  },
  {
    contentTitle: 'Baltimore Neighborhood Quarantine Response Teams',
    type: {
      type: 'information',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://docs.google.com/document/d/1G5JcyxmywcTdNeaSGxUNycl9mtCdGkF4MYPVxEBH4SY/mobilebasic?urp=gmail_link',
        },
        email: ['celesteperilla@gmail.com'],
      },
    },
    loc: LOCATIONS.USA.MD_BALTIMORE,
  },
  {
    contentTitle: 'BENZIE COUNTY COVID-19 RESOURCES AND NEEDS',
    type: {
      type: 'information',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/document/d/1FYcqcbY2qMuuy75GIIM9UuqvFR_-YlVKfFcrqJOy9mw/edit?fbclid=IwAR1Lfd0mZrm4GgqOwmcXAeJGnTLUEQ0wmooezGvgnVYjXvKEZT8EYPU2tUI',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Homestead Township, MI, USA',
      lat: 44.633482,
      lng: -85.98999,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'GRAND RAPIDS AREA PANDEMIC RESOURCES',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/209101217168617/',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/1tVSwz0xYnrDJEjk3MWU32eS6q0eE5TSA0jOUL-frKcA/viewform?ts=5e766a19&fbclid=IwAR0Od69ftV6DJlqNpr_6knR6SQexBbZyodz2Mgi3k_C9HbNU318hTEJZGa4&edit_requested=true#responses',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Alpine Township, MI, USA',
      lat: 43.086943,
      lng: -85.740738,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'WASHTENAW COUNTY MUTUAL AID + RESOURCES',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/2424471741198383/',
      },
    },
    contentBody: '',
    loc: {
      description: 'Freedom Township, MI, USA',
      lat: 42.208176,
      lng: -83.987732,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'SAUGATUCK/DOUGLAS SECOND RESPONDERS',
    type: {
      type: 'org',
      services: ['support', 'information'],
    },
    contact: {
      general: {
        web: { Website: 'https://sdvolunteers.com/' },
        facebookGroup: '',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSdKd62iT4GEWLACz9tJnekgh4iWxiVOVHxjBqiV1469B8JFnw/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Saugatuck, MI 49453, USA',
      lat: 42.658494,
      lng: -86.205861,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle:
      'GRAND TRAVERSE BAND OF OTTAWA AND CHIPPEWA INDIANS MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        email: ['petosjoh@umich.edu'],
      },
    },
    contentBody: '',
    loc: {
      description: 'Suttons Bay Township, MI, USA',
      lat: 44.995845,
      lng: -85.65501,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'KALAMAZOO MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/225779971877883/',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSeW-Dmt_Z_QPu81ad0jo5gs4vjx2zREupOmdoLnn2JBntapGg/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Southside, Kalamazoo, MI, USA',
      lat: 42.274765,
      lng: -85.588179,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'SOUTHWEST MICHIGAN MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer: 'https://www.facebook.com/groups/3137606989603526/',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Wayne Township, MI, USA',
      lat: 42.032974,
      lng: -86.044922,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'BAY MILLS INDIAN COMMUNITY MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://docs.google.com/spreadsheets/u/1/d/1CduPghNgY92MufdZDoYjkcjmbYp-l_43EQPRhxlmVPU/htmlview?fbclid=IwAR0tCQI5Av8UgCe5XVcW_cb9TQarlhFoiJO4LcU90FF39JEnNic7F3FrnMc',
        },
        facebookGroup: '',
      },
    },
    contentBody: '',
    loc: {
      description: 'Bay Mills Township, MI, USA',
      lat: 46.444495,
      lng: -84.745826,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'SPARK IN THE DARK',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/sparkinthedark/',
      },
    },
    contentBody: '',
    loc: {
      description: 'East Bay Township, MI, USA',
      lat: 44.735028,
      lng: -85.523071,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'COMBATING COVID IN SOUTHWEST DETROIT',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSdrdIvdO3AHzCJBXloy-KExxQabrMUSbr_xgo4Y9NBI-GHnTA/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Detroit, MI, USA',
      lat: 42.332174,
      lng: -83.11068,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'MUTUAL AID OF NORTHWEST MICHIGAN',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/784134155443201/?hc_location=ufi',
      },
    },
    contentBody: '',
    loc: {
      description: 'Traverse City, MI, USA',
      lat: 44.736979,
      lng: -85.567017,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'DETROIT-BASED COVID-19 MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/2554127328195074/',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/spreadsheets/d/1-m6QBgqejlk2h6uJ0WGkphZuZ5MR3-uWCkv2vSZcHY8/edit?fbclid=IwAR2dcKuYe-I787XJLyl2I6DtTrPMrfxTkdPRQT6VE59CdoykxNOBgMvGIHs#gid=1526320049',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Dexter Linwood, Detroit, MI, USA',
      lat: 42.383444,
      lng: -83.10232,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'The MUTUAL AID NETWORK OF YPSILANTI (MANY)',
    type: {
      type: 'org',
      services: ['network'],
    },
    contact: {
      general: {
        web: {
          Website: 'https://ypsimutualaid.org/',
          'Facebook Page': 'https://www.facebook.com/ypsimutualaid',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Ypsilanti, MI, USA',
      lat: 42.236398,
      lng: -83.61866,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'GRAND RAPIDS AREA COVID-19 MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/GRAMutAid/',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSclYE9PAOHDVJi-lIGMFrdmOYq7s-NiFgHA9q6zTpxcaJVcLg/viewform?fbclid=IwAR1wbfk2GSK4phL97Ny1etdVGm7fGUsQnkx7AH15-1Y-loLR-hSa6lqeVHQ',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Heritage Hill, Grand Rapids, MI 49503, USA',
      lat: 42.96146,
      lng: -85.655716,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'OAKLAND COUNTY COVID RESPONSE',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: { Website: 'https://www.mycovidresponse.org/' },
      },
      volunteers: {
        web: { Volunteer: 'https://www.mycovidresponse.org/signup/' },
      },
    },
    contentBody: '',
    loc: {
      description: 'Waterford Twp, MI, USA',
      lat: 42.660276,
      lng: -83.385791,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'CHARLEVOIX COUNTY HELPING HANDS',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/696771177745067/',
      },
    },
    contentBody: '',
    loc: {
      description: 'Charlevoix, MI 49720, USA',
      lat: 45.319323,
      lng: -85.256653,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'PONTIAC CORONAVIRUS EMERGENCY RELIEF FOOD/SUPPLIES',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer: 'https://www.signupgenius.com/go/30e0b48aaa628a13-drive',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Pontiac, MI, USA',
      lat: 42.649252,
      lng: -83.287809,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'YOOPERS HELPING YOOPERS',
    type: {
      type: 'information',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://docs.google.com/spreadsheets/d/1-WZDwFkAKEyECe3fG07EgZ5J1vOKgtKJG93eyYW5lx8/edit',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Quincy Township, MI 49930, USA',
      lat: 47.129951,
      lng: -88.582764,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'LEONI TOWNSHIP MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer: 'https://www.facebook.com/groups/144130126892991/',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Leoni Township, MI, USA',
      lat: 42.260795,
      lng: -84.293804,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'GRAND TRAVERSE COUNTY MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLScfSUoYchrIXnzTCdDIwsM-2YGa04XzTLE6xU5SGezE6rI1OA/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'East Bay Township, MI, USA',
      lat: 44.668581,
      lng: -85.56058,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'FEED THE NEED ALLEGAN COUNTY',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer: 'https://www.facebook.com/groups/886253631847481/',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Allegan Township, MI 49010, USA',
      lat: 42.5913,
      lng: -85.888462,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'HURON VALLEY MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSdhW2voPOll9Jmy_QR0AXk1Pge1JGn3tByJ-SlPfKNsMjcHLg/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Lakewood, Ann Arbor, MI 48103, USA',
      lat: 42.253197,
      lng: -83.83878,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'KALKASKA RESPONSE TEAM',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://elizabethannedunha.wixsite.com/kalkaskaresponseteam',
        },
        facebookGroup: '',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSdTo09tnTPEUXfIBF9AudVIcb2EeDYggWYTvnRVeHuByZqrAw/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Oliver Township, MI, USA',
      lat: 44.684592,
      lng: -85.090253,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'ANTRIM COUNTY MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/2228122717494765',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSckdiDnfMenlqmraSxU7PjKi3M1GWK66E5GQsWnBIfd79Zx-A/viewform',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Kearney Township, MI, USA',
      lat: 44.99904,
      lng: -85.140227,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'LANSING AREA MUTUAL AID',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/1Du9AJTV6Z4uZ5Kmi6fBcE6_WN1RFPPaBmCpPYUUAEf4/viewform?edit_requested=true',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Downtown, Lansing, MI, USA',
      lat: 42.73418,
      lng: -84.552549,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'EMMET COUNTY HELPING HANDS',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/234362584615594',
      },
      volunteers: {
        web: {
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSc1HSE7-la427QVGIDV27an6QaK7rNA-oSwRjv5YWingpbrJA/viewform?fbclid=IwAR3wHmqwTou2MRW1e6kg_y6wcSRr8ncyt245ssz_-gaSvVrtgB-n_eQAiX4',
        },
      },
    },
    contentBody: '',
    loc: {
      description: 'Pleasantview Township, MI, USA',
      lat: 45.52057,
      lng: -84.890727,
      serviceRadius: 20000,
    },
  },
  {
    contentTitle: 'Greater Barre Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'https://barremutualaid.recovers.org',
        },
        email: ['barretownresponseteam@gmail.com.'],
        facebookGroup:
          'https://www.facebook.com/pages/Recovers/182766635129248',
      },
      getHelp: {
        web: {
          Form: 'https://barremutualaid.recovers.org/needs/new',
        },
      },
      volunteers: {
        web: {
          'Area Form': 'https://barremutualaid.recovers.org/volunteer_info/new',
          'Town Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSd9g1jjGGEQxbaYgF19Y9hrJG-8I6vCtdikrjen7eTdBii7Ow/viewform',
          Donate: 'https://barremutualaid.recovers.org/donations/new',
        },
      },
    },
    loc: LOCATIONS.USA.VT_BARRE,
  },
  {
    contentTitle: 'Addison County Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'https://sites.google.com/view/acvtmutualaid/',
        },
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSd0Vb6YwJbKRB1nWamFOzDalpzZTJ03k5Q0TGBF2iEarcwVRg/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSfQOlYvwEaiwzjC8RzgViwFFbZhMv2TwJiQUrikhpJcEOwlQg/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.VT_ADDISON_COUNTY,
  },
  {
    contentTitle: 'Vermont Essential Workers Child Care Program',
    type: {
      type: 'other',
    },
    contact: {
      general: {
        web: {
          Website: 'https://webportalapp.com/webform/essentialworkers',
          'State Resources':
            'https://docs.google.com/document/d/17DJMyLZR_Fk7MzaCD9AU0O8a61VGVvoeNs4qbVk0z3E/edit?fbclid=IwAR0UB0Ze_G0H6Nz6_WYC-p5BW89J_l7pFoLtYfI3qhXxFgLTzvoSsgu0u04',
        },
      },
    },
    loc: LOCATIONS.USA.VT_STATE,
  },
  {
    contentTitle: 'Vermont Mutual Aid',
    contentBody:
      'Contains information for all vermont areas of aid and contact information.',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://www.pjcvt.org/mutual-aid-and-other-resources-related-to-covid-19/?fbclid=IwAR0faU4LHRpiLwIgBDFXOXZxxEzdILAgnDYn1VnVDRKlPk1IajIPOrCffZ4',
        },
        phone: ['(802) 863-2345'],
        email: ['volunteer@pjcvt.org'],
        facebookGroup: 'https://www.facebook.com/PJCVermont',
      },
    },
    loc: LOCATIONS.USA.VT_STATE,
  },
  {
    contentTitle: 'Virginia / Hampton Roads: Corona Aid 757',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'http://coronaaid757.com/',
        },
        phone: ['(757) 598-1480'],
        email: ['coronaaid757@gmail.com'],
        facebookGroup: 'https://www.facebook.com/groups/510830746536540',
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSd9YBCXcnk-vLWVWhMcVgxFm0clrTKKVmli_qVsbpn4ncUQCA/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSdmxE431orW5JZSS6kNWbGlExB8aasGodccb3aIKatxTMB2lg/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.VA_NORFOLK,
  },
  {
    contentTitle: 'Northern Va COVID-19 Craziness Supply Exchange',
    contentBody: `This group is for people located in Northern Virginia to join and post if they are in need of supplies or food. anything from diapers to soap to bread and milk... some of us may have more than we need of something and be running out of other things. if you have extras your willing to part with the actual value of the item and not for profit or for trade ..if you see grocery stores that have supplies, or if you are in need of anything at all..especially if you or someone you know has nothing to eat or an elderly person in need . please post here.
this is a friendly no judgement zone.
if you are shy or embarrassed to post something you need. Direct Message me Rachel Picon and I will find a way to get you whatever it is :)
please invite your friends in the northern va region to join! the more people sticking together the better!!
stay safe and be well! and remember we are not alone!`,
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/1025571771159434',
      },
    },
    loc: LOCATIONS.USA.VA_NOVA,
  },
  {
    contentTitle: 'Corona Aid 757',
    contentBody: `Helping Hampton Roads Weather the COVID19 Crisis 
We are a group of autonomous disaster relief workers attempting to alleviate stress and slow/stop the spread of Coronavirus/COVID-19 in our community. If you are in need of assistance with groceries and medical supplies, physical and mental health check-ins, or any other type of errand, follow this link to submit a request.
If you are a low-risk individual with transportation and time to spare, sign up here to help the more vulnerable members of our community.`,
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'http://coronaaid757.com/',
          PayPal: '',
          Cashapp: 'https://cash.app/$757mutualaid',
        },
        email: ['coronaaid757@gmail.com'],
        phone: ['+1 757 598 1480', '+1 757 598 1480 (para espanol)'],
        facebookGroup: 'https://www.facebook.com/groups/510830746536540',
      },
      getHelp: {
        email: ['CoronaAid757@gmail.com'],
        phone: ['+1 757 598 1480', '+1 757 598 1480 (para espanol)'],
        web: {
          'Request Service':
            'https://docs.google.com/forms/d/e/1FAIpQLSd9YBCXcnk-vLWVWhMcVgxFm0clrTKKVmli_qVsbpn4ncUQCA/viewform',
        },
      },
      volunteers: {
        email: ['CoronaAid757@gmail.com'],
        web: {
          Donate: 'http://coronaaid757.com/donate/',
          Volunteer:
            'https://docs.google.com/forms/d/e/1FAIpQLSdmxE431orW5JZSS6kNWbGlExB8aasGodccb3aIKatxTMB2lg/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.MD_BALTIMORE,
  },
  {
    contentTitle:
      'Virginia / Staughton, Augusta, and Waynesboro: Mutual Aid Infrastructure',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'http://mutualaidsaw.com/',
        },
        facebookGroup:
          'https://www.facebook.com/groups/210048547033677/?ref=share',
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/1SPMd2Snkinm_s8Y2_iolKHtVyIkDiVILnQA0f80bNkQ/viewform?fbclid=IwAR1DT1OGSRAdH3xSDQnLl3F5bLqili44-dMqnZMRdJ42xPEc9W-R1oDXA2s&edit_requested=true',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/1LCFpKO3ueODpfdrWASaWEYk0UzXqSMAv1RxV3UNffpE/viewform?fbclid=IwAR2Ls5KTCTWAedhj_nci9BpLIq1sRDj7K8FYUIfT4i1n_CxS96XuJO2U7o8&edit_requested=true',
        },
      },
    },
    loc: LOCATIONS.USA.VA_AUGUSTA,
  },
  {
    contentTitle: 'Seattle Artist Relief Fund Amid COVID-19',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'https://www.gofundme.com/f/for-artists',
        },
        email: ['covid19mutualaideastside@gmail.com'],
        facebookGroup: 'www.facebook.com/groups/555635161739149/ ',
      },
      getHelp: {
        web: {
          'Google Form': 'https://www.surveymonkey.com/r/LHJNLQV',
        },
        facebookGroup: 'https://www.facebook.com/LangstonSeattle/',
      },
      volunteers: {
        web: {
          Donate: 'https://www.gofundme.com/f/for-artists',
        },
      },
    },
    loc: LOCATIONS.USA.WA_SEATTLE,
  },
  {
    contentTitle: 'Washington / South Seattle and Eastside: COVID-19',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'https://www.gofundme.com/f/covid19-eastside-survival-fund',
        },
        email: ['covid19mutualaideastside@gmail.com'],
        facebookGroup: 'www.facebook.com/groups/555635161739149/ ',
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSdFzVouVJHJ2jRyrR90zDRr7iV-nPJZHjKBTKVYuobP29BZ5g/viewform',
        },
      },
      volunteers: {
        web: {
          Donate: 'https://www.gofundme.com/f/covid19-eastside-survival-fund',
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSdqoK6a4mmYc2tpVPVTDfq2EDjsSMDct8Am5duoCx44i-fIoQ/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.WA_SOUTH_SEATTLE,
  },
  {
    contentTitle: 'GLP SANI: Sex Worker Aid Network Initiative',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          donate: 'https://www.gofundme.com/f/hzudk7',
        },
        email: ['sxwsani@gmail.com', 'GLPsxwsani@gmail.com'],
      },
      getHelp: {
        email: ['GLPsani@protonmail.com'],
      },
      volunteers: {
        email: ['GLPsxwsani@gmail.com'],
      },
    },
    loc: LOCATIONS.USA.WA_SEATTLE,
  },
  {
    contentTitle: 'Seattle Area COVID-19',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          url:
            'https://docs.google.com/document/u/2/d/101hAWGpF4kowM1k2KkHgY5yjpKTvErCGa2FTEg3mGu4/mobilebasic?urp=gmail_link',
          Donate:
            'https://www.gofundme.com/f/covid19-survival-fund-for-the-people',
        },
        facebookGroup: 'https://www.facebook.com/covid19mutualaid',
        email: ['covid19mutualaidsea@gmail.com'],
      },
      getHelp: {
        web: {
          English:
            'https://docs.google.com/forms/d/e/1FAIpQLSdgbAX21UARi98rKKX6b6mpvpVHW4b63F2n2beJlHielcdU2Q/viewform?fbclid=IwAR1EuVigIGNylglDtL-vTHlOM3WRhVnmzn-fBpfuirlPiQKdUG--ToA_KDY',
          'Español (Spanish)':
            'https://docs.google.com/forms/d/1Peh9KEnZ0EFF7j4mV8opmG345hpo5s49DnsBJbVAiBY/viewform',
          'አማርኛ (Amharic)':
            'https://docs.google.com/forms/d/1FiOtf2cwUr7ZDbnpVH_OpdzAORBNp2fKYtibf0QAuOQ/viewform',
          'ትግርኛ (Tigrinya)':
            'https://docs.google.com/forms/d/1ohZqiW5k9L0mfxSRbdJo_pXJOZIPP03MY_P6pSAPQrs/viewform',
          'Tiếng Việt (Vietnamese)':
            'https://docs.google.com/forms/d/1EAdyq-vcW803i9MMoceyd9WgTsds6zs1--asljcTLZM/viewform',
        },
      },
      volunteers: {
        web: {
          English:
            'https://docs.google.com/forms/d/16ESS-9g9S58wpEGavsGu3aj6LnhvVYNdJJd-Qp_PfUY/viewform',
          'Donate Items':
            'https://www.facebook.com/This-cold-cold-world-101964174676844/',
        },
        facebookGroup:
          'https://www.facebook.com/This-cold-cold-world-101964174676844/',
      },
    },
    loc: LOCATIONS.USA.WA_SEATTLE_AREA,
  },
  {
    contentTitle: 'Washington / Tacoma: Tacoma Mutual Aid Network',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/TacomaMutualAidCollective/',
      },
    },
    loc: LOCATIONS.USA.WA_TACOMA,
  },
  {
    contentTitle:
      'Washington / Whitman County: Whitman County COVID-19 Community Response and Recovery',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/240389003760287/',
      },
    },
    loc: LOCATIONS.USA.WA_WHITMAN_COUNTY,
  },
  {
    contentTitle: 'Appleton, WI Community Care and Mutual Aid Signup',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://docs.google.com/forms/d/e/1FAIpQLSfGdbGcq8y_fh3qS7O_HJdCLB3dr8MJYktVmdQ6--ffAWJ6cQ/viewform',
        },
        email: ['foxcitiescommunitycare@gmail.com'],
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSfGdbGcq8y_fh3qS7O_HJdCLB3dr8MJYktVmdQ6--ffAWJ6cQ/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSfGdbGcq8y_fh3qS7O_HJdCLB3dr8MJYktVmdQ6--ffAWJ6cQ/viewform',
        },
      },
    },
    loc: LOCATIONS.USA.WI_APPLETON,
  },
  {
    contentTitle:
      'Wisconsin / Madison: Volunteer or Donate for Coronavirus Quarantine Support with the Madison General Defense Committee',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://docs.google.com/forms/d/e/1FAIpQLScnpw-ScLBjjNCaPq2T0-E6GTBj3hrYJ_UVJS6_ZfH8T3WOJQ/viewform?fbclid=IwAR2ZXHalBZ6iynibcL7OrEfCivuSKH0RL30UcoR5vCn9wOQ8i4LVwBdcBGw',
        },
      },
      getHelp: {
        web: {
          'Request Help':
            'https://www.google.com/url?q=https://tinyurl.com/quarantine-support&sa=D&ust=1584994208551000&usg=AFQjCNFNkqG1gNvFyiXTldi7_aLmPR6vBA',
        },
      },
      volunteers: {
        web: {
          Donate:
            'https://docs.google.com/forms/d/e/1FAIpQLScnpw-ScLBjjNCaPq2T0-E6GTBj3hrYJ_UVJS6_ZfH8T3WOJQ/viewform?fbclid=IwAR2ZXHalBZ6iynibcL7OrEfCivuSKH0RL30UcoR5vCn9wOQ8i4LVwBdcBGw',
          'Help Out':
            'https://www.google.com/url?q=https://tinyurl.com/quarantine-volunteer&sa=D&ust=1584994208551000&usg=AFQjCNFM70k4iQP3BkPRDGTsm9d0Fg80YA',
        },
      },
    },
    loc: LOCATIONS.USA.WI_DANE_COUNTY,
  },
  {
    contentTitle: 'COVID-19 Community Needs | Laramie',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup: 'https://www.facebook.com/groups/657547154818946',
      },
    },
    loc: LOCATIONS.USA.WY_LARAMIE,
  },
  {
    contentTitle: 'Wyoming / Cheyenne: Safe Neighbors',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/Safe-Neighbors-104569204510137/',
      },
      getHelp: {
        web: {
          'FB Messenger Link':
            'https://l.facebook.com/l.php?u=https%3A%2F%2Fm.me%2F104569204510137%3Ffbclid%3DIwAR2svFGCLTs2s2Zvc4x7vlTPcLceJq31uIsjnIzkwUvawsf2bg3VnOGAPyQ&h=AT3oq8S8FBbogI3UBs-fa7iLDb-LxK8DjpyKrEn0M1AT-gZP_FazbYqypOE-KKsibu9gssdCSttCUYmnC1lOP89UALeEk8dDnmf-inO3QmI5IMuvfC4Kt1c8-Mz8ixZZfVSmYzAh',
        },
      },
      volunteers: {
        web: {
          'FB Messenger Link':
            'https://l.facebook.com/l.php?u=https%3A%2F%2Fm.me%2F104569204510137%3Ffbclid%3DIwAR2svFGCLTs2s2Zvc4x7vlTPcLceJq31uIsjnIzkwUvawsf2bg3VnOGAPyQ&h=AT3oq8S8FBbogI3UBs-fa7iLDb-LxK8DjpyKrEn0M1AT-gZP_FazbYqypOE-KKsibu9gssdCSttCUYmnC1lOP89UALeEk8dDnmf-inO3QmI5IMuvfC4Kt1c8-Mz8ixZZfVSmYzAh',
        },
      },
    },
    loc: LOCATIONS.USA.WY_CHEYENNE,
  },
  {
    contentTitle: 'Wyoming: Wyoming COVID-19 Mutual Aid and Resource Page',
    type: {
      type: 'information',
    },
    contact: {
      general: {
        web: {
          Website:
            'https://docs.google.com/document/d/14_GKzvsNFcs0ZHiGHwQ_2rOwIvBMqSUu6IzFwdxQFNs/edit',
        },
      },
    },
    loc: LOCATIONS.USA.WY_STATE,
  },
  {
    contentTitle: 'Queer Relief Covid-19 Berlin',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        email: ['relief@karada-house.de', ' info@karada-house.de'],
      },
      getHelp: {
        web: {
          'Google Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSeYAX7N5xqNqwQRRz8mBH4uL9oL23Kn60uUOwmssfE6sEg2gg/viewform',
          'Non Hartz IV Eligible Form':
            'https://docs.google.com/forms/d/e/1FAIpQLSeYAX7N5xqNqwQRRz8mBH4uL9oL23Kn60uUOwmssfE6sEg2gg/viewform',
        },
      },
      volunteers: {
        web: {
          'Google Form': 'https://forms.gle/iS6DeGTnFj5v6cwHA',
        },
      },
    },
    loc: LOCATIONS.DE.BERLIN,
  },
  {
    contentTitle: 'Newcastle upon Tyne Covid 19 Mutual Aid',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        facebookGroup:
          'https://www.facebook.com/groups/NewcastleCovid19/?ref=share',
      },
    },
    loc: LOCATIONS.UK.NEWCASTLE_TYNE,
  },
  {
    contentTitle: 'COVID-10 Mutual Aid UK',
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          Website: 'https://covidmutualaid.org',
          Resources:
            'https://docs.google.com/spreadsheets/u/2/d/18P898HWbdR5ouW61sAxW_iBl3yiZlgJu0nSmepn6NwM/htmlview?sle=true#gid=1451634215',
        },
        facebookGroup: 'https://www.facebook.com/CovidAidUK',
        email: ['covidmutualaid.cc@gmail.com'],
      },
    },
    loc: LOCATIONS.UK.ALL,
  },
  {
    contentTitle: 'Refood Almada',
    type: {
      type: 'org',
      services: ['food', 'supplies', 'support'],
    },
    contact: {
      general: {
        web: {
          Website: 'https://www.facebook.com/almada.refood/',
        },
        phone: ['+351 21 259 0467'],
        email: ['refoodalmadavoluntarios@gmail.com'],
        facebookGroup: 'https://www.facebook.com/almada.refood/',
      },
    },
    loc: LOCATIONS.PT.ALMADA,
  },
  {
    contentTitle: 'CMA Plano de Emergência Social',
    type: {
      type: 'org',
      services: ['food', 'supplies', 'support', 'medicine'],
    },
    contact: {
      general: {
        web: {
          Website:
            'http://www.m-almada.pt/xportal/xmain?xpid=cmav2&xpgid=noticias_detalhe&noticia_detalhe_qry=BOUI=653849736&noticia_titulo_qry=BOUI=653849736',
        },
        phone: ['+351 800 102 040'],
        email: ['almadainforma@cma.m-almada.pt'],
        facebookGroup: 'https://www.facebook.com/cmalmada/',
      },
    },
    loc: LOCATIONS.PT.ALMADA,
  },
  {
    contentTitle: 'Refood',
    type: {
      type: 'org',
      services: ['food', 'supplies', 'support'],
    },
    contact: {
      general: {
        web: {
          Website: 'https://www.re-food.org/',
        },
        phone: ['+351 218 077 615'],
        email: ['comunicacao@re-food.org'],
        facebookGroup: 'https://www.facebook.com/refoodportugal',
      },
    },
    loc: LOCATIONS.PT.ALL,
  },
  {
    contentTitle: 'Refood Belém',
    type: {
      type: 'org',
      services: ['food', 'supplies', 'support'],
    },
    contact: {
      general: {
        web: {
          Website: 'https://www.re-food.org/pt/nucleos/portugal/lisboa/belem',
        },
        phone: ['+351 910 486 313'],
        email: ['voluntariado.refood.belem@gmail.com'],
        facebookGroup: 'https://www.facebook.com/refood.belem/',
      },
    },
    loc: LOCATIONS.PT.LISBON_BELEM,
  },
  {
    contentTitle: 'Refood Foz do Douro',
    type: {
      type: 'org',
      services: ['food', 'supplies', 'support'],
    },
    contact: {
      general: {
        web: {
          Website:
            'https://www.re-food.org/pt/nucleos/portugal/porto/foz-do-douro',
        },
        phone: ['+351 932 264 747'],
        email: ['fozdodouro.refood.voluntarios@gmail.com'],
        facebookGroup: 'www.facebook.com/refood.fozdodouro',
      },
    },
    loc: LOCATIONS.PT.PORTO_FOZ_DO_DOURO,
  },
];

export const MARKERS: MarkerInfo[] = OLD_MARKERS.map(m => ({
  contentTitle: m.contentTitle,
  contentBody: m.contentBody,
  contact: m.contact,
  type: m.type,
  loc: {
    description: m.loc.description,
    serviceRadius: m.loc.serviceRadius,
    latlng: new firebase.firestore.GeoPoint(m.loc.lat, m.loc.lng),
  },
  visible: true,
}));

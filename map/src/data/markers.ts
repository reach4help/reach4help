import {SERVICES} from "./index";

export const MARKERS: { [key: string]: any } = {
  '1': {
    label: '1',
    contentTitle: 'REMOVE LLC.',
    contentBody: 'REMOVE is a small business modernizing trash and junk removal services through community outreach and redistribution. We can help provide moving and removal services for families and individuals who need help clearing space in their yards or their home as they "stay in place". Additionally, any who needs any items (beds, tables, appliances) please reach out as we have many items we can give away free of charge.',
    services: [SERVICES.aid, SERVICES.mobility],
    contact: {
        web: 'https://www.removela.com',
        phone: '+12135452062',
        email: 'contact@removela.com'
    },
    lat: 34.047364,
    lng: -118.242999,
    serviceRadius: 46660 // 29 miles
  }
};

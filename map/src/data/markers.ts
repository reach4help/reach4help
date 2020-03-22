import {SERVICES} from "./index";

export const MARKERS: { [key: string]: any } = {
  '1': {
    label: '1',
    contentTitle: 'REMOVE LLC',
    contentBody: 'Text description, can be plain text or HTML',
    services: [SERVICES.aid, SERVICES.mobility],
    contact: {
        phone: '+12135452062',
        email: 'contact@removela.com'
    },
    lat: 34.047364,
    lng: -118.242999,
    serviceRadius: 46660 // 29 miles
  }
};

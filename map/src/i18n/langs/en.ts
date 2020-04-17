/* eslint max-len: 0 */
import { Language } from '../iface';

const LANG: Language = {
  meta: {
    name: 'English',
  },
  strings: {
    title: 'COVID-19 Mutual Aid Map',
    info:
      "To help people find and join mutual aid efforts where they live, offer inspiration to start their own, and/or simply lift spirits, below is a growing list of mutual aid pandemic disaster care projects. Note: Each project is autonomous and self-organized; many use public spreadsheets to share information, so be careful when entering private information that you don't want to be public.",
    about:
      'This map is part of {reach4Help}, a volunteer-run project. It is open source and can be {githubSource}. For any enquiries, you can reach us as at {email}.',
    githubSourceLabel: 'found on GitHub',
    mdAdd1: 'Add information',
    mdAdd2: 'to this map',
    buttons: {
      fullScreen: 'Fullscreen',
      exitFullScreen: 'Exit Fullscreen',
    },
    filter: 'Filter by need:',
    services: {
      any: 'Any',
      financial: 'Mobility',
      food: 'Food',
      information: 'Information',
      manufacturing: 'Manufactoring',
      medicine: 'Medicine',
      mobility: 'Mobility',
      supplies: 'Other Supplies',
      network: 'Network',
      shelter: 'Shelter',
      support: 'Support',
    },
    markerTypes: {
      'mutual-aid-group': 'Mutual Aid Group',
      org: 'Organization / Company',
      financial: 'Financial',
      information: 'Information',
      other: 'Other',
    },
    lang: 'Language:',
    langSelect: 'Select Language',
  },
};

export default LANG;

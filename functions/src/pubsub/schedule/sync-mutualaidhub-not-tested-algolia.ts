import * as firebase from 'firebase';
import { GeoPoint } from '@google-cloud/firestore';
import * as functions from 'firebase-functions';

import { beginningStats } from './sync-util';

import { ContactGroup, MarkerInfo } from '../../models/markers';

import algoliasearch from 'algoliasearch';
import { MarkerInfoWithId } from '../../shared/model/markers';

import merge = require('lodash/merge');

type MarkerInfoWithIdType = MarkerInfoWithId<GeoPoint>;

const algoliaAdminKey = process.env.REACT_APP_ALGOLIA_ADMIN_KEY || 'undefined';
const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID || 'undefined';
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME || 'undefined';
const client = algoliasearch(algoliaAppId, algoliaAdminKey);
const index = client.initIndex(indexName);

// Define the fields we're filtering on as constants here to ensure that they
// can be used in the Source type, and we get a type error if we need to update
// them.
const FIELD_SOURCE = 'source';
const FIELD_NAME = 'name';

type Source = (MarkerInfo[typeof FIELD_SOURCE] & {})[typeof FIELD_NAME];

//  xxx const SOURCE_NAME_FIELD_PATH = new FieldPath(FIELD_SOURCE, FIELD_NAME);
const SOURCE_NAME_FIELD_VALUE: Source = 'mutualaidhub.org';

// const xxx MARKER_COLLECTION = db.collection(MARKER_COLLECTION_ID) as CollectionReference<MarkerInfo>;

const MUTUAL_AID_HUB_APP_CONFIG = {
  apiKey: 'AIzaSyDOq6Kf4j-Q3OwfVyBYqAHdDx4oyqN4VQI',
  authDomain: 'townhallproject-86312.firebaseapp.com',
  databaseURL: 'https://townhallproject-86312.firebaseio.com',
  messagingSenderId: '208752196071',
  projectId: 'townhallproject-86312',
  storageBucket: 'townhallproject-86312.appspot.com',
};

interface MutualAidHubGroup {
  country: string;
  displayFilterTags?: string[];
  backendTags?: any[];
  language: string[];
  lat: number;
  bbox: number[];
  address: string;
  lng: number;
  state: string;
  community: string;
  // use the firebase ID instead
  // id: number;
  category: string;
  title: string;
  supportOfferForm: string;
  facebookPage: string;
  generalForm: string;
  neighborhood: string;
  city: string;
  supportRequestForm: string;
  zipCode?: string;
  geocodeStatus?: string;
  hotlineNumber?: string;
  geocodeError?: string;
  contact?: string;
}

const cleanUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch {
    try {
      return new URL(`https://${url}`);
    } catch {
      console.error(`Encountered invalid URL in mutualaid.wiki data: ${url}`);
      return null;
    }
  }
};
const groupToMarker = (id: string, group: MutualAidHubGroup): MarkerInfo | null => {
  const marker: MarkerInfo = {
    contentTitle: group.title,
    loc: {
      description: group.address,
      latlng: new GeoPoint(group.lat, group.lng),
    },
    visible: true,
    type: {
      type: 'mutual-aid-group',
    },
    contact: {},
    source: {
      name: SOURCE_NAME_FIELD_VALUE,
      id,
      data: group,
    },
  };

  const addUrl = (kind: 'general' | 'getHelp' | 'volunteers', label: string, urlString: string): void => {
    if (urlString !== '') {
      const url = cleanUrl(urlString);
      if (url) {
        marker.contact = merge<ContactGroup, ContactGroup>(marker.contact, { [kind]: { web: { [label]: url.href } } });
      }
    }
  };

  addUrl('general', 'Facebook Page', group.facebookPage);
  addUrl('general', 'Contact Form', group.generalForm);
  addUrl('volunteers', 'Form', group.supportOfferForm);
  addUrl('getHelp', 'Form', group.supportRequestForm);

  if (group.hotlineNumber) {
    marker.contact = merge<ContactGroup, ContactGroup>(marker.contact, { general: { phone: [group.hotlineNumber] } });
  }

  return marker;
};

// xxx const handleGroup = async (
//   documents: ExistingDocuments,
//   group: firebase.firestore.QueryDocumentSnapshot<MutualAidHubGroup>,
// ): Promise<GroupHandleResponse> => {
//   const groupData = group.data();
//   const marker = groupToMarker(group.id, groupData);
//   if (!marker) {
//     return 'invalid';
//   }
//   const doc = documents.get(group.id);
//   if (doc) {
//     const existingMarker = doc.data();
//     if (isEqual(existingMarker.source?.data, groupData)) {
//       return 'existing';
//     }
//     await MARKER_COLLECTION.doc(doc.id).set(marker);
//     return 'updated';
//   }
//   await MARKER_COLLECTION.add(marker);
//   return 'created';
// };

/**
 * Map from external source ID to existing document
 */
type ExistingDocuments = Map<string, MarkerInfoWithIdType>;

export const syncMutualAidHub = async () => {
  const stats = beginningStats();
  // get existing markers
  // DONE: change to Algolia fetch
  // TODO: only get mutual aid hub items
  const existingMarkers = await index.search(SOURCE_NAME_FIELD_VALUE);

  // const existingMarkers = await MARKER_COLLECTION.where(SOURCE_NAME_FIELD_PATH, '==', SOURCE_NAME_FIELD_VALUE).get();
  const existing: ExistingDocuments = new Map();
  const hits = (existingMarkers.hits as unknown) as MarkerInfoWithIdType[];
  for (const doc of hits) {
    const id = doc.source?.id;
    if (id) {
      existing.set(id, doc);
    }
  }

  //
  const mutualAidHubApp = firebase.initializeApp(MUTUAL_AID_HUB_APP_CONFIG);
  const mutualAidHubDB = mutualAidHubApp.firestore();
  const mutualAidCollection: firebase.firestore.CollectionReference<MutualAidHubGroup> = mutualAidHubDB.collection('mutual_aid_networks') as any;
  const mutualAidDocs = await mutualAidCollection.get();
  const mutualAidMarkers = [] as MarkerInfo[];
  // loop through all docs and set marker
  // upsert to Algolia
  for (const doc of mutualAidDocs.docs) {
    const groupData = doc.data();
    const marker = groupToMarker(doc.id, groupData);
    if (marker) {
      mutualAidMarkers.push(marker);
    }
  }
  const result = await index.saveObjects(mutualAidMarkers);
  console.log('result', result);

  // TODO: calculate some kind of stats
  // not needed
  // for (const doc of docs.docs) {
  //   // eslint-disable-next-line no-await-in-loop
  //   const result = await handleGroup(existing, doc);
  //   stats[result]++;
  // }
  return stats;
};

export const scheduleSyncMutualAidHub = functions
  .runWith({
    timeoutSeconds: 540,
  })
  .pubsub.schedule('every 6 hours')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .onRun(async () => {
    const stats = await syncMutualAidHub();
    console.log(`Sync with mutualaidhub.org complete, stats: ${JSON.stringify(stats)}`);
  });

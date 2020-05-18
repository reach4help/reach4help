import * as functions from 'firebase-functions';
import { CollectionReference, FieldPath, GeoPoint, QueryDocumentSnapshot } from '@google-cloud/firestore';
import fetch from 'node-fetch';

import { db } from '../../app';

import { MARKER_COLLECTION_ID, MarkerInfo } from '../../models/markers';
import { beginningStats } from './sync-util';
import isEqual = require('lodash/isEqual');

// Define the fields we're filtering on as constants here to ensure that they
// can be used in the Source type, and we get a type error if we need to update
// them.
const FIELD_SOURCE = 'source';
const FIELD_NAME = 'name';

type Source = (MarkerInfo[typeof FIELD_SOURCE] & {})[typeof FIELD_NAME];

const SOURCE_NAME_FIELD_PATH = new FieldPath(FIELD_SOURCE, FIELD_NAME);
const SOURCE_NAME_FIELD_VALUE: Source = 'mutualaid.wiki';

const API_URL = 'https://mutualaid.wiki/api/group/get';

const MARKER_COLLECTION = db.collection(MARKER_COLLECTION_ID) as CollectionReference<MarkerInfo>;

/**
 * Derived from: https://github.com/Covid-Mutual-Aid/groups-map/blob/master/lambdas/services/_utility_/types.ts
 * License: Attribution-NonCommercial-ShareAlike 4.0 International
 * https://github.com/Covid-Mutual-Aid/groups-map/blob/master/LICENSE.md
 */
export type MutualAidWikiGroup = {
  id: string;
  name: string;
  emails?: string[];
  description?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
  link_facebook: string;
  location_name: string;
  location_coord: {
    lat: number;
    lng: number;
  };
  location_poly?: Array<{
    lat: number;
    lng: number;
  }>;
  created_at?: string;
  updated_at?: string;
};

type GroupHandleResponse = keyof ReturnType<typeof beginningStats>;

/**
 * Map from external source ID to existing document
 */
type ExistingDocuments = Map<string, QueryDocumentSnapshot<MarkerInfo>>;

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

const groupToMarker = (group: MutualAidWikiGroup): MarkerInfo | null => {
  const url = cleanUrl(group.link_facebook);
  if (!url) {
    return null;
  }
  const webURLLabel = url.host === 'www.facebook.com' ? 'Facebook' : url.host === 'chat.whatsapp.com' ? 'WhatsApp' : 'Website';
  const marker: MarkerInfo & { contact: { general: {} } } = {
    contentTitle: group.name,
    loc: {
      description: group.location_name,
      latlng: new GeoPoint(group.location_coord.lat, group.location_coord.lng),
    },
    visible: true,
    type: {
      type: 'mutual-aid-group',
    },
    contact: {
      general: {
        web: {
          [webURLLabel]: url.href,
        },
      },
    },
    source: {
      name: SOURCE_NAME_FIELD_VALUE,
      id: group.id,
      data: group,
    },
  };

  if (group.description) {
    marker.contentBody = group.description;
  }
  if (group.contact?.email) {
    marker.contact.general.email = [group.contact.email];
  }
  if (group.contact?.phone) {
    marker.contact.general.phone = [group.contact.phone];
  }

  return marker;
};

const handleGroup = async (documents: ExistingDocuments, group: MutualAidWikiGroup): Promise<GroupHandleResponse> => {
  const marker = groupToMarker(group);
  if (!marker) {
    return 'invalid';
  }
  const doc = documents.get(group.id);
  if (doc) {
    const existingMarker = doc.data();
    if (isEqual(existingMarker.source?.data, group) && existingMarker.visible === marker.visible) {
      return 'existing';
    }
    await MARKER_COLLECTION.doc(doc.id).set(marker);
    return 'updated';
  }
  await MARKER_COLLECTION.add(marker);
  return 'created';
};

// TODO: change to pubsub scheduled function after initial import
// https://firebase.google.com/docs/functions/schedule-functions
export const syncMutualAidWiki = functions
  .runWith({
    timeoutSeconds: 540,
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .pubsub.schedule('every hour')
  .onRun(async () => {
    const stats = beginningStats();
    console.log('Syncing with mutualaid.wiki');
    const existingMarkers = await MARKER_COLLECTION.where(SOURCE_NAME_FIELD_PATH, '==', SOURCE_NAME_FIELD_VALUE).get();
    const existing: ExistingDocuments = new Map();
    for (const doc of existingMarkers.docs) {
      const id = doc.data().source?.id;
      if (id) {
        const duplicate = existing.get(id);
        if (duplicate) {
          // eslint-disable-next-line no-await-in-loop
          await MARKER_COLLECTION.doc(doc.id).delete();
          stats.duplicatesRemoved++;
        } else {
          existing.set(id, doc);
        }
      }
    }
    const groups: MutualAidWikiGroup[] = await (await fetch(API_URL)).json();
    for (const group of groups) {
      // eslint-disable-next-line no-await-in-loop
      const result = await handleGroup(existing, group);
      stats[result]++;
    }
    console.log('counts', existing.size, groups.length);
    console.log(`Sync with mutualaid.wiki complete, stats: ${JSON.stringify(stats)}`);
  });

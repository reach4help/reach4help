import * as functions from 'firebase-functions';
import { CollectionReference } from '@google-cloud/firestore';

import { db, storage } from '../../app';

import { MARKER_COLLECTION_ID, MarkerInfo, MARKERS_STORAGE_PATH, SerializableMarkerInfo } from '../../models/markers';

const MARKER_COLLECTION = db.collection(MARKER_COLLECTION_ID) as CollectionReference<MarkerInfo>;

// TODO: change to pubsub scheduled function after initial import
// https://firebase.google.com/docs/functions/schedule-functions
export const generateDataFiles = functions
  .runWith({
    memory: '512MB',
    timeoutSeconds: 540,
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .https.onRequest(async (_req, res) => {
    const results: {
      visible: SerializableMarkerInfo[];
      hidden: SerializableMarkerInfo[];
    } = {
      visible: [],
      hidden: [],
    };

    const markers = await MARKER_COLLECTION.get();

    for (const doc of markers.docs) {
      const data = doc.data();
      results[data.visible ? 'visible' : 'hidden'].push({
        ...data,
        loc: {
          ...data.loc,
          latlng: {
            latitude: data.loc.latlng.latitude,
            longitude: data.loc.latlng.longitude,
          },
        },
        id: doc.id,
      });
    }

    for (const visibility of ['visible', 'hidden'] as const) {
      const buffer = Buffer.from(JSON.stringify(results[visibility]), 'utf8');
      // Clear up some memory before we write to storage
      results[visibility] = [];
      // eslint-disable-next-line no-await-in-loop
      await storage
        .bucket()
        .file(MARKERS_STORAGE_PATH[visibility])
        .save(buffer);
    }

    res.status(200).send('Done!');
  });

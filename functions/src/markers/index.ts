import * as functions from 'firebase-functions';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { firestore } from 'firebase-admin';
import { db } from '../app';

import { MARKER_COLLECTION_ID, MARKER_SNAPSHOT_COLLECTION_ID, MarkerInfo, MarkerSnapshot } from '../models/markers';

export const whenUpdated = functions.firestore
  .document(`${MARKER_COLLECTION_ID}/{markerId}`)
  .onUpdate(async (change: Change<firestore.DocumentSnapshot>, context: EventContext) => {
    // Store change
    const data: MarkerInfo = change.after.data() as any;
    if (change.after.updateTime) {
      const snapshot: MarkerSnapshot = {
        data,
        timestamp: change.after.updateTime,
      };
      if (context.auth) {
        snapshot.uid = context.auth.uid;
      }
      await db.collection(`${MARKER_COLLECTION_ID}/${change.after.id}/${MARKER_SNAPSHOT_COLLECTION_ID}`).add(snapshot);
    }
  });

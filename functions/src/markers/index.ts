import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { firestore } from 'firebase-admin';
import { db } from '../app';

import { MARKER_COLLECTION_ID, MARKER_SNAPSHOT_COLLECTION_ID, MarkerInfo, MarkerSnapshot } from '../models/markers';

const onChangeOrUpdate = async (document: firestore.DocumentSnapshot, context: EventContext) => {
  // Store change
  const data: MarkerInfo = document.data() as any;
  if (document.updateTime) {
    const snapshot: MarkerSnapshot = {
      data,
      timestamp: document.updateTime,
    };
    if (context.auth) {
      snapshot.uid = context.auth.uid;
    }
    await db.collection(`${MARKER_COLLECTION_ID}/${document.id}/${MARKER_SNAPSHOT_COLLECTION_ID}`).add(snapshot);
  }
};

export const onUpdate = functions.firestore
  .document(`${MARKER_COLLECTION_ID}/{markerId}`)
  .onUpdate((change, context) => onChangeOrUpdate(change.after, context));

export const onCreate = functions.firestore.document(`${MARKER_COLLECTION_ID}/{markerId}`).onCreate(onChangeOrUpdate);

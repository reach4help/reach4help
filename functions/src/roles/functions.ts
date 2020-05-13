import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as admin from 'firebase-admin';

import { auth, db } from '../app';
import { ROLE_AUDITS_COLLECTION_ID } from '../shared/model/role-audits';
import { Role } from '../shared/model/roles';
import DocumentReference = admin.firestore.DocumentReference;
import DocumentData = admin.firestore.DocumentData;
import Timestamp = admin.firestore.Timestamp;

/**
 * When a role is created/updated/deleted log it and update the target user's claims
 *
 * @param change
 * @param context
 */
export const onWrite = (change: Change<DocumentSnapshot>, context: EventContext) => {
  const before = change.before.data() as Role;
  const after = change.after.data() as Role;
  const { userId } = context.params;
  let actingUserRef: DocumentReference<DocumentData> | null = null;

  switch (context.authType) {
    case 'USER':
      if (context.auth) {
        actingUserRef = db.collection('users').doc(context.auth.uid);
      }
      break;
    case 'ADMIN':
    case 'UNAUTHENTICATED':
    default:
      // No logic here since we only do something on one case at the moment.
      break;
  }

  // default to no claims
  const newUserClaims: { [id: string]: boolean } = {};
  // go over all claims and set them
  const afterObject = after.toObject() as { [id: string]: string[] };
  Object.keys(afterObject).forEach(permissionGroup => {
    (afterObject[permissionGroup]).forEach(permission => {
      // set the data to true or null (the only two options)
      newUserClaims[`admin.${permission}`] = true;
    });
  });

  const updateUserClaims = auth?.setCustomUserClaims(userId, null) // Clear old claims
    .then(() => {
      return auth?.setCustomUserClaims(userId, newUserClaims); // Set new claims
    })
    .catch(error => console.error('User Claims Failed: ', error));

  const operations = [
    db.collection(ROLE_AUDITS_COLLECTION_ID).add({
      affectedUser: db.collection('users').doc(userId),
      actingUser: actingUserRef,
      previousRole: before,
      currentRole: after,
      updatedAt: Timestamp.now(),
    }).catch(error => console.error('Audit Log Failed: ', error)), // Fail silently
    updateUserClaims,
  ];

  return Promise.all(operations);
};

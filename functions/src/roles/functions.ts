import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as admin from 'firebase-admin';

import { auth, db } from '../app';
import { DocumentReference } from '../shared/model/util'
import { ROLE_AUDITS_COLLECTION_ID, IRoleAudit } from '../shared/model/role-audits';
import { Role, ROLE_PERMISSION_GROUPS } from '../shared/model/roles';
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

  if (after) {
    // go over all claims and set them
    const afterObject = after.toObject();
    ROLE_PERMISSION_GROUPS.forEach(permissionGroup => {
      (afterObject[permissionGroup]).forEach(permission => {
        newUserClaims[`${permissionGroup}.${permission}`] = true;
      });
    });
  }

  const updateUserClaims = auth?.setCustomUserClaims(userId, null) // Clear old claims
    .then(() => {
      return auth?.setCustomUserClaims(userId, newUserClaims); // Set new claims
    })
    .catch(error => console.error('User Claims Failed: ', error));

  const auditLog: IRoleAudit = {
    affectedUserRef: db.collection('users').doc(userId),
    actingUserRef,
    previousRole: before,
    currentRole: after,
    updatedAt: Timestamp.fromDate(new Date(context.timestamp)),
  };

  const addAuditLog = db.collection(ROLE_AUDITS_COLLECTION_ID)
    .add(auditLog)
    .catch(error => console.error('Audit Log Failed: ', error)); // Fail silently

  const operations = [
    addAuditLog,
    updateUserClaims,
  ];

  return Promise.all(operations);
};

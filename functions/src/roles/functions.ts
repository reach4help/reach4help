import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { firestore } from 'firebase-admin';

import { auth, db } from '../app';
import { DocumentReference } from '../shared/model/util';
import { ROLE_AUDITS_COLLECTION_ID, RoleAudit } from '../shared/model/role-audits';
import { ROLE_PERMISSION_GROUPS, RoleCodec } from '../shared/model/roles';

/**
 * When a role is created/updated/deleted log it and update the target user's claims
 *
 * @param change
 * @param context
 */
export const onWrite = (change: Change<DocumentSnapshot>, context: EventContext) => {
  const before = change.before.data();
  const after = change.after.data();
  const { userId } = context.params;
  let actingUserRef: DocumentReference<unknown> | null = null;

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

  if (RoleCodec.is(after)) {
    // go over all claims and set them
    ROLE_PERMISSION_GROUPS.forEach(permissionGroup => {
      after[permissionGroup].forEach(permission => {
        newUserClaims[`${permissionGroup}.${permission}`] = true;
      });
    });
  }

  const updateUserClaims = auth
    ?.setCustomUserClaims(userId, null) // Clear old claims
    .then(() => {
      return auth?.setCustomUserClaims(userId, newUserClaims); // Set new claims
    })
    .catch(error => console.error('User Claims Failed: ', error));

  const auditLog: RoleAudit = {
    affectedUserRef: db.collection('users').doc(userId),
    actingUserRef,
    previousRole: before || null,
    currentRole: after || null,
    updatedAt: firestore.Timestamp.fromDate(new Date(context.timestamp)),
  };

  const addAuditLog = db
    .collection(ROLE_AUDITS_COLLECTION_ID)
    .add(auditLog)
    .catch(error => console.error('Audit Log Failed: ', error)); // Fail silently

  const operations = [addAuditLog, updateUserClaims];

  return Promise.all(operations);
};

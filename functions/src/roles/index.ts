import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { auth, db } from '../app';
import { DocumentReference, DocumentReferenceCodec, TimestampCodec } from '../shared/model/util/admin';
import { ROLE_AUDITS_COLLECTION_ID, RoleAuditCodec } from '../shared/model/role-audits';
import { ROLE_PERMISSION_GROUPS, RoleCodec, ROLES_COLLECTION_ID } from '../shared/model/roles';
import { USERS_COLLECTION_ID } from '../shared/model/users';
import * as t from 'io-ts';

const AdminRoleAuditCodec = RoleAuditCodec(DocumentReferenceCodec, TimestampCodec);

type RoleAudit = t.TypeOf<typeof AdminRoleAuditCodec>;

/**
 * When a role is created/updated/deleted log it and update the target user's claims
 */
export const onWrite = functions.firestore.document(`${ROLES_COLLECTION_ID}/{userId}`).onWrite((change, context) => {
  const before = change.before.data();
  const after = change.after.data();
  const { userId } = context.params;
  let actingUserRef: DocumentReference<unknown> | null = null;

  switch (context.authType) {
    case 'USER':
      if (context.auth) {
        actingUserRef = db.collection(USERS_COLLECTION_ID).doc(context.auth.uid);
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
      const group = after[permissionGroup];
      if (group) {
        group.forEach(permission => {
          newUserClaims[`${permissionGroup}.${permission}`] = true;
        });
      }
    });
  }

  const updateUserClaims = auth
    ?.setCustomUserClaims(userId, null) // Clear old claims
    .then(
      () => auth?.setCustomUserClaims(userId, newUserClaims), // Set new claims
    )
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
});

import * as t from 'io-ts';

import { RoleCodec } from '../roles';
import { DocumentReferenceCodec, TimestampCodec } from '../util';

export const ROLE_AUDITS_COLLECTION_ID = 'role-audits';

export const RoleAuditCodec = t.type({
  // TODO: update these to use the user type
  affectedUserRef: DocumentReferenceCodec<unknown>(),
  actingUserRef: t.union([DocumentReferenceCodec<unknown>(), t.null]),
  previousRole: t.union([RoleCodec, t.null]),
  currentRole: t.union([RoleCodec, t.null]),
  updatedAt: TimestampCodec,
});

export type RoleAudit = t.TypeOf<typeof RoleAuditCodec>;

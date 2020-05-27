import * as t from 'io-ts';

export const ROLE_AUDITS_COLLECTION_ID = 'role-audits';

export const RoleAuditCodec = <D extends t.Mixed, T extends t.Mixed>(
  DocumentReferenceCodec: D,
  TimestampCodec: T,
) =>
  t.type({
    // TODO: update these to use the user type
    affectedUserRef: DocumentReferenceCodec,
    actingUserRef: t.union([DocumentReferenceCodec, t.null]),
    previousRole: t.union([t.object, t.null]),
    currentRole: t.union([t.object, t.null]),
    updatedAt: TimestampCodec,
  });

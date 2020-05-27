import * as t from 'io-ts';

export const ROLES_COLLECTION_ID = 'roles';

export const ROLE_PERMISSION_GROUPS = ['map', 'web', 'admin'] as const;

type RolePermissionGroup = typeof ROLE_PERMISSION_GROUPS[number];

export type Role = {
  [key in RolePermissionGroup]: string[] | undefined;
};

const StringArray = t.array(t.string);

export function isRole(role: unknown): role is Role {
  if (typeof role !== 'object' || !role) {
    return false;
  }
  for (const k of Object.keys(role)) {
    if (!ROLE_PERMISSION_GROUPS.includes(k as any)) {
      // Unrecognized property
      return false;
    }
    // Check if array of strings
    if (!StringArray.is((role as any)[k])) {
      return false;
    }
  }
  return true;
}

export const RoleCodec = new t.Type<Role, Role, unknown>(
  'Role',
  isRole,
  (input, context) =>
    isRole(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);

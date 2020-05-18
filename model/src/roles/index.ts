import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsString } from 'class-validator';
import { firestore } from 'firebase';

import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export const ROLES_COLLECTION_ID = 'roles';

export const ROLE_PERMISSION_GROUPS = ['map', 'web', 'admin'] as const;

type RolePermissionGroup = typeof ROLE_PERMISSION_GROUPS[number];

export type IRole = {
  [key in RolePermissionGroup]: string[];
};

export class Role implements IRole {
  constructor(map: string[], web: string[], admin: string[]) {
    this._map = map;
    this._web = web;
    this._admin = admin;
  }

  @IsString({ each: true })
  private _map: string[];

  get map(): string[] {
    return this._map;
  }

  set map(value: string[]) {
    this._map = value;
  }

  @IsString({ each: true })
  private _web: string[];

  get web(): string[] {
    return this._web;
  }

  set web(value: string[]) {
    this._web = value;
  }

  @IsString({ each: true })
  private _admin: string[];

  get admin(): string[] {
    return this._admin;
  }

  set admin(value: string[]) {
    this._admin = value;
  }

  static factory = (data: IRole): Role =>
    new Role(data.map, data.web, data.admin);

  toObject() {
    return {
      map: this.map,
      web: this.web,
      admin: this.admin,
    };
  }
}

export const RoleFirestoreConverter: FirestoreDataConverter<Role> = {
  fromFirestore: (data: QueryDocumentSnapshot<IRole>): Role =>
    Role.factory(data.data()),
  toFirestore: (modelObject: Role): DocumentData => modelObject.toObject(),
};

import { FirestoreDataConverter } from '@google-cloud/firestore';
import { firestore } from 'firebase';

import { IRole, Role } from '../roles';

import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentReference = firestore.DocumentReference;

export const ROLE_AUDITS_COLLECTION_ID = 'role-audits';

export interface IRoleAudit {
  actingUserRef: DocumentReference<DocumentData> | null;
  affectedUserRef: DocumentReference<DocumentData>;
  previousRole: IRole;
  currentRole: IRole;
  updatedAt: Timestamp;
}

export class RoleAudit implements IRoleAudit {
  constructor(
    actingUserRef: DocumentReference<DocumentData> | null,
    affectedUserRef: DocumentReference<DocumentData>,
    previousRole: Role,
    currentRole: Role,
    updatedAt: Timestamp = Timestamp.now(),
  ) {
    this._actingUserRef = actingUserRef;
    this._affectedUserRef = affectedUserRef;
    this._previousRole = previousRole;
    this._currentRole = currentRole;
    this._updatedAt = updatedAt;
  }

  private _actingUserRef: DocumentReference<DocumentData> | null;

  get actingUserRef(): DocumentReference<DocumentData> | null {
    return this._actingUserRef;
  }

  set actingUserRef(value: DocumentReference<DocumentData> | null) {
    this._actingUserRef = value;
  }

  private _affectedUserRef: DocumentReference<DocumentData>;

  get affectedUserRef(): DocumentReference<DocumentData> {
    return this._affectedUserRef;
  }

  set affectedUserRef(value: DocumentReference<DocumentData>) {
    this._affectedUserRef = value;
  }

  private _previousRole: Role;

  get previousRole(): Role {
    return this._previousRole;
  }

  set previousRole(value: Role) {
    this._previousRole = value;
  }

  private _currentRole: Role;

  get currentRole(): Role {
    return this._currentRole;
  }

  set currentRole(value: Role) {
    this._currentRole = value;
  }

  private _updatedAt: Timestamp;

  get updatedAt(): Timestamp {
    return this._updatedAt;
  }

  set updatedAt(value: Timestamp) {
    this._updatedAt = value;
  }

  static factory = (data: IRoleAudit): RoleAudit =>
    new RoleAudit(
      data.actingUserRef,
      data.affectedUserRef,
      Role.factory(data.previousRole),
      Role.factory(data.currentRole),
      data.updatedAt,
    );

  toObject(): object {
    return {
      actingUserRef: this.actingUserRef,
      affectedUserRef: this.actingUserRef,
      previousRole: this.previousRole.toObject(),
      currentRole: this.currentRole.toObject(),
      updatedAt: this.updatedAt,
    };
  }
}

export const RoleAuditFirestoreConverter: FirestoreDataConverter<RoleAudit> = {
  fromFirestore: (data: QueryDocumentSnapshot<IRoleAudit>): RoleAudit =>
    RoleAudit.factory(data.data()),
  toFirestore: (modelObject: RoleAudit): DocumentData => modelObject.toObject(),
};

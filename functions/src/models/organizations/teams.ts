import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';

import { OrganizationType } from './index';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import Timestamp = firestore.Timestamp;

export interface ITeam extends DocumentData {
  name: string;
  types: OrganizationType[];
  createdAt?: Timestamp;
}

export class Team implements ITeam {
  constructor(name: string, types: OrganizationType[], createdAt = Timestamp.now()) {
    this._name = name;
    this._types = types;
    this._createdAt = createdAt;
  }

  @IsString()
  @IsNotEmpty()
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @IsArray()
  private _types: OrganizationType[];

  get types(): OrganizationType[] {
    return this._types;
  }

  set types(value: OrganizationType[]) {
    this._types = value;
  }

  /* TODO: When we reach greater than 500 offers per request created per second:
     https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
   */
  @IsObject()
  private _createdAt: Timestamp;

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  static factory = (data: ITeam): Team => new Team(data.name, data.types, data.createdAt);

  toObject(): object {
    return {
      name: this.name,
      types: this.types,
      createdAt: this.createdAt.toDate(),
    };
  }
}

export const TeamFirestoreConverter: FirestoreDataConverter<Team> = {
  fromFirestore: (data: QueryDocumentSnapshot<ITeam>): Team => {
    return Team.factory(data.data());
  },
  toFirestore: (modelObject: Team): ITeam => {
    return {
      name: modelObject.name,
      types: modelObject.types,
      createdAt: modelObject.createdAt,
    };
  },
};

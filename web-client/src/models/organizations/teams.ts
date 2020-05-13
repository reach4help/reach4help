/* eslint no-underscore-dangle: 0 */
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { firestore } from 'firebase';

import { OrganizationType } from './index';

export interface ITeam extends firebase.firestore.DocumentData {
  name: string;
  types: OrganizationType[];
  createdAt?: firebase.firestore.Timestamp;
}

export class Team implements ITeam {
  constructor(
    name: string,
    types: OrganizationType[],
    createdAt = firestore.Timestamp.now(),
  ) {
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
  private _createdAt: firebase.firestore.Timestamp;

  get createdAt(): firebase.firestore.Timestamp {
    return this._createdAt;
  }

  set createdAt(value: firebase.firestore.Timestamp) {
    this._createdAt = value;
  }

  static factory = (data: ITeam): Team =>
    new Team(data.name, data.types, data.createdAt);

  toObject(): object {
    return {
      name: this.name,
      types: this.types,
      createdAt: this.createdAt,
    };
  }
}

export const TeamFirestoreConverter: firebase.firestore.FirestoreDataConverter<Team> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<ITeam>,
  ): Team => Team.factory(data.data()),
  toFirestore: (modelObject: Team): firebase.firestore.DocumentData => ({
    name: modelObject.name,
    types: modelObject.types,
    createdAt: modelObject.createdAt,
  }),
};

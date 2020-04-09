import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';

import { OrganizationType } from './index';
import DocumentData = firestore.DocumentData;
import { FirestoreDataConverter, QueryDocumentSnapshot } from '@google-cloud/firestore/build/src';
import { Offer } from '../offers';

export interface ITeam extends DocumentData {
  name: string;
  types: OrganizationType[];
}

export class Team implements ITeam {
  @IsString()
  @IsNotEmpty()
  private _name: string;

  @IsArray()
  private _types: OrganizationType[];

  constructor(name: string, types: OrganizationType[]) {
    this._name = name;
    this._types = types;
  }

  static factory = (data: ITeam): Team => new Team(
    data.name,
    data.types,
  );

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get types(): OrganizationType[] {
    return this._types;
  }

  set types(value: OrganizationType[]) {
    this._types = value;
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
    };
  },
};

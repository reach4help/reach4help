import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';

import { OrganizationType } from './index';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface ITeam extends DocumentData {
  name: string;
  types: OrganizationType[];
}

export class Team implements ITeam {
  constructor(name: string, types: OrganizationType[]) {
    this._name = name;
    this._types = types;
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

  static factory = (data: ITeam): Team => new Team(data.name, data.types);
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

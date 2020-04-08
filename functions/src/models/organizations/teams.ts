import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';

import { OrganizationType } from './index';
import DocumentData = firestore.DocumentData;

export interface ITeam extends DocumentData {
  name: string;
  types: OrganizationType[];
}

export class Team implements ITeam, FirestoreDataConverter<Team> {
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

  // eslint-disable-next-line class-methods-use-this
  fromFirestore(data: ITeam): Team {
    return Team.factory(data);
  }

  // eslint-disable-next-line class-methods-use-this
  toFirestore(modelObject: Team): ITeam {
    return {
      name: modelObject.name,
      types: modelObject.types,
    };
  }
}

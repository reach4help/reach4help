import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';

import { IOrganization } from '../organizations';
import { ITeam } from '../organizations/teams';
import { IUser } from '../users';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;

export enum QuestionnaireType {
  pin = 'pin',
  cav = 'cav',
  org = 'org',
  team = 'team'
}

export interface IQuestionnaire extends DocumentData {
  parentRef: DocumentReference<IUser | ITeam | IOrganization>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };

  type: QuestionnaireType;
  createdAt: Timestamp;
  version: string;
}

export class Questionnaire implements IQuestionnaire {

  @IsNotEmptyObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _parentRef: DocumentReference<IUser | ITeam | IOrganization>;

  @IsNotEmptyObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _data: { [p: string]: any };

  @IsEnum(QuestionnaireType)
  private _type: QuestionnaireType;

  @IsObject()
  @IsNotEmptyObject()
  private _createdAt: FirebaseFirestore.Timestamp;

  @IsString()
  @IsNotEmpty()
  private _version: string;

  constructor(
    parentRef: DocumentReference<IUser | ITeam | IOrganization>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [p: string]: any },
    type: QuestionnaireType,
    createdAt: FirebaseFirestore.Timestamp,
    version: string,
  ) {
    this._parentRef = parentRef;
    this._createdAt = createdAt;
    this._data = data;
    this._type = type;
    this._version = version;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get parentRef(): DocumentReference<IUser | ITeam | IOrganization> {
    return this._parentRef;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set parentRef(value: DocumentReference<IUser | ITeam | IOrganization>) {
    this._parentRef = value;
  }

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get data(): { [p: string]: any } {
    return this._data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set data(value: { [p: string]: any }) {
    this._data = value;
  }

  get type(): QuestionnaireType {
    return this._type;
  }

  set type(value: QuestionnaireType) {
    this._type = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }
}

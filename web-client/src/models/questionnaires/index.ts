/* eslint no-underscore-dangle: 0 */
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';
import { firestore } from 'firebase';

export enum QuestionnaireType {
  pin = 'pin',
  cav = 'cav',
  org = 'org',
  team = 'team',
}

export interface IQuestionnaire extends firebase.firestore.DocumentData {
  parentRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };

  type: QuestionnaireType;
  version: string;
  createdAt?: firebase.firestore.Timestamp;
}

export class Questionnaire implements IQuestionnaire {
  constructor(
    parentRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [p: string]: any },
    type: QuestionnaireType,
    version: string,
    createdAt = firestore.Timestamp.now(),
  ) {
    this._parentRef = parentRef;
    this._data = data;
    this._type = type;
    this._version = version;
    this._createdAt = createdAt;
  }

  @IsNotEmptyObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _parentRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get parentRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > {
    return this._parentRef;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set parentRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
  ) {
    this._parentRef = value;
  }

  @IsNotEmptyObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _data: { [p: string]: any };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get data(): { [p: string]: any } {
    return this._data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set data(value: { [p: string]: any }) {
    this._data = value;
  }

  @IsEnum(QuestionnaireType)
  private _type: QuestionnaireType;

  get type(): QuestionnaireType {
    return this._type;
  }

  set type(value: QuestionnaireType) {
    this._type = value;
  }

  @IsString()
  @IsNotEmpty()
  private _version: string;

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }

  @IsObject()
  @IsNotEmptyObject()
  private _createdAt: firebase.firestore.Timestamp;

  get createdAt(): firebase.firestore.Timestamp {
    return this._createdAt;
  }

  set createdAt(value: firebase.firestore.Timestamp) {
    this._createdAt = value;
  }

  static factory = (data: IQuestionnaire): Questionnaire =>
    new Questionnaire(
      data.parentRef,
      data.data,
      data.type,
      data.version,
      data.createdAt,
    );

  toObject(): object {
    return {
      parentRef: this.parentRef,
      data: this.data,
      type: this.type,
      version: this.version,
      createdAt: this.createdAt.toDate(),
    };
  }
}

export const QuestionnaireFirestoreConverter: firebase.firestore.FirestoreDataConverter<Questionnaire> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IQuestionnaire>,
  ): Questionnaire => Questionnaire.factory(data.data()),
  toFirestore: (
    modelObject: Questionnaire,
  ): firebase.firestore.DocumentData => ({
    parentRef: modelObject.parentRef,
    data: modelObject.data,
    type: modelObject.type,
    createdAt: modelObject.createdAt,
    version: modelObject.version,
  }),
};

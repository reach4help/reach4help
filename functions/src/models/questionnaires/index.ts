import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from 'class-validator';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum QuestionnaireType {
  pin = 'pin',
  cav = 'cav',
  org = 'org',
  team = 'team',
}

export interface IQuestionnaire extends DocumentData {
  parentRef: DocumentReference<DocumentData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };

  type: QuestionnaireType;
  version: string;
  createdAt?: Timestamp;
}

export class Questionnaire implements IQuestionnaire {
  constructor(
    parentRef: DocumentReference<DocumentData>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [p: string]: any },
    type: QuestionnaireType,
    version: string,
    createdAt = Timestamp.now(),
  ) {
    this._parentRef = parentRef;
    this._data = data;
    this._type = type;
    this._version = version;
    this._createdAt = createdAt;
  }

  @IsNotEmptyObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _parentRef: DocumentReference<DocumentData>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get parentRef(): DocumentReference<DocumentData> {
    return this._parentRef;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set parentRef(value: DocumentReference<DocumentData>) {
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
  private _createdAt: Timestamp;

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  static factory = (data: IQuestionnaire): Questionnaire => new Questionnaire(data.parentRef, data.data, data.type, data.version, data.createdAt);

  toObject(): object {
    return {
      parentRef: this.parentRef,
      data: this.data,
      type: this.type,
      version: this.version,
      createdAt: this.createdAt,
    };
  }
}

export const QuestionnaireFirestoreConverter: FirestoreDataConverter<Questionnaire> = {
  fromFirestore: (data: QueryDocumentSnapshot<IQuestionnaire>): Questionnaire => {
    return Questionnaire.factory(data.data());
  },
  toFirestore: (modelObject: Questionnaire): DocumentData => {
    return modelObject.toObject();
  },
};

import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsInt, IsNotEmpty, IsNumber, IsObject, IsString, IsUrl, Max, Min } from 'class-validator';
import { firestore } from 'firebase-admin';

// eslint-disable-next-line import/no-cycle
import { IQuestionnaire } from '../questionnaires';
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;

export interface IUser extends DocumentData {
  cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null;
  pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null;
  averageRating: number;
  casesCompleted: number;
  requestsMade: number;
  pinRatingsReceived: number;
  cavRatingsReceived: number;
  username: string;
  displayName: string | null;
  displayPicture: string | null;
}

export class User implements IUser, FirestoreDataConverter<User> {

  @IsObject()
  private _cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null;

  @IsObject()
  private _pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null;

  @IsNumber()
  @Min(1)
  @Max(5)
  private _averageRating: number;

  @IsInt()
  @Min(0)
  private _casesCompleted: number;

  @IsInt()
  @Min(0)
  private _requestsMade: number;

  @IsInt()
  @Min(0)
  private _pinRatingsReceived: number;

  @IsInt()
  @Min(0)
  private _cavRatingsReceived: number;

  @IsString()
  @IsNotEmpty()
  private _username: string;

  @IsString()
  private _displayName: string | null;

  @IsUrl()
  private _displayPicture: string | null;

  constructor(
    cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null,
    pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null,
    averageRating: number,
    casesCompleted = 0,
    requestsMade = 0,
    pinRatingsReceived = 0,
    cavRatingsReceived = 0,
    username: string,
    displayName: string | null = null,
    displayPicture: string | null = null,
  ) {
    this._cavQuestionnaireRef = cavQuestionnaireRef;
    this._pinQuestionnaireRef = pinQuestionnaireRef;
    this._averageRating = averageRating;
    this._casesCompleted = casesCompleted;
    this._requestsMade = requestsMade;
    this._pinRatingsReceived = pinRatingsReceived;
    this._cavRatingsReceived = cavRatingsReceived;
    this._username = username;
    this._displayName = displayName;
    this._displayPicture = displayPicture;
  }

  static factory = (data: IUser): User => new User(
    data.cavQuestionnaireRef,
    data.pinQuestionnaireRef,
    data.averageRating,
    data.casesCompleted,
    data.requestsMade,
    data.pinRatingsReceived,
    data.cavRatingsReceived,
    data.username,
    data.displayName,
    data.displayPicture,
  );

  get cavQuestionnaireRef(): DocumentReference<IQuestionnaire> | null {
    return this._cavQuestionnaireRef;
  }

  set cavQuestionnaireRef(value: DocumentReference<IQuestionnaire> | null) {
    this._cavQuestionnaireRef = value;
  }

  get pinQuestionnaireRef(): DocumentReference<IQuestionnaire> | null {
    return this._pinQuestionnaireRef;
  }

  set pinQuestionnaireRef(value: DocumentReference<IQuestionnaire> | null) {
    this._pinQuestionnaireRef = value;
  }

  get averageRating(): number {
    return this._averageRating;
  }

  set averageRating(value: number) {
    this._averageRating = value;
  }

  get casesCompleted(): number {
    return this._casesCompleted;
  }

  set casesCompleted(value: number) {
    this._casesCompleted = value;
  }

  get requestsMade(): number {
    return this._requestsMade;
  }

  set requestsMade(value: number) {
    this._requestsMade = value;
  }

  get pinRatingsReceived(): number {
    return this._pinRatingsReceived;
  }

  set pinRatingsReceived(value: number) {
    this._pinRatingsReceived = value;
  }

  get cavRatingsReceived(): number {
    return this._cavRatingsReceived;
  }

  set cavRatingsReceived(value: number) {
    this._cavRatingsReceived = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get displayName(): string | null {
    return this._displayName;
  }

  set displayName(value: string | null) {
    this._displayName = value;
  }

  get displayPicture(): string | null {
    return this._displayPicture;
  }

  set displayPicture(value: string | null) {
    this._displayPicture = value;
  }

  fromFirestore(data: IUser): User {
    return User.factory(data);
  }

  toFirestore(modelObject: User): IUser {
    return {
      cavQuestionnaireRef: modelObject.cavQuestionnaireRef,
      pinQuestionnaireRef: modelObject.pinQuestionnaireRef,
      averageRating: modelObject.averageRating,
      casesCompleted: modelObject.casesCompleted,
      requestsMade: modelObject.requestsMade,
      pinRatingsReceived: modelObject.pinRatingsReceived,
      cavRatingsReceived: modelObject.cavRatingsReceived,
      username: modelObject.username,
      displayName: modelObject.displayName,
      displayPicture: modelObject.displayPicture,
    };
  }
}

/* eslint no-underscore-dangle: 0 */
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { firestore } from 'firebase';

export enum ApplicationPreference {
  pin = 'pin',
  cav = 'cav',
}

export interface IUser extends firebase.firestore.DocumentData {
  username: string;

  cavQuestionnaireRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  pinQuestionnaireRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  averageRating?: number | null;
  casesCompleted?: number;
  requestsMade?: number;
  pinRatingsReceived?: number;
  cavRatingsReceived?: number;
  displayName?: string | null;
  displayPicture?: string | null;
  applicationPreference?: ApplicationPreference;
  createdAt?: firebase.firestore.Timestamp;
}

export class User implements IUser {
  constructor(
    username: string,
    pinQuestionnaireRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null = null,
    cavQuestionnaireRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null = null,
    casesCompleted = 0,
    requestsMade = 0,
    pinRatingsReceived = 0,
    cavRatingsReceived = 0,
    averageRating: number | null = 1,
    displayName: string | null = null,
    displayPicture: string | null = null,
    applicationPreference = ApplicationPreference.pin,
    createdAt = firestore.Timestamp.now(),
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
    this._applicationPreference = applicationPreference;
    this._createdAt = createdAt;
  }

  @IsObject()
  @IsOptional()
  private _cavQuestionnaireRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;

  get cavQuestionnaireRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null {
    return this._cavQuestionnaireRef;
  }

  set cavQuestionnaireRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null,
  ) {
    this._cavQuestionnaireRef = value;
  }

  @IsObject()
  @IsOptional()
  private _pinQuestionnaireRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;

  get pinQuestionnaireRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null {
    return this._pinQuestionnaireRef;
  }

  set pinQuestionnaireRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null,
  ) {
    this._pinQuestionnaireRef = value;
  }

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  private _averageRating: number | null;

  get averageRating(): number | null {
    return this._averageRating;
  }

  set averageRating(value: number | null) {
    this._averageRating = value;
  }

  @IsInt()
  @Min(0)
  private _casesCompleted: number;

  get casesCompleted(): number {
    return this._casesCompleted;
  }

  set casesCompleted(value: number) {
    this._casesCompleted = value;
  }

  @IsInt()
  @Min(0)
  private _requestsMade: number;

  get requestsMade(): number {
    return this._requestsMade;
  }

  set requestsMade(value: number) {
    this._requestsMade = value;
  }

  @IsInt()
  @Min(0)
  private _pinRatingsReceived: number;

  get pinRatingsReceived(): number {
    return this._pinRatingsReceived;
  }

  set pinRatingsReceived(value: number) {
    this._pinRatingsReceived = value;
  }

  @IsInt()
  @Min(0)
  private _cavRatingsReceived: number;

  get cavRatingsReceived(): number {
    return this._cavRatingsReceived;
  }

  set cavRatingsReceived(value: number) {
    this._cavRatingsReceived = value;
  }

  @IsString()
  @IsNotEmpty()
  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  @IsString()
  @IsOptional()
  private _displayName: string | null;

  get displayName(): string | null {
    return this._displayName;
  }

  set displayName(value: string | null) {
    this._displayName = value;
  }

  @IsUrl()
  @IsOptional()
  private _displayPicture: string | null;

  get displayPicture(): string | null {
    return this._displayPicture;
  }

  set displayPicture(value: string | null) {
    this._displayPicture = value;
  }

  @IsEnum(ApplicationPreference)
  private _applicationPreference: ApplicationPreference;

  get applicationPreference(): ApplicationPreference {
    return this._applicationPreference;
  }

  set applicationPreference(value: ApplicationPreference) {
    this._applicationPreference = value;
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

  static factory = (data: IUser): User =>
    new User(
      data.username,
      data.pinQuestionnaireRef,
      data.cavQuestionnaireRef,
      data.casesCompleted,
      data.requestsMade,
      data.pinRatingsReceived,
      data.cavRatingsReceived,
      data.averageRating,
      data.displayName,
      data.displayPicture,
      data.applicationPreference,
      data.createdAt,
    );

  toObject(): object {
    return {
      cavQuestionnaireRef: this.cavQuestionnaireRef?.path,
      pinQuestionnaireRef: this.pinQuestionnaireRef?.path,
      username: this.username,
      casesCompleted: this.casesCompleted,
      requestsMade: this.requestsMade,
      pinRatingsReceived: this.pinRatingsReceived,
      cavRatingsReceived: this.cavRatingsReceived,
      averageRating: this.averageRating,
      displayName: this.displayName,
      displayPicture: this.displayPicture,
      applicationPreference: this.applicationPreference,
      createdAt: this.createdAt,
    };
  }
}

export const UserFirestoreConverter: firebase.firestore.FirestoreDataConverter<User> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IUser>,
  ): User => User.factory(data.data()),
  toFirestore: (modelObject: User): firebase.firestore.DocumentData => ({
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
    applicationPreference: modelObject.applicationPreference,
    createdAt: modelObject.createdAt,
  }),
};

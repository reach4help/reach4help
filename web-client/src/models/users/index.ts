/* eslint no-underscore-dangle: 0 */
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { firestore } from 'firebase';

export interface IUser extends firebase.firestore.DocumentData {
  username: string;
  casesCompleted?: number;
  requestsMade?: number;
  displayName?: string | null;
  displayPicture?: string | null;
  createdAt?: firebase.firestore.Timestamp;
}

export class User implements IUser {
  constructor(
    username: string,
    casesCompleted = 0,
    requestsMade = 0,
    displayName: string | null = null,
    displayPicture: string | null = null,
    createdAt = firestore.Timestamp.now(),
  ) {
    this._casesCompleted = casesCompleted;
    this._requestsMade = requestsMade;
    this._username = username;
    this._displayName = displayName;
    this._displayPicture = displayPicture;
    this._createdAt = createdAt;
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
      data.casesCompleted,
      data.requestsMade,
      data.displayName,
      data.displayPicture,
      data.createdAt,
    );

  toObject = (): object => ({
    username: this.username,
    casesCompleted: this.casesCompleted,
    requestsMade: this.requestsMade,
    displayName: this.displayName,
    displayPicture: this.displayPicture,
    createdAt: this.createdAt,
  });
}

export const UserFirestoreConverter: firebase.firestore.FirestoreDataConverter<User> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IUser>,
  ): User => User.factory(data.data()),
  toFirestore: (modelObject: User): firebase.firestore.DocumentData =>
    modelObject.toObject(),
};

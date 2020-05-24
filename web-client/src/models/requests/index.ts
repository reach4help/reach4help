/* eslint no-underscore-dangle: 0 */
import {
  Allow,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { firestore } from 'firebase';

import { IUser, User } from '../users';

export enum RequestStatus {
  pending = 'pending',
  ongoing = 'ongoing',
  completed = 'completed',
  cancelled = 'cancelled',
  removed = 'removed',
}

export interface IRequest extends firebase.firestore.DocumentData {
  cavUserRef?: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  cavUserSnapshot?: IUser | null;
  pinUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  pinUserSnapshot: IUser;
  title: string;
  description: string;
  latLng: firebase.firestore.GeoPoint;
  status?: RequestStatus;
  pinRating?: number | null;
  cavRating?: number | null;
  pinRatedAt?: firebase.firestore.Timestamp | null;
  cavRatedAt?: firebase.firestore.Timestamp | null;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export class Request implements IRequest {
  constructor(
    pinUserRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    pinUserSnapshot: User,
    title: string,
    description: string,
    latLng: firebase.firestore.GeoPoint,
    cavUserRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null = null,
    cavUserSnapshot: User | null = null,
    status = RequestStatus.pending,
    createdAt = firestore.Timestamp.now(),
    updatedAt = firestore.Timestamp.now(),
    pinRating: number | null = null,
    cavRating: number | null = null,
    pinRatedAt: firebase.firestore.Timestamp | null = null,
    cavRatedAt: firebase.firestore.Timestamp | null = null,
  ) {
    this._cavUserRef = cavUserRef;
    this._pinUserRef = pinUserRef;
    this._pinUserSnapshot = pinUserSnapshot;
    this._cavUserSnapshot = cavUserSnapshot;
    this._title = title;
    this._description = description;
    this._latLng = latLng;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._pinRating = pinRating;
    this._cavRating = cavRating;
    this._pinRatedAt = pinRatedAt;
    this._cavRatedAt = cavRatedAt;
  }

  @Allow()
  @IsOptional()
  private _cavUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;

  get cavUserRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null {
    return this._cavUserRef;
  }

  set cavUserRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    > | null,
  ) {
    this._cavUserRef = value;
  }

  @IsNotEmptyObject()
  private _pinUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;

  get pinUserRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > {
    return this._pinUserRef;
  }

  set pinUserRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
  ) {
    this._pinUserRef = value;
  }

  @ValidateNested()
  private _pinUserSnapshot: User;

  get pinUserSnapshot(): User {
    return this._pinUserSnapshot;
  }

  set pinUserSnapshot(value: User) {
    this._pinUserSnapshot = value;
  }

  @ValidateNested()
  @IsOptional()
  private _cavUserSnapshot: User | null;

  get cavUserSnapshot(): User | null {
    return this._cavUserSnapshot;
  }

  set cavUserSnapshot(value: User | null) {
    this._cavUserSnapshot = value;
  }

  @IsString()
  @IsNotEmpty()
  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  @IsString()
  @IsNotEmpty()
  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  @IsObject()
  private _latLng: firebase.firestore.GeoPoint;

  get latLng(): firebase.firestore.GeoPoint {
    return this._latLng;
  }

  set latLng(value: firebase.firestore.GeoPoint) {
    this._latLng = value;
  }

  @IsEnum(RequestStatus)
  private _status: RequestStatus;

  get status(): RequestStatus {
    return this._status;
  }

  set status(value: RequestStatus) {
    this._status = value;
  }

  /* TODO: When we reach greater than 500 requests created per second:
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

  /* TODO: When we reach greater than 500 requests updated per second:
     https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
   */
  @IsObject()
  private _updatedAt: firebase.firestore.Timestamp;

  get updatedAt(): firebase.firestore.Timestamp {
    return this._updatedAt;
  }

  set updatedAt(value: firebase.firestore.Timestamp) {
    this._updatedAt = value;
  }

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  private _pinRating: number | null;

  get pinRating(): number | null {
    return this._pinRating;
  }

  set pinRating(value: number | null) {
    this._pinRating = value;
  }

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  private _cavRating: number | null;

  get cavRating(): number | null {
    return this._cavRating;
  }

  set cavRating(value: number | null) {
    this._cavRating = value;
  }

  @Allow()
  @IsOptional()
  private _pinRatedAt: firebase.firestore.Timestamp | null;

  get pinRatedAt(): firebase.firestore.Timestamp | null {
    return this._pinRatedAt;
  }

  set pinRatedAt(value: firebase.firestore.Timestamp | null) {
    this._pinRatedAt = value;
  }

  @Allow()
  @IsOptional()
  private _cavRatedAt: firebase.firestore.Timestamp | null;

  get cavRatedAt(): firebase.firestore.Timestamp | null {
    return this._cavRatedAt;
  }

  set cavRatedAt(value: firebase.firestore.Timestamp | null) {
    this._cavRatedAt = value;
  }

  static factory = (data: IRequest): Request =>
    new Request(
      data.pinUserRef,
      User.factory(data.pinUserSnapshot),
      data.title,
      data.description,
      data.latLng,
      data.cavUserRef,
      // This field may be null
      data.cavUserSnapshot ? User.factory(data.cavUserSnapshot) : null,
      data.status,
      data.createdAt,
      data.updatedAt,
      data.pinRating,
      data.cavRating,
      data.pinRatedAt,
      data.cavRatedAt,
    );

  toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      cavUserSnapshot: this.cavUserSnapshot
        ? this.cavUserSnapshot.toObject()
        : null,
      pinUserRef: this.pinUserRef,
      pinUserSnapshot: this.pinUserSnapshot.toObject(),
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      pinRating: this.pinRating,
      cavRating: this.cavRating,
      pinRatedAt: this.pinRatedAt,
      cavRatedAt: this.cavRatedAt,
    };
  }
}

export const RequestFirestoreConverter: firebase.firestore.FirestoreDataConverter<Request> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IRequest>,
  ): Request => Request.factory(data.data()),
  toFirestore: (modelObject: Request): firebase.firestore.DocumentData =>
    modelObject.toObject(),
};

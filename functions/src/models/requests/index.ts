import { FirestoreDataConverter } from '@google-cloud/firestore';
import { Allow, IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { firestore } from 'firebase';

import { IUser, User } from '../users';
import GeoPoint = firestore.GeoPoint;
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum RequestStatus {
  pending = 'pending',
  ongoing = 'ongoing',
  completed = 'completed',
  cancelled = 'cancelled',
  removed = 'removed',
}

export interface IRequest extends DocumentData {
  cavUserRef?: DocumentReference<DocumentData> | null;
  cavUserSnapshot?: IUser | null;
  pinUserRef: DocumentReference<DocumentData>;
  pinUserSnapshot: IUser;
  title: string;
  description: string;
  latLng: GeoPoint;
  streetAddress: string;
  status?: RequestStatus;
  pinRating?: number | null;
  cavRating?: number | null;
  pinRatedAt?: Timestamp | null;
  cavRatedAt?: Timestamp | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export class Request implements IRequest {
  constructor(
    pinUserRef: DocumentReference<DocumentData>,
    pinUserSnapshot: User,
    title: string,
    description: string,
    latLng: GeoPoint,
    streetAddress: string,
    cavUserRef: DocumentReference<DocumentData> | null = null,
    cavUserSnapshot: User | null = null,
    status = RequestStatus.pending,
    createdAt = Timestamp.now(),
    updatedAt = Timestamp.now(),
    pinRating: number | null = null,
    cavRating: number | null = null,
    pinRatedAt: Timestamp | null = null,
    cavRatedAt: Timestamp | null = null,
  ) {
    this._cavUserRef = cavUserRef;
    this._pinUserRef = pinUserRef;
    this._pinUserSnapshot = pinUserSnapshot;
    this._cavUserSnapshot = cavUserSnapshot;
    this._title = title;
    this._description = description;
    this._latLng = latLng;
    this._streetAddress = streetAddress;
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
  private _cavUserRef: DocumentReference<DocumentData> | null;

  get cavUserRef(): DocumentReference<DocumentData> | null {
    return this._cavUserRef;
  }

  set cavUserRef(value: DocumentReference<DocumentData> | null) {
    this._cavUserRef = value;
  }

  @IsNotEmptyObject()
  private _pinUserRef: DocumentReference<DocumentData>;

  get pinUserRef(): DocumentReference<DocumentData> {
    return this._pinUserRef;
  }

  set pinUserRef(value: DocumentReference<DocumentData>) {
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
  private _latLng: GeoPoint;

  get latLng(): GeoPoint {
    return this._latLng;
  }

  set latLng(value: GeoPoint) {
    this._latLng = value;
  }

  @IsString()
  private _streetAddress: string;

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(value: string) {
    this._streetAddress = value;
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
  private _createdAt: Timestamp;

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  /* TODO: When we reach greater than 500 requests updated per second:
     https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
   */
  @IsObject()
  private _updatedAt: Timestamp;

  get updatedAt(): Timestamp {
    return this._updatedAt;
  }

  set updatedAt(value: Timestamp) {
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
  private _pinRatedAt: Timestamp | null;

  get pinRatedAt(): Timestamp | null {
    return this._pinRatedAt;
  }

  set pinRatedAt(value: Timestamp | null) {
    this._pinRatedAt = value;
  }

  @Allow()
  @IsOptional()
  private _cavRatedAt: Timestamp | null;

  get cavRatedAt(): Timestamp | null {
    return this._cavRatedAt;
  }

  set cavRatedAt(value: Timestamp | null) {
    this._cavRatedAt = value;
  }

  static factory = (data: IRequest): Request =>
    new Request(
      data.pinUserRef,
      User.factory(data.pinUserSnapshot),
      data.title,
      data.description,
      data.latLng,
      data.streetAddress,
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
      cavUserSnapshot: this.cavUserSnapshot ? this.cavUserSnapshot.toObject() : null,
      pinUserRef: this.pinUserRef,
      pinUserSnapshot: this.pinUserSnapshot.toObject(),
      title: this.title,
      description: this.description,
      latLng: this.latLng,
      streetAddress: this.streetAddress,
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

export const RequestFirestoreConverter: FirestoreDataConverter<Request> = {
  fromFirestore: (data: QueryDocumentSnapshot<IRequest>): Request => {
    return Request.factory(data.data());
  },
  toFirestore: (modelObject: Request): DocumentData => {
    return modelObject.toObject();
  },
};

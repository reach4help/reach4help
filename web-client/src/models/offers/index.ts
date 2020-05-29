/* eslint no-underscore-dangle: 0 */
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { firestore } from 'firebase';

import { IRequest, Request } from '../requests';
import { IUser, User } from '../users';

export enum OfferStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  cavDeclined = 'cav_declined',
}

export interface IOffer extends firebase.firestore.DocumentData {
  cavUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  pinUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  requestRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  cavUserSnapshot: IUser;
  requestSnapshot: IRequest | null;
  message: string;
  status: OfferStatus;
  createdAt?: firebase.firestore.Timestamp;
  seenAt?: firebase.firestore.Timestamp | null;
}

export class Offer implements IOffer {
  constructor(
    cavUserRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    pinUserRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    requestRef: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
    cavUserSnapshot: User,
    requestSnapshot: Request | null,
    message: string,
    status: OfferStatus,
    createdAt = firestore.Timestamp.now(),
    seenAt: firebase.firestore.Timestamp | null = null,
  ) {
    this._cavUserRef = cavUserRef;
    this._pinUserRef = pinUserRef;
    this._requestRef = requestRef;
    this._cavUserSnapshot = cavUserSnapshot;
    this._requestSnapshot = requestSnapshot;
    this._message = message;
    this._status = status;
    this._createdAt = createdAt;
    this._seenAt = seenAt;
  }

  @IsObject()
  private _cavUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;

  get cavUserRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > {
    return this._cavUserRef;
  }

  set cavUserRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
  ) {
    this._cavUserRef = value;
  }

  @IsObject()
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

  @IsObject()
  private _requestRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;

  get requestRef(): firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > {
    return this._requestRef;
  }

  set requestRef(
    value: firebase.firestore.DocumentReference<
      firebase.firestore.DocumentData
    >,
  ) {
    this._requestRef = value;
  }

  @ValidateNested()
  private _cavUserSnapshot: User;

  get cavUserSnapshot(): User {
    return this._cavUserSnapshot;
  }

  set cavUserSnapshot(value: User) {
    this._cavUserSnapshot = value;
  }

  @ValidateNested()
  @IsOptional()
  private _requestSnapshot: Request | null;

  get requestSnapshot(): Request | null {
    return this._requestSnapshot;
  }

  set requestSnapshot(value: Request | null) {
    this._requestSnapshot = value;
  }

  @IsString()
  @IsNotEmpty()
  private _message: string;

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  @IsEnum(OfferStatus)
  private _status: OfferStatus;

  get status(): OfferStatus {
    return this._status;
  }

  set status(value: OfferStatus) {
    this._status = value;
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

  @IsObject()
  private _seenAt: firebase.firestore.Timestamp | null;

  get seenAt(): firebase.firestore.Timestamp | null {
    return this._seenAt;
  }

  set seenAt(value: firebase.firestore.Timestamp | null) {
    this._seenAt = value;
  }

  static factory = (data: IOffer): Offer =>
    new Offer(
      data.cavUserRef,
      data.pinUserRef,
      data.requestRef,
      User.factory(data.cavUserSnapshot),
      data.requestSnapshot ? Request.factory(data.requestSnapshot) : null,
      data.message,
      data.status,
      data.createdAt,
      data.seenAt,
    );

  toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      pinUserRef: this.pinUserRef,
      requestRef: this.requestRef,
      cavUserSnapshot: this.cavUserSnapshot.toObject(),
      requestSnapshot: this.requestSnapshot
        ? this.requestSnapshot.toObject()
        : null,
      message: this.message,
      status: this.status,
      createdAt: this.createdAt,
      seenAt: this.seenAt,
    };
  }
}

export const OfferFirestoreConverter: firebase.firestore.FirestoreDataConverter<Offer> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IOffer>,
  ): Offer => Offer.factory(data.data()),
  toFirestore: (modelObject: Offer): firebase.firestore.DocumentData =>
    modelObject.toObject(),
};

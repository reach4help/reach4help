/* eslint no-underscore-dangle: 0 */
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { firestore } from 'firebase';

import { IUser, User, UserFirestoreConverter } from '../users';

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
  message: string;
  status: OfferStatus;
  createdAt?: firebase.firestore.Timestamp;
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
    message: string,
    status: OfferStatus,
    createdAt = firestore.Timestamp.now(),
  ) {
    this._cavUserRef = cavUserRef;
    this._pinUserRef = pinUserRef;
    this._requestRef = requestRef;
    this._cavUserSnapshot = cavUserSnapshot;
    this._message = message;
    this._status = status;
    this._createdAt = createdAt;
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

  static factory = (data: IOffer): Offer =>
    new Offer(
      data.cavUserRef,
      data.pinUserRef,
      data.requestRef,
      User.factory(data.cavUserSnapshot),
      data.message,
      data.status,
      data.createdAt,
    );

  toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      pinUserRef: this.pinUserRef,
      requestRef: this.requestRef,
      cavUserSnapshot: User.factory(this.cavUserSnapshot),
      message: this.message,
      status: this.status,
      createdAt: this.createdAt.toDate(),
    };
  }
}

export const OfferFirestoreConverter: firebase.firestore.FirestoreDataConverter<Offer> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IOffer>,
  ): Offer => Offer.factory(data.data()),
  toFirestore: (modelObject: Offer): firebase.firestore.DocumentData => ({
    cavUserRef: modelObject.cavUserRef,
    pinUserRef: modelObject.pinUserRef,
    requestRef: modelObject.requestRef,
    cavUserSnapshot: UserFirestoreConverter.toFirestore(
      modelObject.cavUserSnapshot,
    ),
    message: modelObject.message,
    status: modelObject.status,
    createdAt: modelObject.createdAt,
  }),
};

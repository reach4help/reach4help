import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { firestore } from 'firebase-admin';

import { IRequest } from '../requests';
import { IUser, User } from '../users';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum OfferStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

export interface IOffer extends DocumentData {
  cavUserRef: DocumentReference<IUser>;
  pinUserRef: DocumentReference<IUser>;
  requestRef: DocumentReference<IRequest>;
  cavUserSnapshot: IUser;
  message: string;
  status: OfferStatus;
  createdAt?: Timestamp;
}

export class Offer implements IOffer {

  @IsObject()
  private _cavUserRef: DocumentReference<IUser>;

  @IsObject()
  private _pinUserRef: DocumentReference<IUser>;

  @IsObject()
  private _requestRef: DocumentReference<IRequest>;

  @ValidateNested()
  private _cavUserSnapshot: User;

  @IsString()
  @IsNotEmpty()
  private _message: string;

  @IsEnum(OfferStatus)
  private _status: OfferStatus;

  /* TODO: When we reach greater than 500 offers per request created per second:
     https://firebase.google.com/docs/firestore/solutions/shard-timestamp#sharding_a_timestamp_field
   */
  @IsObject()
  private _createdAt: Timestamp;

  constructor(
    cavUserRef: DocumentReference<IUser>,
    pinUserRef: DocumentReference<IUser>,
    requestRef: DocumentReference<IRequest>,
    cavUserSnapshot: User,
    message: string,
    status: OfferStatus,
    createdAt = Timestamp.now(),
  ) {
    this._cavUserRef = cavUserRef;
    this._pinUserRef = pinUserRef;
    this._requestRef = requestRef;
    this._cavUserSnapshot = cavUserSnapshot;
    this._message = message;
    this._status = status;
    this._createdAt = createdAt;
  }

  static factory = (data: IOffer): Offer => new Offer(
    data.cavUserRef,
    data.pinUserRef,
    data.requestRef,
    User.factory(data.cavUserSnapshot),
    data.message,
    data.status,
    data.createdAt,
  );

  get cavUserRef(): DocumentReference<IUser> {
    return this._cavUserRef;
  }

  set cavUserRef(value: DocumentReference<IUser>) {
    this._cavUserRef = value;
  }

  get pinUserRef(): DocumentReference<IUser> {
    return this._pinUserRef;
  }

  set pinUserRef(value: DocumentReference<IUser>) {
    this._pinUserRef = value;
  }

  get requestRef(): FirebaseFirestore.DocumentReference<IRequest> {
    return this._requestRef;
  }

  set requestRef(value: FirebaseFirestore.DocumentReference<IRequest>) {
    this._requestRef = value;
  }

  get cavUserSnapshot(): User {
    return this._cavUserSnapshot;
  }

  set cavUserSnapshot(value: User) {
    this._cavUserSnapshot = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get status(): OfferStatus {
    return this._status;
  }

  set status(value: OfferStatus) {
    this._status = value;
  }

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  toObject(): object {
    return {
      cavUserRef: this.cavUserRef.path,
      pinUserRef: this.pinUserRef.path,
      requestRef: this.requestRef.path,
      cavUserSnapshot: User.factory(this.cavUserSnapshot),
      message: this.message,
      status: this.status,
      createdAt: this.createdAt.toDate(),
    };
  }
}

export const OfferFirestoreConverter: FirestoreDataConverter<Offer> = {
  fromFirestore: (data: QueryDocumentSnapshot<IOffer>): Offer => {
    return Offer.factory(data.data());
  },
  toFirestore: (modelObject: Offer): IOffer => {
    return {
      cavUserRef: modelObject.cavUserRef,
      pinUserRef: modelObject.pinUserRef,
      requestRef: modelObject.requestRef,
      cavUserSnapshot: modelObject.cavUserSnapshot,
      message: modelObject.message,
      status: modelObject.status,
      createdAt: modelObject.createdAt,
    };
  },
};

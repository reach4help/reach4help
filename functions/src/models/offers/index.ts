import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { firestore } from 'firebase';

import { IRequest, Request } from '../requests';
import { IUser, User } from '../users';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentReference = firestore.DocumentReference;

export enum OfferStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  cavDeclined = 'cav_declined',
}

export interface IOffer extends DocumentData {
  cavUserRef: DocumentReference<DocumentData>;
  pinUserRef: DocumentReference<DocumentData>;
  requestRef: DocumentReference<DocumentData>;
  cavUserSnapshot: IUser;
  requestSnapshot: IRequest | null;
  message: string;
  status: OfferStatus;
  createdAt?: Timestamp;
  seenAt?: Timestamp;
}

export class Offer implements IOffer {
  constructor(
    cavUserRef: DocumentReference<DocumentData>,
    pinUserRef: DocumentReference<DocumentData>,
    requestRef: DocumentReference<DocumentData>,
    cavUserSnapshot: User,
    requestSnapshot: Request | null,
    message: string,
    status: OfferStatus,
    createdAt = Timestamp.now(),
    seenAt = Timestamp.now(),
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
  private _cavUserRef: DocumentReference<DocumentData>;

  get cavUserRef(): DocumentReference<DocumentData> {
    return this._cavUserRef;
  }

  set cavUserRef(value: DocumentReference<DocumentData>) {
    this._cavUserRef = value;
  }

  @IsObject()
  private _pinUserRef: DocumentReference<DocumentData>;

  get pinUserRef(): DocumentReference<DocumentData> {
    return this._pinUserRef;
  }

  set pinUserRef(value: DocumentReference<DocumentData>) {
    this._pinUserRef = value;
  }

  @IsObject()
  private _requestRef: DocumentReference<DocumentData>;

  get requestRef(): DocumentReference<DocumentData> {
    return this._requestRef;
  }

  set requestRef(value: DocumentReference<DocumentData>) {
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
  private _createdAt: Timestamp;

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  set createdAt(value: Timestamp) {
    this._createdAt = value;
  }

  @IsObject()
  @IsOptional()
  private _seenAt: Timestamp;

  get seenAt(): Timestamp {
    return this._seenAt;
  }

  set seenAt(value: Timestamp) {
    this.seenAt = value;
  }

  static factory = (data: IOffer): Offer => {
    return new Offer(
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
  };

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
  fromFirestore: (data: QueryDocumentSnapshot<IOffer>): Offer => {
    return Offer.factory(data.data());
  },
  toFirestore: (modelObject: Offer): DocumentData => modelObject.toObject(),
};

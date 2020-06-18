import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray } from 'class-validator';
import { firestore } from 'firebase-admin';

import { IRequest, Request } from '../requests';
import { IOffer, Offer, OfferStatus } from './index';

import { User } from '../users';
import { IUserAddress } from '../users/privilegedInformation';

import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface IOfferWithLocation extends IOffer {
  address: IUserAddress;
}

export class OfferWithLocation extends Offer implements IOfferWithLocation {
  constructor(
    cavUserRef: DocumentReference<DocumentData>,
    pinUserRef: DocumentReference<DocumentData>,
    requestRef: DocumentReference<DocumentData>,
    cavUserSnapshot: User,
    requestSnapshot: Request | null,
    message: string,
    status: OfferStatus,
    address: IUserAddress,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
    seenAt?: Timestamp | null,
  ) {
    super(cavUserRef, pinUserRef, requestRef, cavUserSnapshot, requestSnapshot, message, status, createdAt, updatedAt, seenAt);
    this._address = address;
  }

  @IsArray()
  private _address: IUserAddress;

  get address(): IUserAddress {
    return this._address;
  }

  set address(address: IUserAddress) {
    this._address = address;
  }

  public getOffer(): Offer {
    return Offer.factory(this.toObject() as IOffer);
  }

  public static factory(data: IOfferWithLocation): OfferWithLocation {
    return new OfferWithLocation(
      data.cavUserRef,
      data.pinUserRef,
      data.requestRef,
      User.factory(data.cavUserSnapshot),
      Request.factory(data.requestSnapshot as IRequest),
      data.message,
      data.status,
      data.address,
      data.createdAt,
      data.updatedAt,
      data.seenAt,
    );
  }

  public toObject(): object {
    return {
      cavUserRef: this.cavUserRef.path,
      pinUserRef: this.pinUserRef.path,
      requestRef: this.requestRef.path,
      cavUserSnapshot: this.cavUserSnapshot.toObject(),
      requestSnapshot: this.requestSnapshot?.toObject(),
      message: this.message,
      status: this.status,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      seenAt: this.seenAt,
    };
  }
}

export const OfferWithLocationFirestoreConverter: FirestoreDataConverter<Offer> = {
  fromFirestore: (data: QueryDocumentSnapshot<IOfferWithLocation>): OfferWithLocation => {
    return OfferWithLocation.factory(data.data());
  },
  toFirestore: (modelObject: OfferWithLocation): DocumentData => {
    return modelObject.toObject();
  },
};

/* eslint no-underscore-dangle: 0 */
import { IsArray } from 'class-validator';
import { firestore } from 'firebase';

import { User } from '../users';
import { IUserAddress } from '../users/privilegedInformation';
import { IOffer, Offer, OfferStatus } from './index';

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
    message: string,
    status: OfferStatus,
    address: IUserAddress,
    createdAt = Timestamp.now(),
  ) {
    super(
      cavUserRef,
      pinUserRef,
      requestRef,
      cavUserSnapshot,
      message,
      status,
      createdAt,
    );
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
      data.message,
      data.status,
      data.address,
      data.createdAt,
    );
  }

  public toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      pinUserRef: this.pinUserRef,
      requestRef: this.requestRef,
      cavUserSnapshot: this.cavUserSnapshot.toObject(),
      message: this.message,
      status: this.status,
      address: this.address,
      createdAt: this.createdAt,
    };
  }
}

export const OfferWithLocationFirestoreConverter: firebase.firestore.FirestoreDataConverter<Offer> = {
  fromFirestore: (
    data: QueryDocumentSnapshot<IOfferWithLocation>,
  ): OfferWithLocation => OfferWithLocation.factory(data.data()),
  toFirestore: (modelObject: OfferWithLocation): DocumentData =>
    modelObject.toObject(),
};

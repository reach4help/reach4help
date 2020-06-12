/* eslint no-underscore-dangle: 0 */
import { IsArray } from 'class-validator';
import { firestore } from 'firebase';
import { firestore as db } from 'src/firebase';

import { IRequest, Request } from '../requests';
import { User } from '../users';
import { IUserAddress } from '../users/privilegedInformation';
import { IOffer, Offer, OfferStatus } from './index';

export interface IOfferWithLocation extends IOffer {
  address: IUserAddress;
}

export class OfferWithLocation extends Offer implements IOfferWithLocation {
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
    address: IUserAddress,
    createdAt?: firebase.firestore.Timestamp,
    updatedAt?: firebase.firestore.Timestamp,
    seenAt?: firebase.firestore.Timestamp | null,
  ) {
    super(
      cavUserRef,
      pinUserRef,
      requestRef,
      cavUserSnapshot,
      requestSnapshot,
      message,
      status,
      createdAt,
      updatedAt,
      seenAt,
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
      db.doc(data.cavUserRef as any),
      db.doc(data.pinUserRef as any),
      db.doc(data.requestRef as any),
      User.factory({
        ...data.cavUserSnapshot,
        createdAt: data.cavUserSnapshot.createdAt
          ? new firestore.Timestamp(
              (data.cavUserSnapshot.createdAt as any)._seconds,
              (data.cavUserSnapshot.createdAt as any)._nanoseconds,
            )
          : data.cavUserSnapshot.createdAt,
      }),
      Request.factory({
        ...(data.requestSnapshot as IRequest),
        createdAt: data.requestSnapshot?.createdAt
          ? new firestore.Timestamp(
              (data.requestSnapshot.createdAt as any)._seconds,
              (data.requestSnapshot.createdAt as any)._nanoseconds,
            )
          : data.requestSnapshot?.createdAt,
        latLng: data.requestSnapshot?.latLng
          ? new firestore.GeoPoint(
              (data.requestSnapshot.latLng as any)._latitude,
              (data.requestSnapshot.latLng as any)._longitude,
            )
          : new firestore.GeoPoint(0, 0),
      }),
      data.message,
      data.status,
      {
        ...data.address,
        coords: data.address.coords
          ? new firestore.GeoPoint(
              (data.address.coords as any)._latitude,
              (data.address.coords as any)._longitude,
            )
          : data.address.coords,
      },
      data.createdAt
        ? new firestore.Timestamp(
            (data.createdAt as any)._seconds,
            (data.createdAt as any)._nanoseconds,
          )
        : data.createdAt,
      data.updatedAt
        ? new firestore.Timestamp(
            (data.updatedAt as any)._seconds,
            (data.createdAt as any)._nanoseconds,
          )
        : data.updatedAt,
      data.seenAt
        ? new firestore.Timestamp(
            (data.seenAt as any)._seconds,
            (data.seenAt as any)._nanoseconds,
          )
        : data.seenAt,
    );
  }

  public toObject(): object {
    return {
      cavUserRef: this.cavUserRef,
      pinUserRef: this.pinUserRef,
      requestRef: this.requestRef,
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

export const OfferWithLocationFirestoreConverter: firebase.firestore.FirestoreDataConverter<Offer> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IOfferWithLocation>,
  ): OfferWithLocation => OfferWithLocation.factory(data.data()),
  toFirestore: (
    modelObject: OfferWithLocation,
  ): firebase.firestore.DocumentData => modelObject.toObject(),
};

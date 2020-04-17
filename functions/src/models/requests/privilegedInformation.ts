import { firestore } from 'firebase';
import { IsObject } from 'class-validator';
import { FirestoreDataConverter } from '@google-cloud/firestore';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface IPrivilegedRequestInformation extends DocumentData {
  address: google.maps.GeocoderResult;
}

export class PrivilegedRequestInformation implements IPrivilegedRequestInformation {

  constructor(
    address: google.maps.GeocoderResult,
  ) {
    this._address = address;
  }

  @IsObject()
  private _address: google.maps.GeocoderResult;

  get address(): google.maps.GeocoderResult {
    return this._address;
  }

  set address(value: google.maps.GeocoderResult) {
    this._address = value;
  }

  static factory = (data: IPrivilegedRequestInformation): PrivilegedRequestInformation =>
    new PrivilegedRequestInformation(
      data.address,
    );

  toObject(): object {
    return {
      address: this.address,
    };
  }
}

export const PrivilegedRequestInformationFirestoreConverter: FirestoreDataConverter<PrivilegedRequestInformation> = {
  fromFirestore: (data: QueryDocumentSnapshot<IPrivilegedRequestInformation>): PrivilegedRequestInformation => {
    return PrivilegedRequestInformation.factory(data.data());
  },
  toFirestore: (modelObject: PrivilegedRequestInformation): DocumentData => {
    return {
      address: modelObject.address,
    };
  },
};

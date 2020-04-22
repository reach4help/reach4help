/* eslint no-underscore-dangle: 0 */
import { IsObject } from 'class-validator';

export interface IPrivilegedRequestInformation
  extends firebase.firestore.DocumentData {
  address: google.maps.GeocoderResult;
}

export class PrivilegedRequestInformation
  implements IPrivilegedRequestInformation {
  constructor(address: google.maps.GeocoderResult) {
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

  static factory = (
    data: IPrivilegedRequestInformation,
  ): PrivilegedRequestInformation =>
    new PrivilegedRequestInformation(data.address);

  toObject(): object {
    return {
      address: this.address,
    };
  }
}

export const PrivilegedRequestInformationFirestoreConverter: firebase.firestore.FirestoreDataConverter<PrivilegedRequestInformation> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<
      IPrivilegedRequestInformation
    >,
  ): PrivilegedRequestInformation =>
    PrivilegedRequestInformation.factory(data.data()),
  toFirestore: (
    modelObject: PrivilegedRequestInformation,
  ): firebase.firestore.DocumentData => ({
    address: modelObject.address,
  }),
};

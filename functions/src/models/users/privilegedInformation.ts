import { firestore } from 'firebase';
import { IsObject, IsString } from 'class-validator';

import { FirestoreDataConverter } from '@google-cloud/firestore';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface IPrivilegedUserInformation extends DocumentData {
  address: google.maps.GeocoderResult;

  termsAccepted: Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
  privacyAccepted: Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  privacyVersion: string;
}

export class PrivilegedUserInformation implements IPrivilegedUserInformation {

  constructor(
    address: google.maps.GeocoderResult,
    privacyAccepted: Timestamp,
    privacyVersion: string,
    termsAccepted: Timestamp,
    termsVersion: string,
  ) {
    this._address = address;
    this._privacyAccepted = privacyAccepted;
    this._privacyVersion = privacyVersion;
    this._termsAccepted = termsAccepted;
    this._termsVersion = termsVersion;
  }

  @IsObject()
  private _address: google.maps.GeocoderResult;

  get address(): google.maps.GeocoderResult {
    return this._address;
  }

  set address(value: google.maps.GeocoderResult) {
    this._address = value;
  }

  @IsObject()
  private _privacyAccepted: Timestamp;

  get privacyAccepted(): Timestamp {
    return this._privacyAccepted;
  }

  set privacyAccepted(value: Timestamp) {
    this._privacyAccepted = value;
  }

  @IsString()
  private _privacyVersion: string;

  get privacyVersion(): string {
    return this._privacyVersion;
  }

  set privacyVersion(value: string) {
    this._privacyVersion = value;
  }

  @IsObject()
  private _termsAccepted: Timestamp;

  get termsAccepted(): Timestamp {
    return this._termsAccepted;
  }

  set termsAccepted(value: Timestamp) {
    this._termsAccepted = value;
  }

  @IsString()
  private _termsVersion: string;

  get termsVersion(): string {
    return this._termsVersion;
  }

  set termsVersion(value: string) {
    this._termsVersion = value;
  }

  static factory = (data: IPrivilegedUserInformation): PrivilegedUserInformation =>
    new PrivilegedUserInformation(
      data.address,
      data.privacyAccepted,
      data.privacyVersion,
      data.termsAccepted,
      data.termsVersion,
    );

  toObject(): object {
    return {
      address: this.address,
      privacyAccepted: this.privacyAccepted,
      privacyVersion: this.privacyVersion,
      termsAccepted: this.termsAccepted,
      termsVersion: this.termsVersion,
    };
  }
}

export const PrivilegedUserInformationFirestoreConverter: FirestoreDataConverter<PrivilegedUserInformation> = {
  fromFirestore: (data: QueryDocumentSnapshot<IPrivilegedUserInformation>): PrivilegedUserInformation => {
    return PrivilegedUserInformation.factory(data.data());
  },
  toFirestore: (modelObject: PrivilegedUserInformation): DocumentData => {
    return {
      address: modelObject.address,
      privacyAccepted: modelObject.privacyAccepted,
      privacyVersion: modelObject.privacyVersion,
      termsAccepted: modelObject.termsAccepted,
      termsVersion: modelObject.termsVersion,
    };
  },
};

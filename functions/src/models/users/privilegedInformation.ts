import { firestore } from 'firebase';
import { IsObject, IsOptional, IsString } from 'class-validator';

import { FirestoreDataConverter } from '@google-cloud/firestore';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export interface IUserAddress {
  name: string;
  address1?: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  coords?: firebase.firestore.GeoPoint;
}

export interface IPrivilegedUserInformation extends DocumentData {
  addresses: Record<string, IUserAddress>;
  termsAccepted: Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
  privacyAccepted: Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  privacyVersion: string;
  sendNotifications: Timestamp | null; // acts as a timestamp of when and as a boolean: if accepted it exists.
}

export class PrivilegedUserInformation implements IPrivilegedUserInformation {
  constructor(
    addresses: Record<string, IUserAddress>,
    privacyAccepted: Timestamp,
    privacyVersion: string,
    termsAccepted: Timestamp,
    termsVersion: string,
    sendNotifications: Timestamp | null,
  ) {
    this._addresses = addresses;
    this._privacyAccepted = privacyAccepted;
    this._privacyVersion = privacyVersion;
    this._termsAccepted = termsAccepted;
    this._termsVersion = termsVersion;
    this._sendNotifications = sendNotifications;
  }

  @IsObject()
  private _addresses: Record<string, IUserAddress>;

  get addresses(): Record<string, IUserAddress> {
    return this._addresses;
  }

  set addresses(value: Record<string, IUserAddress>) {
    this._addresses = value;
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

  @IsObject()
  @IsOptional()
  private _sendNotifications: Timestamp | null;

  get sendNotifications(): Timestamp | null {
    return this._sendNotifications;
  }

  set sendNotifications(value: Timestamp | null) {
    this._sendNotifications = value;
  }

  static factory = (data: IPrivilegedUserInformation): PrivilegedUserInformation =>
    new PrivilegedUserInformation(
      data.addresses && !((data.addresses as unknown) as IUserAddress).coords ? data.addresses : { default: data.address as IUserAddress },
      data.privacyAccepted,
      data.privacyVersion,
      data.termsAccepted,
      data.termsVersion,
      data.sendNotifications,
    );

  toObject(): object {
    return {
      addresses: this.addresses,
      privacyAccepted: this.privacyAccepted,
      privacyVersion: this.privacyVersion,
      termsAccepted: this.termsAccepted,
      termsVersion: this.termsVersion,
      sendNotifications: this.sendNotifications,
    };
  }
}

export const PrivilegedUserInformationFirestoreConverter: FirestoreDataConverter<PrivilegedUserInformation> = {
  fromFirestore: (data: QueryDocumentSnapshot<IPrivilegedUserInformation>): PrivilegedUserInformation => {
    return PrivilegedUserInformation.factory(data.data());
  },
  toFirestore: (modelObject: PrivilegedUserInformation): DocumentData => modelObject.toObject(),
};

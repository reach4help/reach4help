/* eslint no-underscore-dangle: 0 */
import { IsObject, IsString } from 'class-validator';

export interface IUserAddress {
  name: string;
  address1?: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  coords: firebase.firestore.GeoPoint;
}

export interface IPrivilegedUserInformation
  extends firebase.firestore.DocumentData {
  addresses: Record<string, IUserAddress>;
  sendNotifications?: firebase.firestore.Timestamp | null;
  termsAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
  privacyAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  privacyVersion: string;
}

export class PrivilegedUserInformation implements IPrivilegedUserInformation {
  constructor(
    addresses: Record<string, IUserAddress>,
    privacyAccepted: firebase.firestore.Timestamp,
    privacyVersion: string,
    termsAccepted: firebase.firestore.Timestamp,
    termsVersion: string,
    sendNotificatoins: firebase.firestore.Timestamp | null = null,
  ) {
    this._addresses = addresses;
    this._sendNotifications = sendNotificatoins;
    this._privacyAccepted = privacyAccepted;
    this._privacyVersion = privacyVersion;
    this._termsAccepted = termsAccepted;
    this._termsVersion = termsVersion;
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
  private _sendNotifications: firebase.firestore.Timestamp | null;

  get sendNotifications(): firebase.firestore.Timestamp | null {
    return this._sendNotifications;
  }

  set sendNotifications(value: firebase.firestore.Timestamp | null) {
    this._sendNotifications = value;
  }

  @IsObject()
  private _privacyAccepted: firebase.firestore.Timestamp;

  get privacyAccepted(): firebase.firestore.Timestamp {
    return this._privacyAccepted;
  }

  set privacyAccepted(value: firebase.firestore.Timestamp) {
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
  private _termsAccepted: firebase.firestore.Timestamp;

  get termsAccepted(): firebase.firestore.Timestamp {
    return this._termsAccepted;
  }

  set termsAccepted(value: firebase.firestore.Timestamp) {
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

  static factory = (
    data: IPrivilegedUserInformation,
  ): PrivilegedUserInformation =>
    new PrivilegedUserInformation(
      data.addresses && !((data.addresses as unknown) as IUserAddress).coords
        ? data.addresses
        : data.address
        ? { default: data.address as IUserAddress }
        : {},
      data.privacyAccepted,
      data.privacyVersion,
      data.termsAccepted,
      data.termsVersion,
      data.sendNotifications,
    );

  toObject(): object {
    return {
      addresses: Object.values(this.addresses).reduce(
        (accum, address) => ({
          ...accum,
          [address.name]: Object.keys(address).reduce(
            (acc, key) =>
              address[key] ? { ...acc, [key]: address[key] } : acc,
            {},
          ),
        }),
        {},
      ),
      sendNotifications: this.sendNotifications,
      privacyAccepted: this.privacyAccepted,
      privacyVersion: this.privacyVersion,
      termsAccepted: this.termsAccepted,
      termsVersion: this.termsVersion,
    };
  }
}

export const PrivilegedUserInformationFirestoreConverter: firebase.firestore.FirestoreDataConverter<PrivilegedUserInformation> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >,
  ): PrivilegedUserInformation =>
    PrivilegedUserInformation.factory(data.data() as any),
  toFirestore: (
    modelObject: PrivilegedUserInformation,
  ): firebase.firestore.DocumentData => modelObject.toObject(),
};

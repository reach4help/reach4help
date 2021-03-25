/* eslint no-underscore-dangle: 0 */
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

export interface IPrivilegedUserInformation extends firebase.firestore.DocumentData {
  addresses: Record<string, IUserAddress>;
  termsAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
  privacyAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  privacyVersion: string;
}

export class PrivilegedUserInformation implements IPrivilegedUserInformation {
  addresses: Record<string, IUserAddress>;

  privacyAccepted: firebase.firestore.Timestamp;

  privacyVersion: string;

  termsAccepted: firebase.firestore.Timestamp;

  termsVersion: string;

  constructor(
    addresses: Record<string, IUserAddress>,
    privacyAccepted: firebase.firestore.Timestamp,
    privacyVersion: string,
    termsAccepted: firebase.firestore.Timestamp,
    termsVersion: string,
  ) {
    this.addresses = addresses;
    this.privacyAccepted = privacyAccepted;
    this.privacyVersion = privacyVersion;
    this.termsAccepted = termsAccepted;
    this.termsVersion = termsVersion;
  }

  static factory = (data: IPrivilegedUserInformation): PrivilegedUserInformation =>
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
    );

  toObject(): object {
    return {
      addresses: this.addresses,
      privacyAccepted: this.privacyAccepted,
      privacyVersion: this.privacyVersion,
      termsAccepted: this.termsAccepted,
      termsVersion: this.termsVersion,
    };
  }
}

export const PrivilegedUserInformationFirestoreConverter: firebase.firestore.FirestoreDataConverter<PrivilegedUserInformation> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>): PrivilegedUserInformation =>
    PrivilegedUserInformation.factory(data.data() as any),
  toFirestore: (modelObject: PrivilegedUserInformation): firebase.firestore.DocumentData => modelObject.toObject(),
};

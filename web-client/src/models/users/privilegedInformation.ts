import { MakePartial } from '../util';

export interface IUserAddress {
  address1?: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  coords: firebase.firestore.GeoPoint;
}

export interface PrivilegedUserInformation {
  addressFromGoogle: google.maps.GeocoderResult;
  address: IUserAddress;
  sendNotifications: boolean;
  termsAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
  privacyAccepted: firebase.firestore.Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  privacyVersion: string;
}

/**
 * Initialize with default values
 */
export const initPrivilegedUserInformation = (
  info: MakePartial<PrivilegedUserInformation, 'sendNotifications'>,
): PrivilegedUserInformation => ({
  sendNotifications: false,
  ...info,
});

export const PrivilegedUserInformationFirestoreConverter: firebase.firestore.FirestoreDataConverter<PrivilegedUserInformation> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<PrivilegedUserInformation>,
  ) => data.data(),
  toFirestore: modelObject => modelObject,
};

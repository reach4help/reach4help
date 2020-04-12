import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;
import DocumentData = firestore.DocumentData;

export interface PrivilegedUserInformation extends DocumentData {
  address: google.maps.GeocoderResult;

  termsAccepted: Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;
}

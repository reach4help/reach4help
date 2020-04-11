import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

export interface PrivilegedRequestInformation extends DocumentData {
  address: google.maps.GeocoderResult;
}

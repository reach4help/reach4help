import { firestore } from 'firebase';
import DocumentData = firestore.DocumentData;

export interface PrivilegedRequestInformation extends DocumentData {
  address: google.maps.GeocoderResult;
}

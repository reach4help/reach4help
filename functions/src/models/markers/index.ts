import { Location as BaseLocation, MarkerInfo as BaseMarkerInfo, MARKER_COLLECTION_ID } from '../../shared/model/markers';
import { firestore } from 'firebase-admin';

export type Location = BaseLocation<firebase.firestore.GeoPoint>;
export type MarkerInfo = BaseMarkerInfo<firebase.firestore.GeoPoint>;

export { MARKER_COLLECTION_ID };

export interface MarkerSnapshot {
  data: MarkerInfo;
  timestamp: firestore.Timestamp;
  /**
   * If set, this references the user that made the update
   */
  uid?: string;
}

export const MARKER_SNAPSHOT_COLLECTION_ID = 'snapshot';

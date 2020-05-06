import {
  MarkerInfo as BaseMarkerInfo,
  Location as BaseLocation,
  MARKER_COLLECTION_ID,
} from '../../shared/model/markers';

export type Location = BaseLocation<firebase.firestore.GeoPoint>;
export type MarkerInfo = BaseMarkerInfo<firebase.firestore.GeoPoint>;

export { MARKER_COLLECTION_ID };

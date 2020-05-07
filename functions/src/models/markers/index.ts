import {
  Location as BaseLocation,
  MarkerInfo as BaseMarkerInfo,
  MarkerInfoWithId as BaseMarkerInfoWithId,
  MARKER_COLLECTION_ID,
  MARKERS_STORAGE_PATH,
} from '../../shared/model/markers';

export type Location = BaseLocation<firebase.firestore.GeoPoint>;
export type MarkerInfo = BaseMarkerInfo<firebase.firestore.GeoPoint>;
export type MarkerInfoWithId = BaseMarkerInfoWithId<firebase.firestore.GeoPoint>;

export { MARKER_COLLECTION_ID, MARKERS_STORAGE_PATH };

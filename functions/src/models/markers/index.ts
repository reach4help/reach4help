import {
  Location as BaseLocation,
  MarkerInfo as BaseMarkerInfo,
  MarkerInfoWithId as BaseMarkerInfoWithId,
  ContactDetails,
  ContactGroup,
  MARKER_COLLECTION_ID,
  MARKERS_STORAGE_PATH,
} from '../../shared/model/markers';

export type Location = BaseLocation<firebase.firestore.GeoPoint>;
export type MarkerInfo = BaseMarkerInfo<firebase.firestore.GeoPoint>;
/**
 * Marker info to be converted to JSON
 */
export type SerializableMarkerInfo = BaseMarkerInfoWithId<{
  latitude: number;
  longitude: number;
}>;

export { MARKER_COLLECTION_ID, MARKERS_STORAGE_PATH, ContactDetails, ContactGroup };

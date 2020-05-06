import { Location as BaseLocation, MarkerInfo as BaseMarkerInfo, MARKER_COLLECTION_ID } from '../../shared/model/markers';

export type Location = BaseLocation<firebase.firestore.GeoPoint>;
export type MarkerInfo = BaseMarkerInfo<firebase.firestore.GeoPoint>;

export { MARKER_COLLECTION_ID };

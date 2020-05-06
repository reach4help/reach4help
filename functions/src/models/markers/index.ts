import {
  MarkerInfo as BaseMarkerInfo,
  Location as BaseLocation,
} from '../../shared/model/markers';

export type Location = BaseLocation<firebase.firestore.GeoPoint>;
export type MarkerInfo = BaseMarkerInfo<firebase.firestore.GeoPoint>;

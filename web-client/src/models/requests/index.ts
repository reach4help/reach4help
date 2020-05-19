import { firestore } from 'firebase';

import { User } from '../users';
import { MakePartial } from '../util';

export enum RequestStatus {
  pending = 'pending',
  ongoing = 'ongoing',
  completed = 'completed',
  cancelled = 'cancelled',
  removed = 'removed',
}

export interface Request {
  cavUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  cavUserSnapshot: User | null;
  pinUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  pinUserSnapshot: User;
  title: string;
  description: string;
  latLng: firebase.firestore.GeoPoint;
  status: RequestStatus;
  pinRating: number | null;
  cavRating: number | null;
  pinRatedAt: firebase.firestore.Timestamp | null;
  cavRatedAt: firebase.firestore.Timestamp | null;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

type RequestPropertiesWithDefaults =
  | 'cavUserRef'
  | 'cavUserSnapshot'
  | 'status'
  | 'pinRating'
  | 'cavRating'
  | 'pinRatedAt'
  | 'cavRatedAt'
  | 'createdAt'
  | 'updatedAt';

/**
 * Initialize Request with default values
 */
export const initRequest = (
  request: MakePartial<Request, RequestPropertiesWithDefaults>,
): Request => ({
  cavUserRef: null,
  cavUserSnapshot: null,
  status: RequestStatus.pending,
  createdAt: firestore.Timestamp.now(),
  updatedAt: firestore.Timestamp.now(),
  pinRating: null,
  cavRating: null,
  pinRatedAt: null,
  cavRatedAt: null,
  ...request,
});

export const RequestFirestoreConverter: firebase.firestore.FirestoreDataConverter<Request> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<Request>) =>
    data.data(),
  toFirestore: (modelObject: Request) => modelObject,
};

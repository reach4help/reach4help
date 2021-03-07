import { IUser } from '../users';
import { PostStatus } from './PostStatus';

export interface IPost extends firebase.firestore.DocumentData {
  isResponse: boolean;
  isRequest: boolean;
  parentSnapshot: IPost | null;
  parentRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  creatorRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  creatorSnapshot: IUser;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  status: PostStatus;
  creatorGivenRating: number | null;
  parentCreatorGivenRating: number | null;
  creatorRatedAt: firebase.firestore.Timestamp | null;
  parentCreatorRatedAt: firebase.firestore.Timestamp | null;
  updateSeenBy: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >[];
  positiveResponseCount: number;
  negativeResponseCount: number;
  firstResponseMade: firebase.firestore.Timestamp | null;
  firstRejectionMade: firebase.firestore.Timestamp | null;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

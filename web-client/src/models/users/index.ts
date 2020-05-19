import { firestore } from 'firebase';

import { MakePartial } from '../util';

export enum ApplicationPreference {
  pin = 'pin',
  cav = 'cav',
}

export interface User {
  username: string;
  applicationPreference: ApplicationPreference | null;
  cavQuestionnaireRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  pinQuestionnaireRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  > | null;
  averageRating: number | null;
  casesCompleted: number;
  requestsMade: number;
  pinRatingsReceived: number;
  cavRatingsReceived: number;
  displayName: string | null;
  displayPicture: string | null;
  createdAt: firebase.firestore.Timestamp;
}

type UserPropertiesWithDefaults =
  | 'applicationPreference'
  | 'pinQuestionnaireRef'
  | 'cavQuestionnaireRef'
  | 'casesCompleted'
  | 'requestsMade'
  | 'pinRatingsReceived'
  | 'cavRatingsReceived'
  | 'averageRating'
  | 'displayName'
  | 'displayPicture'
  | 'createdAt';

/**
 * Initialize Request with default values
 */
export const initUser = (
  user: MakePartial<User, UserPropertiesWithDefaults>,
): User => ({
  applicationPreference: null,
  pinQuestionnaireRef: null,
  cavQuestionnaireRef: null,
  casesCompleted: 0,
  requestsMade: 0,
  pinRatingsReceived: 0,
  cavRatingsReceived: 0,
  averageRating: 1,
  displayName: null,
  displayPicture: null,
  createdAt: firestore.Timestamp.now(),
  ...user,
});

export const UserFirestoreConverter: firebase.firestore.FirestoreDataConverter<User> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<User>) =>
    data.data(),
  toFirestore: modelObject => modelObject,
};

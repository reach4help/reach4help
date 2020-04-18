import { firestore } from 'src/firebase';

import { IgetUserProfile } from './types';

export const getUserProfile = (payload: IgetUserProfile) =>
  firestore
    .collection('users')
    .doc(payload.uid)
    .get();

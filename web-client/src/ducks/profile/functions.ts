import { firestore as Firestore } from 'firebase';
import { firestore } from 'src/firebase';

import { IgetUserProfile } from './types';

export const getUserProfile = (
  payload: IgetUserProfile,
): Promise<[Firestore.DocumentSnapshot, Firestore.DocumentSnapshot]> =>
  Promise.all([
    firestore
      .collection('users')
      .doc(payload.uid)
      .get(),
    firestore
      .collection('users')
      .doc(payload.uid)
      .collection('privilegedInformation')
      .doc(payload.uid)
      .get(),
  ]);

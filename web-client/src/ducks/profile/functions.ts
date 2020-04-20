import { firestore as Firestore } from 'firebase';
import { firestore } from 'src/firebase';
import { User, UserFirestoreConverter } from 'src/models/users';
import {
  PrivilegedUserInformation,
  PrivilegedUserInformationFirestoreConverter,
} from 'src/models/users/privilegedInformation';

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

export const setUserProfile = async ({
  uid,
  userPayload,
  privilegedPayload,
}: {
  uid: string;
  userPayload: User;
  privilegedPayload: PrivilegedUserInformation;
}) => {
  await firestore
    .collection('users')
    .doc(uid)
    .withConverter(UserFirestoreConverter)
    .set(userPayload);
  return firestore
    .collection('users')
    .doc(uid)
    .collection('privilegedInformation')
    .doc(uid)
    .withConverter(PrivilegedUserInformationFirestoreConverter)
    .set(privilegedPayload);
};

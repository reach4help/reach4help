import { firestore as Firestore } from 'firebase';
import { firestore, functions, storage } from 'src/firebase';
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
      .withConverter(UserFirestoreConverter)
      .get(),
    firestore
      .collection('users')
      .doc(payload.uid)
      .collection('privilegedInformation')
      .doc(payload.uid)
      .withConverter(PrivilegedUserInformationFirestoreConverter)
      .get(),
  ]);

export const observePrivileged = (
  nextValue: Function,
  payload: IgetUserProfile,
): firebase.Unsubscribe =>
  firestore
    .collection('users')
    .doc(payload.uid)
    .collection('privilegedInformation')
    .doc(payload.uid)
    .withConverter(PrivilegedUserInformationFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));

export const observeProfile = (
  nextValue: Function,
  payload: IgetUserProfile,
): firebase.Unsubscribe =>
  firestore
    .collection('users')
    .doc(payload.uid)
    .withConverter(UserFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));

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

export const updateUserProfileData = async ({
  uid,
  userPayload,
}: {
  uid: string;
  userPayload: User;
}) =>
  firestore
    .collection('users')
    .doc(uid)
    .withConverter(UserFirestoreConverter)
    .set(userPayload);

export const updateUserPrivilegedInformationData = async ({
  uid,
  dataPayload,
}: {
  uid: string;
  dataPayload: PrivilegedUserInformation;
}) =>
  firestore
    .collection('users')
    .doc(uid)
    .collection('privilegedInformation')
    .doc(uid)
    .withConverter(PrivilegedUserInformationFirestoreConverter)
    .set(dataPayload);

export const deleteUserData = async () =>
  functions.httpsCallable('https-api-users-deleteUserData')();

export const uploadUserAvatarData = async ({
  userRef,
  userPayload,
  filePayload,
}: {
  userRef: Firestore.DocumentReference<User>;
  userPayload: User;
  filePayload: File;
}) => {
  const storageRef = storage.ref();
  const date = Date.now();
  const fileExt = filePayload.type.split('/')[1];
  const snapshot = await storageRef
    .child(`/${userRef.id}/displayPicture/${date}.${fileExt}`)
    .put(filePayload, { contentType: 'image/*' });
  const newUserPayload = userPayload;
  newUserPayload.displayPicture = snapshot.downloadURL;
  const newUserWithAvatar = User.factory(newUserPayload);
  return userRef.set(newUserWithAvatar);
};

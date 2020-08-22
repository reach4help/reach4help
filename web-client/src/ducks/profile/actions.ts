import firebase from 'src/firebase';
import { User } from 'src/models/users';
import {
  IUserAddress,
  PrivilegedUserInformation,
} from 'src/models/users/privilegedInformation';

import {
  deleteUserAvatarData,
  deleteUserData as deleteUserDataFunc,
  getUserProfile as getUserProfileFunc,
  observePrivileged as observePrivilegedFunc,
  observeProfile as observeProfileFunc,
  setUserProfile as setUserProfileFunc,
  updateUserPrivilegedInformationData,
  updateUserProfileData,
  uploadUserAvatarData,
} from './functions';
import {
  DELETE_AVATAR,
  DELETE_ME,
  GET,
  IgetUserProfile,
  OBSERVE_PRIVILEGED,
  OBSERVE_PROFILE,
  SET,
  UPDATE,
  UPDATE_PRIVILEGED,
  UPLOAD_AVATAR,
} from './types';

export const getUserProfile = (payload: IgetUserProfile) => (
  dispatch: Function,
): void => {
  dispatch({
    type: GET,
    payload,
    firebase: getUserProfileFunc,
  });
};

export const observeProfile = (
  dispatch: Function,
  payload: IgetUserProfile,
): Function => {
  dispatch({
    type: OBSERVE_PROFILE,
    observer: observeProfileFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_PROFILE.UNSUBSCRIBE,
      observerName: OBSERVE_PROFILE,
    });
};

export const observePrivileged = (
  dispatch: Function,
  payload: IgetUserProfile,
): Function => {
  dispatch({
    type: OBSERVE_PRIVILEGED,
    observer: observePrivilegedFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_PRIVILEGED.UNSUBSCRIBE,
      observerName: OBSERVE_PRIVILEGED,
    });
};

export const setUserProfile = (
  addresses: Record<string, IUserAddress>,
  termsAndPrivacyAccepted: Date,
  displayName: string,
  uid: string,
  sendNotifications: firebase.firestore.Timestamp | null,
  displayPic?: string | null,
) => (dispatch: Function) => {
  const privilegedPayload = PrivilegedUserInformation.factory({
    addresses,
    // eslint-disable-next-line import/no-named-as-default-member
    termsAccepted: firebase.firestore.Timestamp.fromDate(
      termsAndPrivacyAccepted,
    ),
    termsVersion: '1.0',
    // eslint-disable-next-line import/no-named-as-default-member
    privacyAccepted: firebase.firestore.Timestamp.fromDate(
      termsAndPrivacyAccepted,
    ),
    privacyVersion: '1.0',
    sendNotifications,
  });
  const userPayload = User.factory({
    username: displayName,
    displayName,
    displayPicture: displayPic,
  });
  dispatch({
    type: SET,
    payload: {
      uid,
      privilegedPayload,
      userPayload,
    },
    firebase: setUserProfileFunc,
  });
};

export const updateUserProfile = (uid: string, user: User) => (
  dispatch: Function,
) =>
  dispatch({
    type: UPDATE,
    payload: {
      uid,
      userPayload: user,
    },
    firebase: updateUserProfileData,
  });

export const updateUserPrivilegedInformation = (
  uid: string,
  data: PrivilegedUserInformation,
) => (dispatch: Function) =>
  dispatch({
    type: UPDATE_PRIVILEGED,
    payload: {
      uid,
      dataPayload: data,
    },
    firebase: updateUserPrivilegedInformationData,
  });

export const deleteUserData = () => (dispatch: Function) =>
  dispatch({
    type: DELETE_ME,
    payload: {},
    firebase: deleteUserDataFunc,
  });

export const uploadUserAvatar = (
  userRef: firebase.firestore.DocumentReference<User>,
  user: User,
  file: File,
) => (dispatch: Function) =>
  dispatch({
    type: UPLOAD_AVATAR,
    payload: {
      userRef,
      userPayload: user,
      filePayload: file,
    },
    firebase: uploadUserAvatarData,
  });

export const deleteUserAvatar = (
  userRef: firebase.firestore.DocumentReference<User>,
  user: User,
) => (dispatch: Function) =>
  dispatch({
    type: DELETE_AVATAR,
    payload: {
      userRef,
      userPayload: user,
    },
    firebase: deleteUserAvatarData,
  });

import firebase from 'src/firebase';
import { User } from 'src/models/users';
import {
  IUserAddress,
  PrivilegedUserInformation,
} from 'src/models/users/privilegedInformation';

import {
  getUserProfile as getUserProfileFunc,
  observePrivileged as observePrivilegedFunc,
  observeProfile as observeProfileFunc,
  setUserProfile as setUserProfileFunc,
} from './functions';
import {
  GET,
  IgetUserProfile,
  OBSERVE_PRIVILEGED,
  OBSERVE_PROFILE,
  SET,
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

export const observeProfile = (dispatch: Function): Function => {
  dispatch({
    type: OBSERVE_PROFILE,
    observer: observeProfileFunc,
  });

  return () =>
    dispatch({
      type: OBSERVE_PROFILE.UNSUBSCRIBE,
      observerName: OBSERVE_PROFILE,
    });
};

export const observePrivileged = (dispatch: Function): Function => {
  dispatch({
    type: OBSERVE_PRIVILEGED,
    observer: observePrivilegedFunc,
  });

  return () =>
    dispatch({
      type: OBSERVE_PRIVILEGED.UNSUBSCRIBE,
      observerName: OBSERVE_PRIVILEGED,
    });
};

export const setUserProfile = (
  address: IUserAddress,
  addressFromGoogle: google.maps.GeocoderResult,
  termsAndPrivacyAccepted: Date,
  displayName: string,
  uid: string,
  displayPic?: string | null,
) => (dispatch: Function) => {
  const privilegedPayload = PrivilegedUserInformation.factory({
    addressFromGoogle,
    address,
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

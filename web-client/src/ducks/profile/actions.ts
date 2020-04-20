import firebase from 'src/firebase';
import { User } from 'src/models/users';
import {
  IUserAddress,
  PrivilegedUserInformation,
} from 'src/models/users/privilegedInformation';

import {
  getUserProfile as getUserProfileFunc,
  setUserProfile as setUserProfileFunc,
} from './functions';
import { GET, IgetUserProfile, SET } from './types';

export const getUserProfile = (payload: IgetUserProfile) => (
  dispatch: Function,
): void => {
  dispatch({
    type: GET,
    payload,
    firebase: getUserProfileFunc,
  });
};

export const setUserProfile = (
  address: IUserAddress,
  addressFromGoogle: google.maps.GeocoderResult,
  termsAndPrivacyAccepted: Date,
  displayName: string,
  displayPic: string,
  uid: string,
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

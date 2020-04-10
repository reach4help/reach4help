import { AxiosRequestConfig } from 'axios';
import { IOTPAuth, IPhoneNumberAuth } from 'src/ducks/auth/phone/types';
import firebase, { firebaseAuth } from 'src/firebase';

import { IHTTPRequest } from '../HTTPRequest';

export const login = (request: IHTTPRequest) => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/login',
  };
  return request.execute(config).then((response: any) => response.data);
};

export const facebookLoginWithFirebasePopUp = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebaseAuth.signInWithPopup(provider);
};

export const loginWithFirebaseRedirect = (): void => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebaseAuth.signInWithRedirect(provider);
};
export const getRedirectResult = (): Promise<firebase.auth.UserCredential> =>
  firebaseAuth.getRedirectResult();

export const observeUser = (nextValue: Function): firebase.Unsubscribe =>
  firebaseAuth.onAuthStateChanged((user: firebase.User | null) => {
    nextValue(user);
  });

export const phoneAuthTrigger = (
  payload: IPhoneNumberAuth,
): Promise<firebase.auth.ConfirmationResult> => {
  if (payload.currentUser) {
    return payload.currentUser.linkWithPhoneNumber(
      payload.phoneNumber,
      payload.recaptchaVerifier,
    );
  }
  return firebaseAuth.signInWithPhoneNumber(
    payload.phoneNumber,
    payload.recaptchaVerifier,
  );
};

export const phoneAuthVerify = (
  payload: IOTPAuth,
  confirmationResult: firebase.auth.ConfirmationResult,
): Promise<firebase.auth.UserCredential> =>
  confirmationResult.confirm(payload.otp);

export interface LoginResponse {
  userId: string;
  accessToken: string;
}

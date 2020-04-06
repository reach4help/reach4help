import firebase from 'src/firebase';
import {
  completeLoginWithFirebaseRedirect,
  facebookLoginWithFirebasePopUp,
  facebookLoginWithFirebaseRedirect,
  login,
} from 'src/http/resources/auth';

import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE,
  FIREBASE_FACEBOOK_LOGIN_REDIRECT_START,
  LOGIN,
  LoginAction,
  /*
    THESE ARE SOME MORE EXAMPLES
    FIREBASE_PHONE_LOGIN_START, PhoneLoginStartWithFirebaseAction,
    FIREBASE_PHONE_LOGIN_VERIFY, PhoneLoginVerifyWithFirebaseAction 
  */
} from './types';

export const loginAction = (payload: LoginAction) => (dispatch: Function) => {
  dispatch({
    type: LOGIN,
    payload,
    api: login,
  });
};

export const loginWithFirebaseActionRedirect = () => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_FACEBOOK_LOGIN_REDIRECT_START,
    payload: {},
    firebase: facebookLoginWithFirebaseRedirect,
  });
};

export const completeLoginWithFirebaseActionRedirect = (
  payload: firebase.auth.UserCredential | { user: firebase.User },
) => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE,
    payload,
    firebase: completeLoginWithFirebaseRedirect,
  });
};

export const loginWithFirebaseActionPopUp = () => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_FACEBOOK_LOGIN_POPUP,
    payload: {},
    firebase: facebookLoginWithFirebasePopUp,
    fallback: loginWithFirebaseActionRedirect,
  });
};

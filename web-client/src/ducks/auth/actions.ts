import {
  facebookLoginWithFirebasePopUp,
  getRedirectResult,
  login,
  loginWithFirebaseRedirect,
  observeUser,
  phoneAuthTrigger,
  phoneAuthVerify,
} from 'src/http/resources/auth';

import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  FIREBASE_PHONE_TRIGGER,
  FIREBASE_PHONE_VERIFY,
  GET_LOGIN_REDIRECT_RESULT,
  IOTPAuth,
  IPhoneNumberAuth,
  LOGIN,
  LoginAction,
  OBSERVE_USER,
  TRIGGER_LOGIN_WITH_REDIRECT,
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

export const triggerLoginWithRedirect = () => (dispatch: Function) => {
  dispatch({
    type: TRIGGER_LOGIN_WITH_REDIRECT,
    firebase: loginWithFirebaseRedirect,
  });
};

export const getLoginRedirectResult = () => (dispatch: Function) => {
  dispatch({
    type: GET_LOGIN_REDIRECT_RESULT,
    firebase: getRedirectResult,
  });
};

export const observeUserAction = (dispatch: Function): Function => {
  dispatch({
    type: OBSERVE_USER,
    observer: observeUser,
  });

  return () =>
    dispatch({
      type: OBSERVE_USER.UNSUBSCRIBE,
      observerName: OBSERVE_USER,
    });
};

export const loginWithFirebaseActionPopUp = () => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_FACEBOOK_LOGIN_POPUP,
    payload: {},
    firebase: facebookLoginWithFirebasePopUp,
    fallback: triggerLoginWithRedirect,
  });
};

export const triggerLoginWithPhone = (payload: IPhoneNumberAuth) => (
  dispatch: Function,
) => {
  dispatch({
    type: FIREBASE_PHONE_TRIGGER,
    payload,
    firebase: phoneAuthTrigger,
  });
};

export const verifyOTPPhone = (payload: IOTPAuth) => (
  dispatch: Function,
  getState: Function,
) => {
  dispatch({
    type: FIREBASE_PHONE_VERIFY,
    payload,
    firebase: (_payload: IOTPAuth) =>
      phoneAuthVerify(_payload, getState().auth.confirmationResult),
  });
};

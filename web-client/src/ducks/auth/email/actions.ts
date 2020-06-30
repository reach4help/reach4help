import {
  emailLoginWithFirebasePopUp,
  getRedirectResult,
  loginWithFirebaseRedirect,
} from './functions';
import {
  FIREBASE_EMAIL_LOGIN_POPUP,
  GET_LOGIN_REDIRECT_RESULT,
  TRIGGER_LOGIN_WITH_REDIRECT,
} from './types';

export const triggerEmailLoginWithRedirect = () => (dispatch: Function) => {
  dispatch({
    type: TRIGGER_LOGIN_WITH_REDIRECT,
    firebase: loginWithFirebaseRedirect,
  });
};

export const loginWithEmailFirebaseActionPopUp = () => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_EMAIL_LOGIN_POPUP,
    payload: {},
    firebase: emailLoginWithFirebasePopUp,
    fallback: triggerEmailLoginWithRedirect,
  });
};

export const getEmailLoginRedirectResult = () => (dispatch: Function) => {
  dispatch({
    type: GET_LOGIN_REDIRECT_RESULT,
    firebase: getRedirectResult,
  });
};

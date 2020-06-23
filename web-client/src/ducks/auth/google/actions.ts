import {
  getRedirectResult,
  googleLoginWithFirebasePopUp,
  loginWithFirebaseRedirect,
} from './functions';
import {
  FIREBASE_GOOGLE_LOGIN_POPUP,
  GET_LOGIN_REDIRECT_RESULT,
  TRIGGER_LOGIN_WITH_REDIRECT,
} from './types';

export const triggerGoogleLoginWithRedirect = () => (dispatch: Function) => {
  dispatch({
    type: TRIGGER_LOGIN_WITH_REDIRECT,
    firebase: loginWithFirebaseRedirect,
  });
};

export const loginWithGoogleFirebaseActionPopUp = () => (
  dispatch: Function,
) => {
  dispatch({
    type: FIREBASE_GOOGLE_LOGIN_POPUP,
    payload: {},
    firebase: googleLoginWithFirebasePopUp,
    fallback: triggerGoogleLoginWithRedirect,
  });
};

export const getGoogleLoginRedirectResult = () => (dispatch: Function) => {
  dispatch({
    type: GET_LOGIN_REDIRECT_RESULT,
    firebase: getRedirectResult,
  });
};

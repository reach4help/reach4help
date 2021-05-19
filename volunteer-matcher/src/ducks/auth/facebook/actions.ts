import {
  facebookLoginWithFirebasePopUp,
  getRedirectResult,
  loginWithFirebaseRedirect,
} from './functions';
import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  GET_LOGIN_REDIRECT_RESULT,
  TRIGGER_LOGIN_WITH_REDIRECT,
} from './types';

export const triggerFBLoginWithRedirect = () => (dispatch: Function) => {
  dispatch({
    type: TRIGGER_LOGIN_WITH_REDIRECT,
    firebase: loginWithFirebaseRedirect,
  });
};

export const LoginWithFBFirebaseActionPopUp = () => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_FACEBOOK_LOGIN_POPUP,
    payload: {},
    firebase: facebookLoginWithFirebasePopUp,
    fallback: triggerFBLoginWithRedirect,
  });
};

export const getFBLoginRedirectResult = () => (dispatch: Function) => {
  dispatch({
    type: GET_LOGIN_REDIRECT_RESULT,
    firebase: getRedirectResult,
  });
};

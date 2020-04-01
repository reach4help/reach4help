import { facebookLoginWithFirebase, login } from 'src/http/resources/auth';

import {
  FIREBASE_FACEBOOK_LOGIN,
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

export const loginWithFirebaseAction = () => (dispatch: Function) => {
  dispatch({
    type: FIREBASE_FACEBOOK_LOGIN,
    payload: {},
    firebase: facebookLoginWithFirebase,
  });
};

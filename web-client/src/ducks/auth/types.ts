import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType } = createActionTypeFactory('AUTH');
const { asyncType: firebaseAsyncType, observerType } = createActionTypeFactory(
  'FIREBASE',
);

export const LOGIN = asyncType('LOGIN');

export const FIREBASE_FACEBOOK_LOGIN_POPUP = firebaseAsyncType(
  'FACEBOOK_POPUP',
);
export const FIREBASE_LOGIN_REDIRECT = firebaseAsyncType('LOGIN_REDIRECT');

export const OBSERVE_USER = observerType('OBSERVE_USER');

export const TRIGGER_LOGIN_WITH_REDIRECT = firebaseAsyncType(
  'TRIGGER_LOGIN_WITH_REDIRECT',
);
export const GET_LOGIN_REDIRECT_RESULT = firebaseAsyncType(
  'GET_LOGIN_REDIRECT_RESULT',
);

export const FIREBASE_PHONE_LOGIN_START = firebaseAsyncType('PHONE_START');
export const FIREBASE_PHONE_LOGIN_VERIFY = firebaseAsyncType('PHONE_VERIFY');
export interface LoginAction {
  facebookAuthToken: string;
  userId: string;
}

export interface PhoneLoginStartWithFirebaseAction {
  phone: string;
}

export interface PhoneLoginVerifyWithFirebaseAction {
  phone: string;
  otp: string;
}

export const FIREBASE_PHONE_TRIGGER = firebaseAsyncType('PHONE_TRIGGER');

export const FIREBASE_PHONE_VERIFY = firebaseAsyncType('PHONE_VERIFY');

export interface IPhoneNumberAuth {
  phoneNumber: string;
  currentUser?: firebase.User;
  // eslint-disable-next-line @typescript-eslint/camelcase
  recaptchaVerifier: firebase.auth.RecaptchaVerifier_Instance;
}

export interface IOTPAuth {
  otp: string;
}

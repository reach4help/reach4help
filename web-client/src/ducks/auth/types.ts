import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType } = createActionTypeFactory('AUTH');
const { asyncType: firebaseAsyncType, observerType } = createActionTypeFactory(
  'FIREBASE',
);

export const LOGIN = asyncType('LOGIN');

export const FIREBASE_FACEBOOK_LOGIN_POPUP = firebaseAsyncType(
  'FACEBOOK_POPUP',
);
export const FIREBASE_FACEBOOK_LOGIN_REDIRECT_START = firebaseAsyncType(
  'FACEBOOK_REDIRECT_START',
);
export const FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE = firebaseAsyncType(
  'FACEBOOK_REDIRECT_COMPLETE',
);

export const OBSERVE_USER = observerType('OBSERVE_USER');

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

import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType } = createActionTypeFactory('AUTH');
const { asyncType: firebaseAsyncType } = createActionTypeFactory('FIREBASE');

export const LOGIN = asyncType('LOGIN');

export const FIREBASE_FACEBOOK_LOGIN = firebaseAsyncType('FACEBOOK');
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

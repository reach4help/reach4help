import { asyncType, syncType } from '../types';

export const FIREBASE_PHONE_TRIGGER = asyncType('PHONE_TRIGGER');

export const FIREBASE_PHONE_VERIFY = asyncType('PHONE_VERIFY');

export const RESET_CONFIRMATION_CODE = syncType('RESET_CONFIRMATION_CODE');
export interface IPhoneNumberAuth {
  phoneNumber: string;
  currentUser?: firebase.User;
  // eslint-disable-next-line @typescript-eslint/camelcase
  recaptchaVerifier: firebase.auth.RecaptchaVerifier_Instance;
}

export interface IOTPAuth {
  otp: string;
}

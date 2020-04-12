import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType } = createActionTypeFactory('AUTH');
export const { observerType } = createActionTypeFactory('FIREBASE');

export const LOGIN = asyncType('LOGIN');

export const OBSERVE_USER = observerType('OBSERVE_USER');

export interface AuthState {
  user?: firebase.User | null;
  loading: boolean;
  observerReceivedFirstUpdate: boolean;
  error?: Error;
  confirmationResult?: firebase.auth.ConfirmationResult;
}

export interface IPhoneNumberAuth {
  phoneNumber: string;
  currentUser?: firebase.User;
  // eslint-disable-next-line @typescript-eslint/camelcase
  recaptchaVerifier: firebase.auth.RecaptchaVerifier_Instance;
}

export interface IOTPAuth {
  otp: string;
}

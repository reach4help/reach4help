import { phoneAuthTrigger, phoneAuthVerify } from './functions';
import {
  FIREBASE_PHONE_TRIGGER,
  FIREBASE_PHONE_VERIFY,
  IOTPAuth,
  IPhoneNumberAuth,
  RESET_CONFIRMATION_CODE,
} from './types';

export const triggerLoginWithPhone = (payload: IPhoneNumberAuth) => (
  dispatch: Function,
) => {
  dispatch({
    type: FIREBASE_PHONE_TRIGGER,
    payload,
    firebase: phoneAuthTrigger,
  });
};

export const resetResendCode = () => (dispatch: Function) => {
  dispatch({
    type: RESET_CONFIRMATION_CODE,
    payload: {},
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

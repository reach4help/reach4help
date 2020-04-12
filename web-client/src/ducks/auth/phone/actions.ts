import {
  phoneAuthTrigger,
  phoneAuthVerify,
} from 'src/http/resources/auth/phoneAuth';

import { IOTPAuth, IPhoneNumberAuth } from '../types';
import { FIREBASE_PHONE_TRIGGER, FIREBASE_PHONE_VERIFY } from './types';

export const triggerLoginWithPhone = (payload: IPhoneNumberAuth) => (
  dispatch: Function,
) => {
  dispatch({
    type: FIREBASE_PHONE_TRIGGER,
    payload,
    firebase: phoneAuthTrigger,
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

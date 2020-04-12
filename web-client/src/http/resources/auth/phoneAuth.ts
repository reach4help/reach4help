import { IOTPAuth, IPhoneNumberAuth } from 'src/ducks/auth/types';
import firebase, { firebaseAuth } from 'src/firebase';

export const phoneAuthTrigger = (
  payload: IPhoneNumberAuth,
): Promise<firebase.auth.ConfirmationResult> => {
  if (payload.currentUser) {
    return payload.currentUser.linkWithPhoneNumber(
      payload.phoneNumber,
      payload.recaptchaVerifier,
    );
  }
  return firebaseAuth.signInWithPhoneNumber(
    payload.phoneNumber,
    payload.recaptchaVerifier,
  );
};

export const phoneAuthVerify = (
  payload: IOTPAuth,
  confirmationResult: firebase.auth.ConfirmationResult,
): Promise<firebase.auth.UserCredential> =>
  confirmationResult.confirm(payload.otp);

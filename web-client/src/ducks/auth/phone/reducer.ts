import { AuthState } from '../types';
import { FIREBASE_PHONE_TRIGGER, FIREBASE_PHONE_VERIFY } from './types';

export default {
  [FIREBASE_PHONE_TRIGGER.PENDING]: (state: AuthState) => {
    state.loading = true;
  },
  [FIREBASE_PHONE_TRIGGER.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: firebase.auth.ConfirmationResult },
  ) => {
    state.confirmationResult = payload;
    state.loading = false;
    state.error = undefined;
  },
  [FIREBASE_PHONE_TRIGGER.REJECTED]: (
    state: AuthState,
    { payload }: { payload: Error },
  ) => {
    state.error = payload;
    state.confirmationResult = undefined;
    state.loading = false;
  },
  [FIREBASE_PHONE_VERIFY.PENDING]: (state: AuthState) => {
    state.loading = true;
  },
  [FIREBASE_PHONE_VERIFY.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: firebase.auth.UserCredential },
  ) => {
    state.user = payload.user;
    state.loading = false;
  },
  [FIREBASE_PHONE_VERIFY.REJECTED]: (
    state: AuthState,
    { payload }: { payload: Error },
  ) => {
    state.error = payload;
    state.confirmationResult = undefined;
    state.loading = false;
  },
};

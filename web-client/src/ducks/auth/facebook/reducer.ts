import { AuthState } from '../types';
import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  GET_LOGIN_REDIRECT_RESULT,
  TRIGGER_LOGIN_WITH_REDIRECT,
} from './types';

export default {
  [FIREBASE_FACEBOOK_LOGIN_POPUP.PENDING]: (state: AuthState) => {
    state.loading = true;
  },

  [FIREBASE_FACEBOOK_LOGIN_POPUP.REJECTED]: (
    state: AuthState,
    { payload }: { payload: Error },
  ) => {
    state.error = payload;
    state.loading = false;
  },

  [FIREBASE_FACEBOOK_LOGIN_POPUP.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: firebase.auth.UserCredential },
  ) => {
    state.user = payload.user;
    state.loading = false;
  },

  [TRIGGER_LOGIN_WITH_REDIRECT.PENDING]: (state: AuthState) => {
    window.sessionStorage.setItem(
      'redirect_started',
      `facebook_${new Date().toISOString()}`,
    );
    state.loading = true;
  },

  [GET_LOGIN_REDIRECT_RESULT.REJECTED]: (
    state: AuthState,
    { payload }: { payload: Error },
  ) => {
    window.sessionStorage.removeItem('redirect_started');
    state.error = payload;
    state.loading = false;
  },

  [GET_LOGIN_REDIRECT_RESULT.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: firebase.auth.UserCredential },
  ) => {
    state.user = payload.user;
    state.loading = false;
  },
};

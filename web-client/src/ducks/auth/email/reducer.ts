import { authProviders, AuthState } from '../types';
import { CHECK_EMAIL, SIGN_IN, SIGN_UP } from './types';

export default {
  [CHECK_EMAIL.PENDING]: (state: AuthState) => {
    state.checkEmail = {
      loading: false,
      present: false,
      method: undefined,
    };
  },

  [CHECK_EMAIL.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: string[] },
  ) => {
    if (state.checkEmail) {
      state.checkEmail.loading = true;
      state.checkEmail.error = undefined;
      if (payload && Array.isArray(payload) && payload.length > 0) {
        state.checkEmail.present = true;
        state.checkEmail.method = authProviders.email;
      }
    }
  },

  [CHECK_EMAIL.REJECTED]: (
    state: AuthState,
    { payload }: { payload: Error },
  ) => {
    if (state.checkEmail) {
      state.checkEmail.error = payload;
      state.checkEmail.loading = false;
      state.checkEmail.method = undefined;
      state.checkEmail.present = false;
    }
  },

  [SIGN_IN.PENDING]: (state: AuthState) => {
    state.loading = true;
  },

  [SIGN_IN.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: firebase.auth.UserCredential },
  ) => {
    state.user = payload.user;
    state.loading = false;
    state.error = undefined;
  },

  [SIGN_IN.REJECTED]: (state: AuthState, { payload }: { payload: Error }) => {
    state.error = payload;
    state.loading = false;
  },

  [SIGN_UP.PENDING]: (state: AuthState) => {
    state.loading = true;
  },

  [SIGN_UP.COMPLETED]: (
    state: AuthState,
    { payload }: { payload: firebase.auth.UserCredential },
  ) => {
    state.user = payload.user;
    state.loading = false;
    state.error = undefined;
  },

  [SIGN_UP.REJECTED]: (state: AuthState, { payload }: { payload: Error }) => {
    state.error = payload;
    state.loading = false;
  },
};

import createReducer from 'src/store/utils/createReducer';

import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  GET_LOGIN_REDIRECT_RESULT,
  OBSERVE_USER,
  TRIGGER_LOGIN_WITH_REDIRECT,
} from './types';

interface AuthState {
  user?: firebase.User | null;
  loading?: boolean;
  error?: Error;
}

const initialState: AuthState = {
  loading: true,
  error: undefined,
  user: undefined,
};

export default createReducer<AuthState>(
  {
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
      window.localStorage.setItem('redirect_started', new Date().toISOString());
      state.loading = true;
    },
    [GET_LOGIN_REDIRECT_RESULT.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      window.localStorage.removeItem('redirect_started');
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
    [OBSERVE_USER.SUBSCRIBE]: (state: AuthState) => {
      state.loading = true;
    },
    [OBSERVE_USER.UPDATED]: (
      state: AuthState,
      { payload }: { payload: Record<string, firebase.User | null> },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.user = payload[0];
      state.loading = false;
    },
  },
  initialState,
);

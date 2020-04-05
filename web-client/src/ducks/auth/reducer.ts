import { LoginResponse } from 'src/http/resources/auth';
import createReducer from 'src/store/utils/createReducer';

import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE,
  FIREBASE_FACEBOOK_LOGIN_REDIRECT_START,
  LOGIN,
  OBSERVE_USER,
} from './types';

interface AuthState {
  token?: string;
  user?: firebase.auth.UserCredential;
  actionInProgress?: boolean;
  error?: Error;
}

const initialState: AuthState = {
  token: undefined,
  actionInProgress: false,
  error: undefined,
  // user: undefined,
};

export default createReducer<AuthState>(
  {
    [LOGIN.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: LoginResponse },
    ) => {
      state.token = payload.accessToken;
    },
    [FIREBASE_FACEBOOK_LOGIN_POPUP.PENDING]: (state: AuthState) => {
      state.actionInProgress = true;
    },
    [FIREBASE_FACEBOOK_LOGIN_POPUP.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: string },
    ) => {
      state.token = payload;
      state.actionInProgress = false;
    },
    [FIREBASE_FACEBOOK_LOGIN_POPUP.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      state.error = payload;
      state.actionInProgress = false;
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_START.PENDING]: (state: AuthState) => {
      window.localStorage.setItem('redirect_started', new Date().toISOString());
      state.actionInProgress = true;
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_START.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      window.localStorage.removeItem('redirect_started');
      state.error = payload;
      state.actionInProgress = false;
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_START.COMPLETED]: (state: AuthState) => {
      state.actionInProgress = false;
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE.PENDING]: (state: AuthState) => {
      window.localStorage.removeItem('redirect_started');
      state.actionInProgress = true;
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: string },
    ) => {
      state.token = payload;
      state.actionInProgress = false;
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      state.error = payload;
      state.actionInProgress = false;
    },
    [OBSERVE_USER.UPDATED]: (
      state: AuthState,
      { payload }: { payload: any },
    ) => {
      // eslint-disable-next-line no-console
      console.log(payload);
    },
  },
  initialState,
);

import { LoginResponse } from 'src/http/resources/auth';
import createReducer from 'src/store/utils/createReducer';

import {
  FIREBASE_FACEBOOK_LOGIN_POPUP,
  FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE,
  FIREBASE_FACEBOOK_LOGIN_REDIRECT_START,
  LOGIN,
} from './types';

interface AuthState {
  token?: string;
  actionInProgress?: boolean;
  error?: Error;
}

const initialState: AuthState = {
  token: undefined,
  actionInProgress: false,
  error: undefined,
};

export default createReducer<AuthState>(
  {
    [LOGIN.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: LoginResponse },
    ) => {
      state.token = payload.accessToken;
    },
    [FIREBASE_FACEBOOK_LOGIN_POPUP.PENDING]: (state: AuthState) => ({
      ...state,
      actionInProgress: true,
    }),
    [FIREBASE_FACEBOOK_LOGIN_POPUP.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: string },
    ) => {
      const token = payload;
      const actionInProgress = false;
      return {
        ...state,
        token,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_POPUP.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      const error = payload;
      const actionInProgress = false;
      return {
        ...state,
        error,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_START.PENDING]: (state: AuthState) => {
      window.localStorage.setItem('redirect_started', new Date().toISOString());
      const actionInProgress = true;
      return {
        ...state,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_START.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      window.localStorage.removeItem('redirect_started');
      const error = payload;
      const actionInProgress = false;
      return {
        ...state,
        error,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_START.COMPLETED]: (state: AuthState) => {
      const actionInProgress = false;
      return {
        ...state,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE.PENDING]: (state: AuthState) => {
      window.localStorage.removeItem('redirect_started');
      const actionInProgress = true;
      return {
        ...state,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: string },
    ) => {
      const token = payload;
      const actionInProgress = false;
      return {
        ...state,
        token,
        actionInProgress,
      };
    },
    [FIREBASE_FACEBOOK_LOGIN_REDIRECT_COMPLETE.REJECTED]: (
      state: AuthState,
      { payload }: { payload: Error },
    ) => {
      const error = payload;
      const actionInProgress = false;
      return {
        ...state,
        error,
        actionInProgress,
      };
    },
  },
  initialState,
);

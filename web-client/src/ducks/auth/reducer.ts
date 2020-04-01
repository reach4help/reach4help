import firebase from 'src/firebase';
import { LoginResponse, UserCredential } from 'src/http/resources/auth';
import createReducer from 'src/store/utils/createReducer';

import { FIREBASE_FACEBOOK_LOGIN, LOGIN } from './types';

interface AuthState {
  token?: string;
}

const initialState: AuthState = {
  token: undefined,
};

export default createReducer<AuthState>(
  {
    [LOGIN.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: LoginResponse },
    ) => {
      state.token = payload.accessToken;
    },
    [FIREBASE_FACEBOOK_LOGIN.COMPLETED]: (
      state: AuthState,
      { payload }: { payload: firebase.auth.UserCredential },
    ) => {
      state.token = (payload.credential as firebase.auth.OAuthCredential).accessToken;
    },
  },
  initialState,
);

import { LoginResponse } from 'src/http/resources/auth';
import createReducer from 'src/store/utils/createReducer';

import { LOGIN } from './types';

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
  },
  initialState,
);

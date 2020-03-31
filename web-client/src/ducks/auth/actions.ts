import { login } from 'src/http/resources/auth';

import { LOGIN, LoginAction } from './types';

export const loginAction = (payload: LoginAction) => (dispatch: Function) => {
  dispatch({
    type: LOGIN,
    payload,
    api: login,
  });
};

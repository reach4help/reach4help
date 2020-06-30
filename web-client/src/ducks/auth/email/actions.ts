import {
  fetchSignInMethods,
  signIn as signInFunc,
  signUp as signUpFunc,
} from './functions';
import {
  CHECK_EMAIL,
  EmailAndPasswordPayload,
  SIGN_IN,
  SIGN_UP,
} from './types';

export const signIn = (payload: EmailAndPasswordPayload) => (
  dispatch: Function,
) => {
  dispatch({
    type: SIGN_IN,
    payload,
    firebase: signInFunc,
  });
};

export const signUp = (payload: EmailAndPasswordPayload) => (
  dispatch: Function,
) => {
  dispatch({
    type: SIGN_UP,
    payload,
    firebase: signUpFunc,
  });
};

export const checkEmail = (email: string) => (dispatch: Function) => {
  dispatch({
    type: CHECK_EMAIL,
    payload: {
      email,
    },
    firebase: fetchSignInMethods,
  });
};

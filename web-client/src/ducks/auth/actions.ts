import { observeUser, signOutCurrentUser } from './functions';
import { LOGOUT, OBSERVE_USER, SET_ONBOARDED } from './types';

export const observeUserAction = (dispatch: Function): Function => {
  dispatch({
    type: OBSERVE_USER,
    observer: observeUser,
  });

  return () =>
    dispatch({
      type: OBSERVE_USER.UNSUBSCRIBE,
      observerName: OBSERVE_USER,
    });
};

export const setOnboarded = (dispatch: Function, payload: boolean) => {
  dispatch({
    type: SET_ONBOARDED,
    payload,
  });
};

export const signOutCurrentUserAction = () => (dispatch: Function) => {
  dispatch({
    type: LOGOUT,
    firebase: signOutCurrentUser,
  });
};

import { observeUser } from 'src/http/resources/auth';

import { OBSERVE_USER } from './types';

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

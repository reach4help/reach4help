import { IRequest, Request } from 'src/models/requests';

import { observeRequests, setUserRequest } from './functions';
import { CHANGE_MODAL, IgetUserRequests, OBSERVE_REQUESTS, SET } from './types';

export const observeUserRequests = (
  dispatch: Function,
  payload: IgetUserRequests,
): Function => {
  dispatch({
    type: OBSERVE_REQUESTS,
    observer: observeRequests,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_REQUESTS,
    });
};

export const setRequest = (payload: IRequest) => (dispatch: Function) => {
  const requestPayload = Request.factory({
    ...payload,
  });
  dispatch({
    type: SET,
    payload: {
      requestPayload,
    },
    firebase: setUserRequest,
  });
};

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

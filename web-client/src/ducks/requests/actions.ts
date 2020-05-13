import { IRequest, Request } from 'src/models/requests';

import {
  observeNonOpenRequests as observeNonOpenRequestsFunc,
  observeOpenRequests as observeOpenRequestsFunc,
  setUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  IgetNonOpenRequests,
  IgetOpenRequests,
  OBSERVE_NON_OPEN_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  SET,
} from './types';

export const observeOpenRequests = (
  dispatch: Function,
  payload: IgetOpenRequests,
): (() => void) => {
  dispatch({
    type: OBSERVE_OPEN_REQUESTS,
    observer: observeOpenRequestsFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_OPEN_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_OPEN_REQUESTS,
    });
};

export const observeNonOpenRequests = (
  dispatch: Function,
  payload: IgetNonOpenRequests,
): (() => void) => {
  dispatch({
    type: OBSERVE_NON_OPEN_REQUESTS,
    observer: observeNonOpenRequestsFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_NON_OPEN_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_NON_OPEN_REQUESTS,
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

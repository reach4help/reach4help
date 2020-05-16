import { IRequest, Request, RequestStatus } from 'src/models/requests';

import {
  observeNonOpenRequests as observeNonOpenRequestsFunc,
  observeOpenRequests as observeOpenRequestsFunc,
  setUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  IgetNonOpenRequests,
  IgetOpenRequests,
  OBSERVE_ACCEPTED_REQUESTS,
  OBSERVE_CANCELLED_REQUESTS,
  OBSERVE_CLOSED_REQUESTS,
  OBSERVE_COMPLETED_REQUESTS,
  OBSERVE_FINISHED_REQUESTS,
  OBSERVE_ONGOING_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  SET,
} from './types';

const requestStatusMapper = {
  [RequestStatus.ongoing]: OBSERVE_ONGOING_REQUESTS,
  [RequestStatus.accepted]: OBSERVE_ACCEPTED_REQUESTS,
  [RequestStatus.completed]: OBSERVE_COMPLETED_REQUESTS,
  [RequestStatus.finished]: OBSERVE_FINISHED_REQUESTS,
  [RequestStatus.cancelled]: OBSERVE_CANCELLED_REQUESTS,
  [RequestStatus.closed]: OBSERVE_CLOSED_REQUESTS,
};

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
    type: requestStatusMapper[payload.requestStatus],
    observer: observeNonOpenRequestsFunc,
    payload,
  });

  return () =>
    dispatch({
      type: requestStatusMapper[payload.requestStatus].UNSUBSCRIBE,
      observerName: requestStatusMapper[payload.requestStatus],
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

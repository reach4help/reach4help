import { IRequest, Request, RequestStatus } from 'src/models/requests';

import {
  createUserRequest,
  getAcceptedRequest as getAcceptedRequestFunc,
  getArchivedRequest as getArchivedRequestFunc,
  getFinishedRequest as getFinishedRequestFunc,
  getOngoingRequest as getOngoingRequestFunc,
  getOpenRequest as getOpenRequestFunc,
  observeNonOpenRequests as observeNonOpenRequestsFunc,
  observeOpenRequests as observeOpenRequestsFunc,
  setUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  GET_ACCEPTED,
  GET_ARCHIVED,
  GET_FINISHED,
  GET_ONGOING,
  GET_OPEN,
  IgetNonOpenRequests,
  IgetOpenRequests,
  OBSERVE_CANCELLED_REQUESTS,
  OBSERVE_COMPLETED_REQUESTS,
  OBSERVE_ONGOING_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  OBSERVE_REMOVED_REQUESTS,
  RESET_SET,
  SET,
} from './types';

const requestStatusMapper = {
  [RequestStatus.ongoing]: OBSERVE_ONGOING_REQUESTS,
  [RequestStatus.completed]: OBSERVE_COMPLETED_REQUESTS,
  [RequestStatus.cancelled]: OBSERVE_CANCELLED_REQUESTS,
  [RequestStatus.removed]: OBSERVE_REMOVED_REQUESTS,
};

export const getOpenRequests = (payload: IgetOpenRequests) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_OPEN,
    firebase: getOpenRequestFunc,
    payload,
  });

export const getAcceptedRequests = (payload: IgetOpenRequests) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_ACCEPTED,
    firebase: getAcceptedRequestFunc,
    payload,
  });

export const getOngoingRequests = (payload: IgetOpenRequests) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_ONGOING,
    firebase: getOngoingRequestFunc,
    payload,
  });

export const getFinishedRequests = (payload: IgetOpenRequests) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_FINISHED,
    firebase: getFinishedRequestFunc,
    payload,
  });

export const getArchivedRequests = (payload: IgetOpenRequests) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_ARCHIVED,
    firebase: getArchivedRequestFunc,
    payload,
  });

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
): any => {
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

export const setRequest = (payload: IRequest, requestId?: string) => (
  dispatch: Function,
) => {
  const requestPayload = Request.factory({
    ...payload,
  });

  dispatch({
    type: SET,
    payload: {
      requestPayload,
      requestId,
    },
    firebase: requestId ? setUserRequest : createUserRequest,
  });
};

export const resetSetRequestState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_SET,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

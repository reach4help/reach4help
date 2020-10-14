import { IRequest, Request } from 'src/models/requests';

/* TODO: why rename? */
import {
  createUserRequest,
  getAcceptedRequest as getAcceptedRequestFunc,
  getArchivedRequest as getArchivedRequestFunc,
  getFinishedRequest as getFinishedRequestFunc,
  getOngoingRequest as getOngoingRequestFunc,
  getOpenRequest as getOpenRequestFunc,
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
  IgetOpenRequests,
  OBSERVE_OPEN_REQUESTS,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

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

export const setRequest = (
  payload: IRequest,
  requestId?: string,
  phoneNumber?: string | null,
) => (dispatch: Function) => {
  const requestPayload = Request.factory({
    ...payload,
  });

  dispatch({
    type: phoneNumber ? SET : SET_TEMP_REQUEST,
    payload: {
      requestPayload,
      requestId,
    },
    firebase: phoneNumber
      ? requestId
        ? setUserRequest
        : createUserRequest
      : null,
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

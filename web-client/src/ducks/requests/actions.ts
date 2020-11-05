import { IRequest, Request } from 'src/models/requests';

/* TODO: why rename? */
import {
  createUserRequest,
  getAcceptedPost as getAcceptedPostFunc,
  getArchivedRequest as getArchivedRequestFunc,
  getFinishedRequest as getFinishedRequestFunc,
  getOngoingPost as getOngoingPostFunc,
  getOpenPost as getOpenPostFunc,
  observeOpenPosts as observeOpenPostsFunc,
  setUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  GET_ARCHIVED,
  GET_FINISHED,
  GET_OFFER_POST,
  GET_ONGOING,
  GET_REQUEST_POST,
  IgetOpenPosts,
  OBSERVE_OPEN_POSTS,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

export const getOpenPosts = (payload: IgetOpenPosts) => (dispatch: Function) =>
  dispatch({
    type: GET_REQUEST_POST,
    firebase: getOpenPostFunc,
    payload,
  });

export const getAcceptedPosts = (payload: IgetOpenPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_OFFER_POST,
    firebase: getAcceptedPostFunc,
    payload,
  });

export const getOngoingPosts = (payload: IgetOpenPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_ONGOING,
    firebase: getOngoingPostFunc,
    payload,
  });

export const getFinishedRequests = (payload: IgetOpenPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_FINISHED,
    firebase: getFinishedRequestFunc,
    payload,
  });

export const getArchivedRequests = (payload: IgetOpenPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_ARCHIVED,
    firebase: getArchivedRequestFunc,
    payload,
  });

export const observeOpenPosts = (
  dispatch: Function,
  payload: IgetOpenPosts,
): (() => void) => {
  dispatch({
    type: OBSERVE_OPEN_POSTS,
    observer: observeOpenPostsFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_OPEN_POSTS.UNSUBSCRIBE,
      observerName: OBSERVE_OPEN_POSTS,
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

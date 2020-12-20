import { IRequest, Request } from 'src/models/requests';

/* TODO: why rename? */
import {
  createUserRequest,
  getAcceptedPost as getAcceptedPostFunc,
  getOpenPost as getOpenPostFunc,
  setUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  GET_OFFER_POST,
  GET_REQUEST_POST,
  IgetRequestPosts,
  RESET_OFFER_POST,
  RESET_REQUEST_POST,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

export const getRequestPosts = (payload: IgetRequestPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_REQUEST_POST,
    firebase: getOpenPostFunc,
    payload,
  });

export const getOfferPosts = (payload: IgetRequestPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_OFFER_POST,
    firebase: getAcceptedPostFunc,
    payload,
  });

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

export const resetRequestPostState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_REQUEST_POST,
    payload: true,
  });

export const resetOfferPostState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_OFFER_POST,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

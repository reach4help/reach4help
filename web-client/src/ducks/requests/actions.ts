import { IRequest, Request } from 'src/models/requests';

/* TODO: (es) why rename? */
import {
  createUserRequest,
  getMyCavRequestPosts as getCavPostFunc,
  getFindPosts as getFindPostsFunc,
  getMyPinReqestPosts as getMyPinRequestPostsFunc,
  getRequestWithOffersAndTimelineItems as getRequestWithOffersAndTimelineItemsFunc,
  setUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  GET_CAV_REQUEST_POSTS,
  GET_FIND_POSTS,
  GET_PIN_REQUEST_POSTS,
  GET_REQUEST_WITH_OFFERS_AND_TIMELINES,
  IgetMyPosts,
  IgetRequestPosts,
  RESET_CAV_REQUEST_POSTS,
  RESET_FIND_REQUEST_POSTS,
  RESET_PIN_REQUEST_POSTS,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

export const getFindPosts = (payload: IgetRequestPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_FIND_POSTS,
    firebase: getFindPostsFunc,
    payload,
  });

/**
 * Selects request posts for specified user
 * @param [IgetRequestPosts] payload - WHERE clause values
 */
export const getMyPinRequestPosts = (payload: IgetMyPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_PIN_REQUEST_POSTS,
    firebase: getMyPinRequestPostsFunc,
    payload,
  });

/**
 * Selects request posts for specified user
 * @param [IgetRequestPosts] payload - WHERE clause values
 */
export const getRequestWithOffersAndTimelineItems = (payload: IgetMyPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_REQUEST_WITH_OFFERS_AND_TIMELINES,
    firebase: getRequestWithOffersAndTimelineItemsFunc,
    payload,
  });

/**
 * Selects request posts for which user has responded to offer help
 * @param [IgetRequestPosts] payload - WHERE clause values
 */
export const getCavRequestPosts = (payload: IgetRequestPosts) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_CAV_REQUEST_POSTS,
    firebase: getCavPostFunc,
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

export const resetCavRequestPostsState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_CAV_REQUEST_POSTS,
    payload: true,
  });

export const resetFindRequestPostsState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_FIND_REQUEST_POSTS,
    payload: true,
  });

export const resetPinRequestPostsState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_PIN_REQUEST_POSTS,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

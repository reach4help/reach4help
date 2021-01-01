import { IPost, Post } from 'src/models/posts';
import { User } from 'src/models/users';
import { XGeneralRequest } from 'src/models/xGeneralOffers';

import {
  createGeneralRequest,
  getMyRequests,
  updateGeneralRequest,
} from './functions';
import {
  CHANGE_MODAL,
  OBSERVE_CREATE_GENERAL_REQUEST,
  OBSERVE_GET_MY_REQUESTS,
  OBSERVE_UPDATE_GENERAL_REQUEST,
  RESET_UPDATE_GENERAL_REQUEST,
  UPDATE_TEMP_REQUEST,
} from './types';

export const observeCreateGeneralRequest = (
  payload: XGeneralRequest,
  // profileState: ProfileState,
) => (dispatch: Function) =>
  dispatch({
    type: OBSERVE_CREATE_GENERAL_REQUEST,
    payload: {
      generalRequest: payload /* , creatorProfileState: profileState */,
    },
    firebase: createGeneralRequest,
  });

export const observeGetMyRequests = (
  dispatch: Function,
  {
    status,
    userRef,
  }: {
    status: string | null;
    userRef: firebase.firestore.DocumentReference<User>;
  },
): Function => {
  dispatch({
    type: OBSERVE_GET_MY_REQUESTS,
    observer: getMyRequests,
    payload: {
      requestingHelp: true,
      status,
      userRef,
    },
  });

  return () =>
    dispatch({
      type: OBSERVE_GET_MY_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_GET_MY_REQUESTS,
    });
};

export const updateRequest = (
  payload: IPost,
  postId?: string,
  phoneNumber?: string | null,
) => (dispatch: Function) => {
  const postPayload = Post.factory({
    ...payload,
  });

  return dispatch({
    type: phoneNumber ? OBSERVE_UPDATE_GENERAL_REQUEST : UPDATE_TEMP_REQUEST,
    payload: {
      postPayload,
      postId,
    },
    firebase: phoneNumber
      ? postId
        ? updateGeneralRequest
        : createGeneralRequest
      : null,
  });
};

export const resetSetRequestState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_UPDATE_GENERAL_REQUEST,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

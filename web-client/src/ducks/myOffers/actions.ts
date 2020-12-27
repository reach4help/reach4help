import { IPost, Post } from 'src/models/posts';
import { User } from 'src/models/users';

import {
  createGeneralRequest,
  observeMyOffers as observeMyOffersFunc,
  setGeneralRequest,
} from './functions';
import {
  CHANGE_MODAL,
  OBSERVE_MY_OFFERS,
  RESET_SET,
  SET,
  SET_TEMP_OFFER,
} from './types';

export const observeMyOffers = (
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
    type: OBSERVE_MY_OFFERS,
    observer: observeMyOffersFunc,
    payload: {
      requestingHelp: true,
      status,
      userRef,
    },
  });

  return () =>
    dispatch({
      type: OBSERVE_MY_OFFERS.UNSUBSCRIBE,
      observerName: OBSERVE_MY_OFFERS,
    });
};

export const setRequest = (
  payload: IPost,
  postId?: string,
  phoneNumber?: string | null,
) => (dispatch: Function) => {
  const postPayload = Post.factory({
    ...payload,
  });

  dispatch({
    type: phoneNumber ? SET : SET_TEMP_OFFER,
    payload: {
      postPayload,
      postId,
    },
    firebase: phoneNumber
      ? postId
        ? setGeneralRequest
        : createGeneralRequest
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

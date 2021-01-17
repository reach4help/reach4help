import { IPost, Post } from 'src/models/posts';
import { User } from 'src/models/users';

import { createPost } from '../posts/functions';
import { getMyRequests } from './functions';
import {
  CHANGE_MODAL,
  OBSERVE_CREATE_GENERAL_REQUEST,
  OBSERVE_GET_MY_REQUESTS,
  RESET_UPDATE_GENERAL_REQUEST,
} from './types';

export const dispatchCreateGeneralRequest = (
  payload: IPost,
  // profileState: ProfileState,
) => (dispatch: Function) => {
  const postPayload = Post.factory(payload);
  return dispatch({
    type: OBSERVE_CREATE_GENERAL_REQUEST,
    payload: { postPayload },
    firebase: createPost,
  });
};

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

// TOD: (es) Remove
// export const updateRequest = (
//   payload: IPost,
//   postId?: string,
//   phoneNumber?: string | null,
// ) => (dispatch: Function) => {
//   const postPayload = Post.factory({
//     ...payload,
//   });

//   return dispatch({
//     type: phoneNumber ? OBSERVE_UPDATE_GENERAL_REQUEST : UPDATE_TEMP_REQUEST,
//     payload: {
//       postPayload,
//       postId,
//     },
//     firebase: phoneNumber
//       ? postId
//         ? updateGeneralRequest
//         : createGeneralRequest
//       : null,
//   });
// };

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

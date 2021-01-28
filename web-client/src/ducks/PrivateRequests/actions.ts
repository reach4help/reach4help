import { IPost, Post } from 'src/models/posts';
import { User } from 'src/models/users';
import { createPost, getPosts } from 'src/services/posts';

import {
  CHANGE_MODAL,
  DISPATCH_CREATE_PRIVATE_REQUEST,
  OBSERVE_GET_MY_REQUESTS,
  RESET_UPDATE_PRIVATE_REQUEST,
} from './types';

export const dispatchCreatePrivateRequestFromOffer = (
  payload: IPost,
  // profileState: ProfileState,
) => (dispatch: Function) => {
  const postPayload = Post.factory(payload);
  postPayload.requestingHelp = !payload.requestingHelp;
  postPayload.sourcePublicPostId = payload.postId;
  postPayload.isResponse = true;
  return dispatch({
    type: DISPATCH_CREATE_PRIVATE_REQUEST,
    payload: postPayload,
    firebase: createPost,
  });
};

export const observeGetPrivateRequestsForRequest = (
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
    observer: getPosts,
    payload: {
      offeringHelp: true,
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
//     type: phoneNumber ? OBSERVE_UPDATE_PRIVATE_REQUEST : UPDATE_TEMP_REQUEST,
//     payload: {
//       postPayload,
//       postId,
//     },
//     firebase: phoneNumber
//       ? postId
//         ? updatePrivateRequest
//         : createPrivateRequest
//       : null,
//   });
// };

export const resetSetRequestState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_UPDATE_PRIVATE_REQUEST,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

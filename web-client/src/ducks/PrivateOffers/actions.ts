import { IPost, Post } from 'src/models/posts';
import { User } from 'src/models/users';
import { createPost, getPosts } from 'src/services/posts';

import {
  CHANGE_MODAL,
  DISPATCH_CREATE_PRIVATE_OFFER,
  OBSERVE_GET_MY_OFFERS,
  RESET_UPDATE_PRIVATE_OFFER,
} from './types';

export const dispatchCreatePrivateOfferFromRequest = (
  payload: IPost,
  // profileState: ProfileState,
) => (dispatch: Function) => {
  const postPayload = Post.factory(payload);
  postPayload.requestingHelp = !payload.requestingHelp;
  postPayload.sourcePublicPostId = payload.postId;
  postPayload.isResponse = true;
  return dispatch({
    type: DISPATCH_CREATE_PRIVATE_OFFER,
    payload: postPayload,
    firebase: createPost,
  });
};

export const observeGetPrivateRequestForOffer = (
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
    type: OBSERVE_GET_MY_OFFERS,
    observer: getPosts,
    payload: {
      offeringHelp: true,
      status,
      userRef,
    },
  });

  return () =>
    dispatch({
      type: OBSERVE_GET_MY_OFFERS.UNSUBSCRIBE,
      observerName: OBSERVE_GET_MY_OFFERS,
    });
};

// TOD: (es) Remove
// export const updateOffer = (
//   payload: IPost,
//   postId?: string,
//   phoneNumber?: string | null,
// ) => (dispatch: Function) => {
//   const postPayload = Post.factory({
//     ...payload,
//   });

//   return dispatch({
//     type: phoneNumber ? OBSERVE_UPDATE_PRIVATE_OFFER : UPDATE_TEMP_OFFER,
//     payload: {
//       postPayload,
//       postId,
//     },
//     firebase: phoneNumber
//       ? postId
//         ? updatePrivateOffer
//         : createPrivateOffer
//       : null,
//   });
// };

export const resetSetOfferState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_UPDATE_PRIVATE_OFFER,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

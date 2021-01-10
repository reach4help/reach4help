import { IPost, Post } from 'src/models/Post';
import { User } from 'src/models/users';

import {
  createUserPost,
  observeMyPostsAndResponses,
  setUserPost,
} from './functions';
import { OBSERVE_MY_OFFERS, OBSERVE_MY_REQUESTS } from './types';

export const observeMyRequests = (
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
    type: OBSERVE_MY_REQUESTS,
    observer: observeMyPostsAndResponses,
    payload: {
      requestingHelp: true,
      status,
      userRef,
    },
  });

  return () =>
    dispatch({
      type: OBSERVE_MY_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_MY_REQUESTS,
    });
};

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
    observer: observeMyPostsAndResponses,
    payload: {
      requestingHelp: false,
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

export const setRequest = (payload: IPost, postId?: string) => {
  const postPayload = Post.factory({
    ...payload,
  });

  if (postId) {
    return setUserPost({
      postPayload,
      postId,
    });
  }

  return createUserPost({ postPayload });
};

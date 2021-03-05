import { IPost } from 'src/models/posts/IPost';
import { Post } from 'src/models/posts/Post';
import { User } from 'src/models/users';
import { createPost, observePosts } from 'src/services/posts';

import { OBSERVE } from './types';

export const createOffer = (payload: IPost) => {
  const postPayload = Post.factory(payload);
  return createPost(postPayload);
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
    type: OBSERVE,
    observer: observePosts,
    payload: {
      offeringHelp: true,
      status,
      userRef,
    },
  });

  return () =>
    dispatch({
      type: OBSERVE.UNSUBSCRIBE,
      observerName: OBSERVE,
    });
};

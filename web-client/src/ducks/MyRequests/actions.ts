import { Post } from "src/models/Post";
import { IPost } from "src/models/IPost";
import { User } from 'src/models/users';
import { createPost, observePosts } from 'src/services/posts';

import { OBSERVE } from './types';

export const createRequest = (payload: IPost) => {
  const postPayload = Post.factory(payload);
  return createPost(postPayload);
};

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
    type: OBSERVE,
    observer: observePosts,
    payload: {
      requestingHelp: true,
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

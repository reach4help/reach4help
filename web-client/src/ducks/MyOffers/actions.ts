import { firestore } from 'src/firebase';
import { Post } from "src/models/Post";
import { IPost } from "src/models/IPost";
import { User } from 'src/models/users';
import { createPost, observePosts } from 'src/services/posts';

import { OBSERVE } from './types';

export const createResponseOffer = async ({
  // eslint-disable-next-line no-unused-vars
  accept,
  requestId,
  // eslint-disable-next-line no-unused-vars
  userId,
  // eslint-disable-next-line no-unused-vars
  userSnapshot,
}: {
  accept: boolean;
  requestId: string;
  userId: firebase.firestore.DocumentReference<User>;
  userSnapshot: User;
}) => {
  // eslint-disable-next-line no-unused-vars
  const requestRef = firestore.doc(
    requestId,
  ) as firebase.firestore.DocumentReference<Post>;
  /* 
    1. fetch post with reference as requestRef from firestore using the post service
    2. create the post object for the response with the data obtained from the arguments 
    and with the post object obtained as response in step 1 being used as the snapshot
    3. call createPost function from the post service using the new post instance
  */
  // temporary return until the above steps are implemented
  return Promise.resolve();
};

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

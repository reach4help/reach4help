import { Post } from 'src/models/posts';
import { User } from 'src/models/users';

import { createPost, observePosts, setPost } from '../posts/functions';

export const createGeneralRequest = async ({
  postPayload,
}: {
  postPayload: Post;
}) => createPost({ postPayload });

export const setGeneralRequest = async ({
  postPayload,
  postId,
}: {
  postPayload: Post;
  postId: string;
}) => setPost({ postPayload, postId });

export const observeMyOffers = (
  nextValue: Function,
  {
    status,
    userRef,
  }: {
    status: string | null;
    userRef: firebase.firestore.DocumentReference<User>;
  },
) => observePosts(nextValue, { requestingHelp: false, status, userRef });

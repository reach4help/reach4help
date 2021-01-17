import { Post } from 'src/models/posts';
import { User } from 'src/models/users';

import { createPost, observePosts, updatePost } from '../posts/functions';

export const createGeneralRequest = async ({ payload }: { payload: Post }) =>
  createPost(payload);

export const updateGeneralRequest = async ({
  postPayload,
  postId,
}: {
  postPayload: Post;
  postId: string;
}) => updatePost({ postPayload, postId });

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

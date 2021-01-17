import { Post } from 'src/models/posts';
import { User } from 'src/models/users';

import { createPost, observePosts, updatePost } from '../posts/functions';

export const createGeneralRequest = async ({
  postPayload,
}: {
  postPayload: Post;
}) => createPost(postPayload);

export const updateGeneralRequest = async ({
  postPayload,
  postId,
}: {
  postPayload: Post;
  postId: string;
}) => updatePost({ postPayload, postId });

export const getMyRequests = (
  nextValue: Function,
  {
    status,
    userRef,
  }: {
    status: string | null;
    userRef: firebase.firestore.DocumentReference<User>;
  },
) => observePosts(nextValue, { requestingHelp: true, status, userRef });

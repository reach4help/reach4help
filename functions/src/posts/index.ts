import * as functions from 'firebase-functions';

import { createPost, updatePost } from './functions';

export const triggerEventsWhenPostIsCreated = functions.firestore
  .document('posts/{postId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate(createPost);

export const triggerEventsWhenPostIsUpdated = functions.firestore.document('posts/{postId}').onUpdate(updatePost);

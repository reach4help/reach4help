import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';

import { indexGeneralPost, indexUnauthenticatedPost, reflectResponseInPost } from '../algolia';
import { db } from '../app';
import { IPost } from '../models/posts/IPost';
import { Post } from '../models/posts/Post';
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

// TODO: ** (es) what is poiont of below?
// eslint-disable-next-line no-unused-vars
const queueStatusUpdateTriggers = async (change: Change<DocumentSnapshot>): Promise<void[]> => {
  // const postBefore = change.before.exists ? (change.before.data() as Request) : null;
  // const postAfter = change.after.exists ? (change.after.data() as Request) : null;

  const operations: Promise<void>[] = [];

  return Promise.all(operations);
};

// eslint-disable-next-line no-unused-vars
const queueCreateTriggers = async (snapshot: DocumentSnapshot): Promise<void[]> => {
  const operations: Promise<void>[] = [];
  return Promise.all(operations);
};

const validatePost = (value: IPost): Promise<void> =>
  validateOrReject(Post.factory(value)).then(() => {
    return Promise.resolve();
  });

export const createPost = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validatePost(snapshot.data() as IPost)
    .then(() => {
      console.log('createPost: queueCreateTriggers ');
      return Promise.all([queueCreateTriggers(snapshot)]);
    })
    .then(() => {
      const post = Post.factory(snapshot.data() as IPost);
      console.log('createPost: indexing');
      if (post.isResponse) {
        console.log('createPost: reflect');
        return Promise.all([reflectResponseInPost(post)]);
      }
      console.log('createPost: index new');
      return Promise.all([indexUnauthenticatedPost(post, snapshot.ref.path), indexGeneralPost(post, snapshot.ref.path)]);
    })
    .catch(errors => {
      if (errors && Array.isArray(errors)) {
        console.error('Invalid Request Found: ');
        for (const e of errors) {
          console.error('e: ', e);
        }
      } else {
        console.error('error occured: ', errors);
      }
      return db
        .collection('posts')
        .doc(context.params.postId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    })
    .then(() => Promise.resolve());
};

export const updatePost = (change: Change<DocumentSnapshot>, context: EventContext) => {
  return validatePost(change.after.data() as IPost)
    .then(() => {
      // Check if this was a delete user operation or not
      const postBefore = change.before.exists ? (change.before.data() as Post) : null;
      const postAfter = change.after.exists ? (change.after.data() as Post) : null;
      if (
        postBefore &&
        postAfter &&
        // No need to execute update trigger if the user's account was deleted
        ((postBefore?.status === postAfter?.status &&
          (postAfter?.creatorSnapshot.displayNickname === 'Deleted User')))
      ) {
        return;
      }
      console.log('updatePost: proceeding with status triggers and indexing triggers');
      const updatedPost = Post.factory(change.after.data() as IPost);
      return (
        Promise.all([queueStatusUpdateTriggers(change)])
          // Wait to ensure that other triggers don't fail to prevent stale data from being indexed in algolia
          .then(() => {
            console.log('updatePost: indexing');
            return Promise.all([indexUnauthenticatedPost(updatedPost, change.after.ref.path), indexGeneralPost(updatedPost, change.after.ref.path)]);
          })
      );
    })
    .catch(e => {
      console.error('Invalid Request Found: ', e);
      const prevData = change.before.data();
      if (prevData) {
        return db
          .collection('posts')
          .doc(context.params.postId)
          .set(prevData)
          .catch(() => {
            return Promise.resolve();
          });
      }
      return db
        .collection('posts')
        .doc(context.params.postId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};

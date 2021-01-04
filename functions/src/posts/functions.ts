import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';

import { indexGeneralPost, indexUnauthenticatedPost, reflectResponseInPost } from '../algolia';
import { db } from '../app';
import { IPost, Post } from '../models/Post';
import { IUser, User } from '../models/users';
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

const attemptToUpdateResponderRating = async (
  operations: Promise<void>[],
  postBefore: Post | null,
  postAfter: Post | null,
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
) => {
  if (
    postAfter?.isResponse &&
    postAfter.creatorRef &&
    ((postBefore?.parentCreatorGivenRating === null && postAfter?.parentCreatorGivenRating !== null) ||
      (postBefore?.parentCreatorGivenRating !== null &&
        postAfter?.parentCreatorGivenRating !== null &&
        postBefore?.parentCreatorGivenRating !== postAfter.parentCreatorGivenRating))
  ) {
    const user = User.factory((await postAfter.creatorRef.get()).data() as IUser);
    if (user) {
      const countToAdd = 1 - (postBefore?.parentCreatorGivenRating ? 1 : 0);
      const ratingToAdd = postAfter.parentCreatorGivenRating - (postBefore?.parentCreatorGivenRating || 0);
      if (postAfter.requestingHelp) {
        // This shows the ratings received as a result of requesting help
        const requestsMade = (user.requestsMade || 0) + countToAdd;
        const pinRatingsReceived = (user.pinRatingsReceived || 0) + ratingToAdd;
        operations.push(
          postAfter.creatorRef
            .update({
              pinRatingsReceived,
              requestsMade,
            })
            .then(() => Promise.resolve()),
        );
        user.requestsMade = requestsMade;
        user.pinRatingsReceived = pinRatingsReceived;
      } else {
        // This shows the ratings received as a result of offering help
        const cavRatingsReceived = (user.cavRatingsReceived || 0) + ratingToAdd;
        const casesCompleted = (user.casesCompleted || 0) + countToAdd;
        operations.push(
          postAfter.creatorRef
            .update({
              cavRatingsReceived,
              casesCompleted,
            })
            .then(() => Promise.resolve()),
        );
        user.casesCompleted = casesCompleted;
        user.cavRatingsReceived = cavRatingsReceived;
      }
      operations.push(
        ref
          .update({
            creatorSnapshot: user.toObject(),
          })
          .then(() => Promise.resolve()),
      );
    }
  }
};

const attemptToUpdateParentCreatorRating = async (
  operations: Promise<void>[],
  postBefore: Post | null,
  postAfter: Post | null,
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
) => {
  if (
    postAfter?.isResponse &&
    postAfter.parentSnapshot?.creatorRef &&
    ((postBefore?.creatorGivenRating === null && postAfter?.creatorGivenRating !== null) ||
      (postBefore?.creatorGivenRating !== null &&
        postAfter?.creatorGivenRating !== null &&
        postBefore?.creatorGivenRating !== postAfter.creatorGivenRating))
  ) {
    const user = User.factory((await postAfter.parentSnapshot.creatorRef.get()).data() as IUser);
    if (user) {
      const countToAdd = 1 - (postBefore?.creatorGivenRating ? 1 : 0);
      const ratingToAdd = postAfter.creatorGivenRating - (postBefore?.creatorGivenRating || 0);
      if (postAfter.parentSnapshot.requestingHelp) {
        // This shows the ratings received as a result of requesting help
        const requestsMade = (user.requestsMade || 0) + countToAdd;
        const pinRatingsReceived = (user.pinRatingsReceived || 0) + ratingToAdd;
        operations.push(
          postAfter.parentSnapshot.creatorRef
            .update({
              pinRatingsReceived,
              requestsMade,
            })
            .then(() => Promise.resolve()),
        );
        user.requestsMade = requestsMade;
        user.pinRatingsReceived = pinRatingsReceived;
      } else {
        // This shows the ratings received as a result of offering help
        const cavRatingsReceived = (user.cavRatingsReceived || 0) + ratingToAdd;
        const casesCompleted = (user.casesCompleted || 0) + countToAdd;
        operations.push(
          postAfter.creatorRef
            .update({
              cavRatingsReceived,
              casesCompleted,
            })
            .then(() => Promise.resolve()),
        );
        user.casesCompleted = casesCompleted;
        user.cavRatingsReceived = cavRatingsReceived;
      }
      operations.push(
        ref
          .update({
            creatorSnapshot: user.toObject(),
          })
          .then(() => Promise.resolve()),
      );
    }
  }
};

// eslint-disable-next-line no-unused-vars
const queueStatusUpdateTriggers = async (change: Change<DocumentSnapshot>): Promise<void[]> => {
  // const requestBefore = change.before.exists ? (change.before.data() as Request) : null;
  // const requestAfter = change.after.exists ? (change.after.data() as Request) : null;

  const operations: Promise<void>[] = [];

  return Promise.all(operations);
};

const queueRatingUpdatedTriggers = async (change: Change<DocumentSnapshot>): Promise<void[]> => {
  const requestBefore = change.before.exists ? (change.before.data() as Post) : null;
  const requestAfter = change.after.exists ? (change.after.data() as Post) : null;

  const operations: Promise<void>[] = [];

  await attemptToUpdateResponderRating(operations, requestBefore, requestAfter, change.after.ref);
  await attemptToUpdateParentCreatorRating(operations, requestBefore, requestAfter, change.after.ref);

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
      const requestBefore = change.before.exists ? (change.before.data() as Post) : null;
      const requestAfter = change.after.exists ? (change.after.data() as Post) : null;
      if (
        requestBefore &&
        requestAfter &&
        // No need to execute update trigger if the user's account was deleted
        ((requestBefore?.status === requestAfter?.status &&
          (requestAfter?.creatorSnapshot.displayName === 'Deleted User' ||
            requestAfter?.parentSnapshot?.creatorSnapshot?.displayName === 'Deleted User')) ||
          // No need to execute update trigger if the offer count and last offer or rejection count and last rejection is being updated
          requestBefore.positiveResponseCount < requestAfter.postiveResponseCount ||
          requestBefore.negativeResponseCount < requestAfter.negativeResponseCount)
      ) {
        return;
      }
      console.log('updatePost: proceeding with status triggers and indexing triggers');
      const updatedPost = Post.factory(change.after.data() as IPost);
      return (
        Promise.all([queueStatusUpdateTriggers(change), queueRatingUpdatedTriggers(change)])
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
          .collection('requests')
          .doc(context.params.requestId)
          .set(prevData)
          .catch(() => {
            return Promise.resolve();
          });
      }
      return db
        .collection('requests')
        .doc(context.params.requestId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};

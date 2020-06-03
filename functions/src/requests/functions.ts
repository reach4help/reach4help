import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import * as moment from 'moment';

import { indexRequest, removeRequestFromIndex } from '../algolia';
import { db } from '../app';
import { IRequest, Request, RequestStatus } from '../models/requests';
import { IUser, User } from '../models/users';
import { queueTimelineItemTriggers } from '../shared/triggerFunctions';
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

const attemptToUpdateCavRating = async (operations: Promise<void>[], requestBefore: Request | null, requestAfter: Request | null) => {
  // We have a new CAV rating -  Update CAV rating average but only this time.
  if (requestBefore?.cavRating === null && requestAfter?.cavRating !== null && requestAfter?.cavUserRef) {
    const user = User.factory((await requestAfter.cavUserRef.get()).data() as IUser);
    if (user) {
      const currentAverage = user.averageRating ? user.averageRating : 0;
      const cavRatingsReceived = user.cavRatingsReceived ? user.cavRatingsReceived + 1 : 1;
      // Calculate new average by summing all past averages and re-averaging with new value
      const newAverage = (currentAverage * (cavRatingsReceived - 1) + requestAfter.cavRating) / cavRatingsReceived;
      operations.push(
        requestAfter.cavUserRef
          .update({
            averageRating: newAverage,
            cavRatingsReceived,
          })
          .then(() => Promise.resolve()),
      );
    }
  } else if (
    requestBefore?.cavRating !== null &&
    requestAfter?.cavRating !== null &&
    requestBefore?.cavRating !== requestAfter?.cavRating &&
    requestBefore?.cavRatedAt &&
    requestAfter?.cavRatedAt &&
    requestBefore?.cavRatedAt !== requestAfter?.cavRatedAt &&
    requestAfter?.cavUserRef
  ) {
    const previousRatedAt = moment(requestBefore.cavRatedAt.toDate());
    const fiveMinutesPastPreviousRatedAt = previousRatedAt.add(5, 'minutes');
    const currentRatedAt = moment(requestAfter.cavRatedAt.toDate());
    if (currentRatedAt.isSameOrBefore(fiveMinutesPastPreviousRatedAt)) {
      const user = User.factory((await requestAfter.cavUserRef.get()).data() as IUser);
      if (user) {
        let average = user.averageRating ? user.averageRating : 0;
        const cavRatingsReceived = user.cavRatingsReceived ? user.cavRatingsReceived + 1 : 2;
        // Subtract the old rating from the average and reverse the average to what it was before the old rating was given
        average = (average * cavRatingsReceived - requestBefore.cavRating) / (cavRatingsReceived - 1);
        // Add the new rating to the average and calculate the new average
        const newAverage = (average * (cavRatingsReceived - 1) + requestAfter.cavRating) / cavRatingsReceived;
        operations.push(
          requestAfter.cavUserRef
            .update({
              averageRating: newAverage,
              cavRatingsReceived,
            })
            .then(() => Promise.resolve()),
        );
      }
    }
  }
};

const attemptToUpdateCavCompletedOffersCounts = (operations: Promise<void>[], requestBefore: Request | null, requestAfter: Request | null) => {
  // A request has just been completed - Update CAV request completed count
  if (requestBefore?.status !== RequestStatus.completed && requestAfter?.status === RequestStatus.completed && requestAfter.cavUserRef) {
    // Using increment without read
    operations.push(
      requestAfter.cavUserRef
        .update({
          casesCompleted: admin.firestore.FieldValue.increment(1),
        })
        .then(() => Promise.resolve()),
    );
  }
};

const attemptToUpdatePinRating = async (operations: Promise<void>[], requestBefore: Request | null, requestAfter: Request | null) => {
  // We have a new PIN rating -  Update PIN rating average but only this time.
  if (requestBefore?.pinRating === null && requestAfter?.pinRating !== null && requestAfter?.pinUserRef) {
    const user = User.factory((await requestAfter.pinUserRef.get()).data() as IUser);
    if (user) {
      const currentAverage = user.averageRating ? user.averageRating : 0;
      const pinRatingsReceived = user.pinRatingsReceived ? user.pinRatingsReceived + 1 : 1;
      // Calculate new average by summing all past averages and re-averaging with new value
      const newAverage = (currentAverage * (pinRatingsReceived - 1) + requestAfter.pinRating) / pinRatingsReceived;
      operations.push(
        requestAfter.pinUserRef
          .update({
            averageRating: newAverage,
            pinRatingsReceived,
          })
          .then(() => Promise.resolve()),
      );
    }
  } else if (
    requestBefore?.pinRating !== null &&
    requestAfter?.pinRating !== null &&
    requestBefore?.pinRating !== requestAfter?.pinRating &&
    requestBefore?.pinRatedAt &&
    requestAfter?.pinRatedAt &&
    requestBefore?.pinRatedAt !== requestAfter?.pinRatedAt &&
    requestAfter?.pinUserRef
  ) {
    const previousRatedAt = moment(requestBefore.pinRatedAt.toDate());
    const fiveMinutesPastPreviousRatedAt = previousRatedAt.add(5, 'minutes');
    const currentRatedAt = moment(requestAfter.pinRatedAt.toDate());
    if (currentRatedAt.isSameOrBefore(fiveMinutesPastPreviousRatedAt)) {
      const user = User.factory((await requestAfter.pinUserRef.get()).data() as IUser);
      if (user) {
        let average = user.averageRating ? user.averageRating : 0;
        const pinRatingsReceived = user.pinRatingsReceived ? user.pinRatingsReceived : 2;
        // Subtract the old rating from the average and reverse the average to what it was before the old rating was given
        average = (average * pinRatingsReceived - requestBefore.pinRating) / (pinRatingsReceived - 1);
        // Add the new rating to the average and calculate the new average
        const newAverage = (average * (pinRatingsReceived - 1) + requestAfter.pinRating) / pinRatingsReceived;
        operations.push(
          requestAfter.pinUserRef
            .update({
              averageRating: newAverage,
            })
            .then(() => Promise.resolve()),
        );
      }
    }
  }
};

const queueStatusUpdateTriggers = async (change: Change<DocumentSnapshot>): Promise<void[]> => {
  const requestBefore = change.before.exists ? (change.before.data() as Request) : null;
  const requestAfter = change.after.exists ? (change.after.data() as Request) : null;

  const operations: Promise<void>[] = [];

  attemptToUpdateCavCompletedOffersCounts(operations, requestBefore, requestAfter);

  return Promise.all(operations);
};

const queueRatingUpdatedTriggers = async (change: Change<DocumentSnapshot>): Promise<void[]> => {
  const requestBefore = change.before.exists ? (change.before.data() as Request) : null;
  const requestAfter = change.after.exists ? (change.after.data() as Request) : null;

  const operations: Promise<void>[] = [];

  await attemptToUpdateCavRating(operations, requestBefore, requestAfter);
  await attemptToUpdatePinRating(operations, requestBefore, requestAfter);

  return Promise.all(operations);
};

const queueCreateTriggers = async (snapshot: DocumentSnapshot): Promise<void[]> => {
  const operations: Promise<void>[] = [];
  const data = snapshot.data();
  if (data) {
    operations.push(
      data.pinUserRef.update({
        requestsMade: admin.firestore.FieldValue.increment(1),
      }),
    );
  }
  return Promise.all(operations);
};

const validateRequest = (value: IRequest): Promise<void> => {
  return validateOrReject(Request.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const createRequest = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateRequest(snapshot.data() as IRequest)
    .then(() => {
      return Promise.all([
        indexRequest(snapshot),
        queueCreateTriggers(snapshot),
        queueTimelineItemTriggers(snapshot as DocumentSnapshot<Request>, 'request'),
      ]);
    })
    .catch(errors => {
      console.error('Invalid Request Found: ', errors);
      return db
        .collection('requests')
        .doc(context.params.requestId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};

export const updateRequest = (change: Change<DocumentSnapshot>, context: EventContext) => {
  return validateRequest(change.after.data() as IRequest)
    .then(() => {
      return Promise.all([
        queueStatusUpdateTriggers(change),
        queueRatingUpdatedTriggers(change),
        indexRequest(change.after),
        queueTimelineItemTriggers(change.before as DocumentSnapshot<Request>, 'request', change.after as DocumentSnapshot<Request>),
      ]);
    })
    .catch(e => {
      console.error('Invalid Request Found: ', e);
      return db
        .collection('requests')
        .doc(context.params.requestId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};

export const deleteRequest = (snapshot: DocumentSnapshot) => removeRequestFromIndex(snapshot);

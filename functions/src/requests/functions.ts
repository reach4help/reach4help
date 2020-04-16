import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import * as moment from 'moment';

import { indexRequest, removeRequestFromIndex } from '../algolia';
import { IRequest, Request, RequestStatus } from '../models/requests';
import { UserFirestoreConverter } from '../models/users';
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

admin.initializeApp();
const db = admin.firestore();

const attemptToUpdateCavRating = async (operations: Promise<void>[], requestBefore: Request | null, requestAfter: Request | null) => {
  // We have a new CAV rating -  Update CAV rating average but only this time.
  if (requestBefore?.cavRating === null && requestAfter?.cavRating !== null && requestAfter?.cavUserRef) {
    const user = (await requestAfter.cavUserRef.withConverter(UserFirestoreConverter).get()).data();
    if (user) {
      const currentAverage = user.averageRating ? user.averageRating : 0;
      const cavRatingsReceived = user.cavRatingsReceived ? user.cavRatingsReceived + 1 : 1;
      // Calculate new average by summing all past averages and re-averaging with new value
      const newAverage = (currentAverage * (cavRatingsReceived - 1) + requestAfter.cavRating) / cavRatingsReceived;
      operations.push(
        requestAfter.cavUserRef.update({
          averageRating: newAverage,
          cavRatingsReceived,
        }),
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
      const user = (await requestAfter.cavUserRef.withConverter(UserFirestoreConverter).get()).data();
      if (user) {
        let average = user.averageRating ? user.averageRating : 0;
        const cavRatingsReceived = user.cavRatingsReceived ? user.cavRatingsReceived + 1 : 2;
        // Subtract the old rating from the average and reverse the average to what it was before the old rating was given
        average = (average * cavRatingsReceived - requestBefore.cavRating) / (cavRatingsReceived - 1);
        // Add the new rating to the average and calculate the new average
        const newAverage = (average * (cavRatingsReceived - 1) + requestAfter.cavRating) / cavRatingsReceived;
        operations.push(
          requestAfter.cavUserRef.update({
            averageRating: newAverage,
            cavRatingsReceived: cavRatingsReceived,
          }),
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
      requestAfter.cavUserRef.update({
        casesCompleted: admin.firestore.FieldValue.increment(1),
      }),
    );
  }
};

const attemptToUpdatePinRating = async (operations: Promise<void>[], requestBefore: Request | null, requestAfter: Request | null) => {
  // We have a new PIN rating -  Update PIN rating average but only this time.
  if (requestBefore?.pinRating === null && requestAfter?.pinRating !== null && requestAfter?.pinUserRef) {
    const user = (await requestAfter.pinUserRef.withConverter(UserFirestoreConverter).get()).data();
    if (user) {
      const currentAverage = user.averageRating ? user.averageRating : 0;
      const pinRatingsReceived = user.pinRatingsReceived ? user.pinRatingsReceived + 1 : 1;
      // Calculate new average by summing all past averages and re-averaging with new value
      const newAverage = (currentAverage * (pinRatingsReceived - 1) + requestAfter.pinRating) / pinRatingsReceived;
      operations.push(
        requestAfter.pinUserRef.update({
          averageRating: newAverage,
          pinRatingsReceived,
        }),
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
      const user = (await requestAfter.pinUserRef.withConverter(UserFirestoreConverter).get()).data();
      if (user) {
        let average = user.averageRating ? user.averageRating : 0;
        const pinRatingsReceived = user.pinRatingsReceived ? user.pinRatingsReceived : 2;
        // Subtract the old rating from the average and reverse the average to what it was before the old rating was given
        average = (average * pinRatingsReceived - requestBefore.pinRating) / (pinRatingsReceived - 1);
        // Add the new rating to the average and calculate the new average
        const newAverage = (average * (pinRatingsReceived - 1) + requestAfter.pinRating) / pinRatingsReceived;
        operations.push(
          requestAfter.pinUserRef.update({
            averageRating: newAverage,
          }),
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
      return Promise.all([indexRequest(snapshot), queueCreateTriggers(snapshot)]);
    })
    .catch(errors => {
      console.error('Invalid Request Found: ', errors);
      return db
        .collection('requests')
        .doc(context.params.requestId)
        .delete();
    });

};

export const updateRequest = (change: Change<DocumentSnapshot>, context: EventContext) => {
  return validateRequest(change.after.data() as IRequest)
    .then(() => {
      return Promise.all([queueStatusUpdateTriggers(change), queueRatingUpdatedTriggers(change), indexRequest(change.after)]);
    })
    .catch(errors => {
      console.error('Invalid Request Found: ', errors);
      return db
        .collection('requests')
        .doc(context.params.requestId)
        .delete();
    });

};

export const deleteRequest = (snapshot: DocumentSnapshot) => removeRequestFromIndex(snapshot);

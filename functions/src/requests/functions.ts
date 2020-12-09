import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import * as moment from 'moment';

import { indexGeneralRequests, indexUnauthenticatedRequest } from '../algolia';
import { db, fieldIncrementer } from '../app';
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
          casesCompleted: fieldIncrementer(1),
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
        requestsMade: fieldIncrementer(1),
      }),
    );
  }
  return Promise.all(operations);
};

const validateRequest = (value: IRequest): Promise<void> =>
  validateOrReject(Request.factory(value)).then(() => {
    return Promise.resolve();
  });

export const createRequest = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateRequest(snapshot.data() as IRequest)
    .then(() => {
      return Promise.all([queueCreateTriggers(snapshot), queueTimelineItemTriggers(snapshot as DocumentSnapshot<Request>, 'request')]);
    })
    .then(() => {
      const request = Request.factory(snapshot.data() as IRequest);
      return Promise.all([indexUnauthenticatedRequest(request, snapshot.ref.path), indexGeneralRequests(request, snapshot.ref.path)]);
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
        .collection('requests')
        .doc(context.params.requestId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    })
    .then(() => Promise.resolve());
};

export const updateRequest = (change: Change<DocumentSnapshot>, context: EventContext) => {
  return validateRequest(change.after.data() as IRequest)
    .then(() => {
      // Check if this was a delete user operation or not
      const requestBefore = change.before.exists ? (change.before.data() as Request) : null;
      const requestAfter = change.after.exists ? (change.after.data() as Request) : null;
      if (
        requestBefore &&
        requestAfter &&
        // No need to execute update trigger if the user's account was deleted
        ((requestBefore?.status === requestAfter?.status &&
          (requestAfter?.pinUserSnapshot.displayName === 'Deleted User' || requestAfter?.cavUserSnapshot?.displayName === 'Deleted User')) ||
          // No need to execute update trigger if the offer count and last offer or rejection count and last rejection is being updated
          (requestBefore.offerCount < requestAfter.offerCount &&
            requestBefore.lastOfferMade?.isEqual(requestAfter.lastOfferMade ? requestAfter.lastOfferMade : requestBefore.lastOfferMade)) ||
          (requestBefore.rejectionCount < requestAfter.rejectionCount &&
            requestBefore.lastRejectionMade?.isEqual(
              requestAfter.lastRejectionMade ? requestAfter.lastRejectionMade : requestBefore.lastRejectionMade,
            )))
      ) {
        return;
      }
      const updatedRequest = Request.factory(change.after.data() as IRequest);
      return (
        Promise.all([
          queueStatusUpdateTriggers(change),
          queueRatingUpdatedTriggers(change),
          queueTimelineItemTriggers(change.before as DocumentSnapshot<Request>, 'request', change.after as DocumentSnapshot<Request>),
        ])
          // Wait to ensure that other triggers don't fail to prevent stale data from being indexed in algolia
          .then(() =>
            Promise.all([
              indexUnauthenticatedRequest(updatedRequest, change.after.ref.path),
              indexGeneralRequests(updatedRequest, change.after.ref.path),
            ]),
          )
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

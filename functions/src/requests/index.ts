import { validate } from 'class-validator';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as moment from 'moment';

import { IRequest, Request, RequestStatus } from '../models/requests';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const queueStatusUpdateTriggers = (change: Change<DocumentSnapshot>, context: EventContext): Promise<void[]> => {
  const requestBefore = change.before.data() ? change.before.data() as Request : null;
  const requestAfter = change.after.data() ? change.after.data() as Request : null;

  const operations: Promise<void>[] = [];

  // A request has just been completed - Update CAV request completed count
  if (requestBefore?.status !== RequestStatus.completed && requestAfter?.status === RequestStatus.completed) {
    // TODO: Update CAV User Ref count for number of cases completed.
    operations.push(Promise.resolve());
  }

  // We have a new record -  Update PIN requests made count
  if (!requestBefore) {
    operations.push(Promise.resolve());
  }

  return Promise.all(operations);
};

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const queueRatingUpdatedTriggers = (change: Change<DocumentSnapshot>, context: EventContext): Promise<void[]> => {
  const requestBefore = change.before ? change.before.data() as Request : null;
  const requestAfter = change.after.data() ? change.after.data() as Request : null;

  const operations: Promise<void>[] = [];

  // We have a new rating -  Update CAV rating average but only this time.
  if (requestBefore?.rating === null && requestAfter?.rating !== null) {
    // TODO: Adjust the avg rating based on the new rating
    operations.push(Promise.resolve());
  } else if (requestBefore?.rating !== null && requestAfter?.rating !== null && requestBefore?.ratedAt && requestAfter?.ratedAt) {
    const previousRatedAt = moment(requestBefore.ratedAt.toDate());
    const fiveMinutesPastPreviousRatedAt = previousRatedAt.add(5, 'minutes');
    const currentRatedAt = moment(requestAfter.ratedAt.toDate());
    if (currentRatedAt.isSameOrBefore(fiveMinutesPastPreviousRatedAt)) {
      // TODO: Adjust the avg rating based on the old rating and the new rating
      operations.push(Promise.resolve());
    }
  }

  return Promise.all(operations);
};

const validateRequest = (value: IRequest): Promise<void> => {
  return validate(Request.factory(value))
    .then(() => {
      return Promise.resolve();
    });
};

export const triggerEventsWhenRequestIsCreated = functions.firestore.document('requests/{requestId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
    return validateRequest(snapshot.data() as IRequest)
      .catch(errors => {
        console.error('Invalid Request Found: ', errors);
        return firestore()
          .collection('requests').doc(context.params.requestId)
          .delete();
      });
  });

export const triggerEventsWhenRequestIsUpdated = functions.firestore.document('requests/{requestId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    return validateRequest(change.after.data() as IRequest)
      .catch(errors => {
        console.error('Invalid Request Found: ', errors);
        return firestore()
          .collection('requests').doc(context.params.requestId)
          .delete();
      })
      .then(() => {
        return Promise.all([
          queueStatusUpdateTriggers(change, context),
          queueRatingUpdatedTriggers(change, context),
        ]);
      });
  });

export * from '../offers';
export * from './priviledgedInformation';

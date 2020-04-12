import { validateOrReject } from 'class-validator';
import { firestore } from 'firebase';
import * as functions from 'firebase-functions';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as moment from 'moment';

import { IRequest, Request, RequestStatus } from '../models/requests';
import { UserFirestoreConverter } from '../models/users';

const queueStatusUpdateTriggers = async (
  change: Change<DocumentSnapshot>,
): Promise<void[]> => {
  const requestBefore = change.before.data()
    ? (change.before.data() as Request)
    : null;
  const requestAfter = change.after.data()
    ? (change.after.data() as Request)
    : null;

  const operations: Promise<void>[] = [];

  // A request has just been completed - Update CAV request completed count
  if (
    requestBefore?.status !== RequestStatus.completed &&
    requestAfter?.status === RequestStatus.completed &&
    requestAfter.cavUserRef
  ) {
    let user = UserFirestoreConverter.fromFirestore((await requestAfter.cavUserRef.get()));
    operations.push(requestAfter.cavUserRef.update({
      casesCompleted: user.casesCompleted + 1
    }));
  }

  // We have a new record -  Update PIN requests made count
  if (!requestBefore) {
    operations.push(Promise.resolve());
  }

  return Promise.all(operations);
};

const queueRatingUpdatedTriggers = async (
  change: Change<DocumentSnapshot>,
): Promise<void[]> => {
  const requestBefore = change.before
    ? (change.before.data() as Request)
    : null;
  const requestAfter = (change.after.data() as Request);

  const operations: Promise<void>[] = [];

  // We have a new PIN rating -  Update PIN rating average but only this time.
  if (requestBefore?.pinRating === null && requestAfter?.pinRating !== null) {
    let user = UserFirestoreConverter.fromFirestore(await requestAfter.pinUserRef.get());
    let average = user.averageRating ? user.averageRating : 0;
    //Pin Ratings Received will store the number of rating received for the pin so far
    let pinRatingsReceived = user.pinRatingsReceived ? user.pinRatingsReceived + 1 : 1;
    //Calculate New Average
    let newAverage = average + ((requestAfter.pinRating - average) / pinRatingsReceived)
    operations.push(requestAfter.pinUserRef.update({
      averageRating: newAverage,
      pinRatingsReceived
    }));
  } else if (
    requestBefore?.pinRating !== null &&
    requestAfter?.pinRating !== null &&
    requestBefore?.pinRatedAt &&
    requestAfter?.pinRatedAt
  ) {
    const previousRatedAt = moment(requestBefore.pinRatedAt.toDate());
    const fiveMinutesPastPreviousRatedAt = previousRatedAt.add(5, 'minutes');
    const currentRatedAt = moment(requestAfter.pinRatedAt.toDate());
    if (currentRatedAt.isSameOrBefore(fiveMinutesPastPreviousRatedAt)) {
      let user = UserFirestoreConverter.fromFirestore(await requestAfter.pinUserRef.get());
      let average = user.averageRating ? user.averageRating : 0;
      let pinRatingsReceived = user.pinRatingsReceived ? user.pinRatingsReceived : 2;
      //Substract the old rating from the average and reverse the average to what it was before the old rating was given
      average = (average * pinRatingsReceived - requestBefore.pinRating) / (pinRatingsReceived - 1)
      //Add the new rating to the average and calculate the new average
      let newAverage = average + ((requestAfter.pinRating - average) / pinRatingsReceived)
      operations.push(requestAfter.pinUserRef.update({
        averageRating: newAverage
      }));
    }
  }

  // We have a new CAV rating -  Update CAV rating average but only this time.
  if (requestBefore?.cavRating === null && requestAfter?.cavRating !== null && requestAfter.cavUserRef) {
    let user = UserFirestoreConverter.fromFirestore(await requestAfter.cavUserRef.get());
    let average = user.averageRating ? user.averageRating : 0;
    //Pin Ratings Received will store the number of rating received for the pin so far
    let cavRatingsReceived = user.cavRatingsReceived ? user.cavRatingsReceived + 1 : 1;
    //Calculate New Average
    let newAverage = average + ((requestAfter.cavRating - average) / cavRatingsReceived)
    operations.push(requestAfter.cavUserRef.update({
      averageRating: newAverage,
      cavRatingsReceived
    }));
  } else if (
    requestBefore?.cavRating !== null &&
    requestAfter?.cavRating !== null &&
    requestBefore?.cavRatedAt &&
    requestAfter?.cavRatedAt &&
    requestAfter.cavUserRef
  ) {
    const previousRatedAt = moment(requestBefore.cavRatedAt.toDate());
    const fiveMinutesPastPreviousRatedAt = previousRatedAt.add(5, 'minutes');
    const currentRatedAt = moment(requestAfter.cavRatedAt.toDate());
    if (currentRatedAt.isSameOrBefore(fiveMinutesPastPreviousRatedAt)) {
      let user = UserFirestoreConverter.fromFirestore(await requestAfter.cavUserRef.get());
      let average = user.averageRating ? user.averageRating : 0;
      let cavRatingsReceived = user.cavRatingsReceived ? user.cavRatingsReceived : 2;
      //Substract the old rating from the average and reverse the average to what it was before the old rating was given
      average = (average * cavRatingsReceived - requestBefore.cavRating) / (cavRatingsReceived - 1)
      //Add the new rating to the average and calculate the new average
      let newAverage = average + ((requestAfter.cavRating - average) / cavRatingsReceived)
      operations.push(requestAfter.cavUserRef.update({
        averageRating: newAverage
      }));
    }
  }

  return Promise.all(operations);
};

const queueCreateTriggers = async (
  snapshot: DocumentSnapshot,
): Promise<void[]> => {
  const operations: Promise<void>[] = [];
  let data = snapshot.data();
  if(data){
    let user = UserFirestoreConverter.fromFirestore(await data.pinUserRef.get());
    operations.push(snapshot.data()?.pinUserRef.update({
      requestsMade: user.requestsMade + 1
    }));
  }
  return Promise.all(operations);
}

const validateRequest = (value: IRequest): Promise<void> => {
  return validateOrReject(Request.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const triggerEventsWhenRequestIsCreated = functions.firestore
  .document('requests/{requestId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
    return validateRequest(snapshot.data() as IRequest)
    .catch(errors => {
      console.error('Invalid Request Found: ', errors);
      return firestore()
        .collection('requests')
        .doc(context.params.requestId)
        .delete();
    })
    .then(()=>{
      return Promise.all([queueCreateTriggers(snapshot)]);
    });
  });

export const triggerEventsWhenRequestIsUpdated = functions.firestore
  .document('requests/{requestId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    return validateRequest(change.after.data() as IRequest)
      .catch(errors => {
        console.error('Invalid Request Found: ', errors);
        return firestore()
          .collection('requests')
          .doc(context.params.requestId)
          .delete();
      })
      .then(() => {
        return Promise.all([
          queueStatusUpdateTriggers(change),
          queueRatingUpdatedTriggers(change),
        ]);
      });
  });

export * from './privilegedInformation';

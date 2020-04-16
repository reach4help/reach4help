import { validateOrReject } from 'class-validator';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';

import { IOffer, Offer, OfferStatus } from '../models/offers';
import DocumentSnapshot = firestore.DocumentSnapshot;

// Init the admin db
const db = firestore();

const queueStatusUpdateTriggers = (change: Change<DocumentSnapshot>): Promise<void[]> => {
  const offerBefore = change.before ? (change.before.data() as Offer) : null;
  const offerAfter = change.after.data()
    ? (change.after.data() as Offer)
    : null;

  const operations: Promise<void>[] = [];

  // A request has just been accepted -- Update request with new information (CAV, new status)
  if (
    offerBefore?.status !== OfferStatus.accepted &&
    offerAfter?.status === OfferStatus.accepted
  ) {
    /* TODO: Update the request with the current CAV as well as set it's status.
       This will enable the CAV to access the address of the request.
       const requestId = context.params.requestId;
       Use the id to find the request and update it's status and current CAV
     */
    operations.push(Promise.resolve());
  }

  return Promise.all(operations);
};

const validateOffer = (value: IOffer): Promise<void> => {
  return validateOrReject(Offer.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const triggerEventsWhenOfferIsCreated = functions.firestore
  .document('offers/{offerId}')
  .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
    return validateOffer(snapshot.data() as IOffer).catch(errors => {
      console.error('Invalid Offer Found: ', errors);
      return db
        .collection('offers')
        .doc(context.params.offerId)
        .delete();
    });
  });

export const triggerEventsWhenOfferIsUpdated = functions.firestore
  .document('offers/{offerId}')
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    return validateOffer(change.after.data() as IOffer)
      .catch(errors => {
        console.error('Invalid Offer Found: ', errors);
        return db
          .collection('offers')
          .doc(context.params.offerId)
          .delete();
      })
      .then(() => {
        return Promise.all([queueStatusUpdateTriggers(change)]);
      });
  });

import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { IOffer, Offer, OfferStatus } from '../models/offers';
import { RequestStatus } from '../models/requests';

admin.initializeApp();
const db = admin.firestore();

const queueStatusUpdateTriggers = async (
  change: Change<DocumentSnapshot>,
): Promise<void[]> => {
  const offerBefore = change.before.exists ? (change.before.data() as Offer) : null;
  const offerAfter = (change.after.data() as Offer);

  const operations: Promise<void>[] = [];

  // A request has just been accepted -- Update request with new information (CAV, new status)
  if (
    offerBefore?.status !== OfferStatus.accepted &&
    offerAfter?.status === OfferStatus.accepted
  ) {
    // Update Request with new status and CAV.
    operations.push(offerAfter.requestRef.update({
      cavUserRef: offerAfter.cavUserRef,
      status: RequestStatus.ongoing,
    }));

    // TODO: Notify CAV that they have been selected.

    // We won't update all offers because it's a waste of reads + writes + additional cloud function triggers
    // This is not done in a safe manner -- we should use transactions and batched writes, but also remembering
    // that batched writes are limited to 500 operations so we need to chunk these operations.
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

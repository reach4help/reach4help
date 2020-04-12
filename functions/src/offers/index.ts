import { validateOrReject } from 'class-validator';
import { firestore } from 'firebase';
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
    operations.push(offerAfter.requestRef.update({
      cavUserRef: offerAfter.cavUserRef,
      status: RequestStatus.ongoing
    }));
    let offersToReject = await db.collection('offers').where('requestRef', '==', offerAfter.requestRef).get();
    offersToReject.forEach(offer => {
      if(offer.ref !== change.after.ref){
        operations.push((async () => {
          await offer.ref.update({
            status: OfferStatus.rejected
          });
          Promise.resolve();
        })()); 
      }
    });
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
      return firestore()
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
        return firestore()
          .collection('offers')
          .doc(context.params.offerId)
          .delete();
      })
      .then(() => {
        return Promise.all([queueStatusUpdateTriggers(change)]);
      });
  });

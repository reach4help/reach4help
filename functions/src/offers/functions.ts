import { validateOrReject } from 'class-validator';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { firestore } from 'firebase-admin';

import * as dispatch from '../dispatch';
import { IOffer, Offer, OfferStatus } from '../models/offers';
import { IRequest, Request, RequestStatus } from '../models/requests';
import { auth, db } from '../app';
import { queueTimelineItemTriggers } from '../shared/triggerFunctions';

const queueStatusUpdateTriggers = async (change: Change<firestore.DocumentSnapshot>): Promise<void[]> => {
  const offerBefore = change.before.exists ? (change.before.data() as Offer) : null;
  const offerAfter = change.after.data() as Offer;

  const operations: Promise<void>[] = [];

  // A request has just been accepted -- Update request with new information (CAV, new status)
  if (offerBefore?.status !== OfferStatus.accepted && offerAfter?.status === OfferStatus.accepted) {
    // Update Request with new status and CAV.
    operations.push(
      offerAfter.requestRef.update({
        cavUserRef: offerAfter.cavUserRef,
        cavUserSnapshot: offerAfter.cavUserSnapshot,
        status: RequestStatus.ongoing,
      }),
    );

    const request = Request.factory((await offerAfter.requestRef.get()).data() as IRequest);

    operations.push(
      (async (): Promise<void> => {
        if (!auth) {
          return Promise.resolve(); // We need the user object to continue
        }

        const user = await auth?.getUser(offerAfter.cavUserRef.id);
        return dispatch.notifyService({
          entity: 'user',
          action: 'accepted',
          performedOnEntity: {
            entity: 'offer',
            id: change.after.id,
            message: offerAfter.message,
          },
          affectedEntity: {
            entity: 'request',
            id: offerAfter.requestRef.id,
            title: request ? request.title : '',
            description: request ? request.description : '',
            latLng: request ? `${request.latLng.latitude},${request.latLng.longitude}` : '',
            status: RequestStatus.ongoing,
            cavUid: offerAfter.cavUserRef.id,
            pinUid: offerAfter.pinUserRef.id,
          },
          actor: user.toJSON(),
          notify: ['actor', 'affectedEntity'],
        });
      })(),
    );
    // We could also send it to ${offerAfter.requestRef.id}_requestNotification and let everyone who responded
    // to the request know that the request accepted an offer. We will provide the offer ID as well. the clients
    // can either use the id of the offer accepted and compare it with their offer to determine if their offer was rejected or accepted

    // We won't update all offers because it's a waste of reads + writes + additional cloud function triggers
    // This is not done in a safe manner -- we should use transactions and batched writes, but also remembering
    // that batched writes are limited to 500 operations so we need to chunk these operations.
  }

  return Promise.all(operations);
};

const queueOfferCreationTriggers = async (snap: firestore.DocumentSnapshot): Promise<void[]> => {
  const offer = snap.data() as Offer;
  const operations: Promise<void>[] = [];

  if (offer) {
    const request = Request.factory((await offer.requestRef.get()).data() as IRequest);

    operations.push(
      (async (): Promise<void> => {
        if (!auth) {
          return Promise.resolve(); // We need the user object to continue
        }

        const user = await auth?.getUser(offer.cavUserRef.id);
        return dispatch.notifyService({
          entity: 'user',
          action: 'created',
          performedOnEntity: {
            entity: 'offer',
            id: snap.id,
            message: offer.message,
          },
          affectedEntity: {
            entity: 'request',
            id: offer.requestRef.id,
            title: request ? request.title : '',
            description: request ? request.description : '',
            latLng: request ? `${request.latLng.latitude},${request.latLng.longitude}` : '',
            status: RequestStatus.ongoing,
            cavUid: offer.cavUserRef.id,
            pinUid: offer.pinUserRef.id,
          },
          actor: user.toJSON(),
          notify: ['actor', 'affectedEntity'],
        });
      })(),
    );
  }

  return Promise.all(operations);
};

const validateOffer = (value: IOffer): Promise<void> => {
  return validateOrReject(Offer.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const offerCreate = (snapshot: firestore.DocumentSnapshot, context: EventContext) => {
  return validateOffer(snapshot.data() as IOffer)
    .then(() =>
      Promise.all([queueOfferCreationTriggers(snapshot), queueTimelineItemTriggers(snapshot as firestore.DocumentSnapshot<Offer>, 'offer')]),
    )
    .catch(errors => {
      console.error('Invalid Offer Found: ', errors);
      return db
        .collection('offers')
        .doc(context.params.offerId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};

export const offerUpdate = (change: Change<firestore.DocumentSnapshot>, context: EventContext) => {
  return validateOffer(change.after.data() as IOffer)
    .then(() => {
      return Promise.all([
        queueStatusUpdateTriggers(change),
        queueTimelineItemTriggers(change.before as firestore.DocumentSnapshot<Offer>, 'offer', change.after as firestore.DocumentSnapshot<Offer>),
      ]);
    })
    .catch(errors => {
      console.error('Invalid Offer Found: ', errors);
      return db
        .collection('offers')
        .doc(context.params.offerId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};

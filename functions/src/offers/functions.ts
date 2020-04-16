import { validateOrReject } from 'class-validator';
import * as admin from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { IOffer, Offer, OfferStatus } from '../models/offers';
import { RequestFirestoreConverter, RequestStatus } from '../models/requests';

admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

const queueStatusUpdateTriggers = async (change: Change<DocumentSnapshot>): Promise<void[]> => {
  const offerBefore = change.before.exists ? (change.before.data() as Offer) : null;
  const offerAfter = change.after.data() as Offer;

  const operations: Promise<void>[] = [];

  // A request has just been accepted -- Update request with new information (CAV, new status)
  if (offerBefore?.status !== OfferStatus.accepted && offerAfter?.status === OfferStatus.accepted) {
    // Update Request with new status and CAV.
    operations.push(
      offerAfter.requestRef.update({
        cavUserRef: offerAfter.cavUserRef,
        status: RequestStatus.ongoing,
      }),
    );

    const request = (await offerAfter.requestRef.withConverter(RequestFirestoreConverter).get()).data();

    operations.push(((): Promise<void> => {
      return messaging.send({
        data: {
          entity: 'offer',
          action: 'accepted',
          id: change.after.id,
          offer_message: offerAfter.message,
          request_id: offerAfter.requestRef.id,
          request_title: request ? request.title : '',
          request_description: request ? request.description : '',
          request_latLng: request ? `${request.latLng.latitude},${request.latLng.longitude}` : '',
          request_status: RequestStatus.ongoing,
        },
        topic: `${offerAfter.cavUserRef.id}_notifications`,
      })
        .then(result => Promise.resolve());
    })());

    operations.push(((): Promise<void> => {
      return messaging.send({
        data: {
          entity: 'request',
          action: 'offeraccepted',
          id: offerAfter.requestRef.id,
          offer_message: offerAfter.message,
          offer_id: change.after.id,
          offer_uid: offerAfter.cavUserRef.id,
          request_title: request ? request.title : '',
          request_description: request ? request.description : '',
          request_latLng: request ? `${request.latLng.latitude},${request.latLng.longitude}` : '',
          request_status: RequestStatus.ongoing,
        },
        topic: `${offerAfter.requestRef.id}_request_notifications`,
      })
        .then(result => Promise.resolve());
    })());

    //We could also send it to ${offerAfter.requestRef.id}_requestNotification and let everyone who responded 
    //to the request know that the request accepted an offer. We will provide the offer ID as well. the clients
    //can either use the id of the offer accepted and compare it with their offer to determine if their offer was rejected or accepted

    // We won't update all offers because it's a waste of reads + writes + additional cloud function triggers
    // This is not done in a safe manner -- we should use transactions and batched writes, but also remembering
    // that batched writes are limited to 500 operations so we need to chunk these operations.
  }

  return Promise.all(operations);
};

const queueOfferCreationTriggers = async (snap: DocumentSnapshot): Promise<void[]> => {

  const offer = snap.data() as Offer;
  const operations: Promise<void>[] = [];

  if (offer) {
    const request = (await offer.requestRef.withConverter(RequestFirestoreConverter).get()).data();

    operations.push(((): Promise<void> => {
      return messaging.send({
        data: {
          entity: 'request',
          action: 'offercreated',
          id: offer.requestRef.id,
          offer_message: offer.message,
          offer_id: snap.id,
          offer_uid: offer.cavUserRef.id,
          request_title: request ? request.title : '',
          request_description: request ? request.description : '',
          request_latLng: request ? `${request.latLng.latitude},${request.latLng.longitude}` : '',
          request_status: request ? request.status : RequestStatus.pending,
        },
        topic: `${offer.requestRef.id}_request_notifications`,
      })
        .then(result => Promise.resolve());
    })());

    operations.push(((): Promise<void> => {
      return messaging.send({
        data: {
          entity: 'request',
          action: 'offercreatd',
          id: offer.requestRef.id,
          offer_message: offer.message,
          offer_id: snap.id,
          request_title: request ? request.title : '',
          request_description: request ? request.description : '',
          request_latLng: request ? `${request.latLng.latitude},${request.latLng.longitude}` : '',
          request_status: RequestStatus.ongoing,
        },
        topic: `${request?.pinUserRef.id}_notifications`,
      })
        .then(result => Promise.resolve());
    })());

  }

  return Promise.all(operations);
};

const validateOffer = (value: IOffer): Promise<void> => {
  return validateOrReject(Offer.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const offerCreate = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateOffer(snapshot.data() as IOffer)
    .then(() => {
      return Promise.all([queueOfferCreationTriggers(snapshot)]);
    })
    .catch(errors => {
      console.error('Invalid Offer Found: ', errors);
      return db
        .collection('offers')
        .doc(context.params.offerId)
        .delete();
    });
};

export const offerUpdate = (change: Change<DocumentSnapshot>, context: EventContext) => {
  return validateOffer(change.after.data() as IOffer)
    .then(() => {
      return Promise.all([queueStatusUpdateTriggers(change)]);
    })
    .catch(errors => {
      console.error('Invalid Offer Found: ', errors);
      return db
        .collection('offers')
        .doc(context.params.offerId)
        .delete();
    });
};

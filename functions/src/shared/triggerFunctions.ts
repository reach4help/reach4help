import { firestore } from 'firebase-admin';

import { db } from '../app';
import { Offer, OfferStatus } from '../models/offers';
import { IRequest, Request, RequestStatus } from '../models/requests';
import { TimelineItemAction } from '../models/requests/timeline';
import { User } from '../models/users';

const statusToActionMapperRequest = {
  [RequestStatus.pending]: TimelineItemAction.CREATE_REQUEST,
  [RequestStatus.ongoing]: TimelineItemAction.ACCEPT_OFFER,
  [RequestStatus.completed]: TimelineItemAction.COMPLETE_REQUEST,
  [RequestStatus.cancelled]: TimelineItemAction.CANCEL_REQUEST,
  [RequestStatus.removed]: TimelineItemAction.REMOVE_REQUEST,
  [`${RequestStatus.ongoing}_rated`]: TimelineItemAction.RATE_PIN,
  [`${RequestStatus.completed}_rated`]: TimelineItemAction.RATE_CAV,
};

const statusToActionMapperOffer = {
  [OfferStatus.pending]: TimelineItemAction.CREATE_OFFER,
  [OfferStatus.accepted]: TimelineItemAction.ACCEPT_OFFER,
  [OfferStatus.cavDeclined]: TimelineItemAction.CAV_DECLINED,
  [OfferStatus.rejected]: TimelineItemAction.REJECT_OFFER,
};

export const queueTimelineItemTriggers = async (
  before: firestore.DocumentSnapshot<Offer | Request>,
  type: 'offer' | 'request',
  after?: firestore.DocumentSnapshot<Offer | Request>,
): Promise<void> => {
  let entity: any;
  let snap: any;

  if (after) {
    entity = after.data();
    snap = after;
  } else {
    entity = before.data();
    snap = before;
  }

  if (entity) {
    let user: User | undefined;
    let userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | undefined;

    if (entity instanceof Offer || type === 'offer') {
      console.log('an offer alright');
      console.log('entity.status: ', entity.status);
      if (entity.status === OfferStatus.pending || entity.status === OfferStatus.cavDeclined) {
        console.log('entity.cavUserSnapshot: ', entity.cavUserSnapshot);
        user = entity.cavUserSnapshot;
        userRef = entity.cavUserRef;
      } else if (entity.status === OfferStatus.accepted || entity.status === OfferStatus.rejected) {
        const tempRequest = Request.factory((await entity.requestRef.get()).data() as IRequest);
        console.log('tempRequest: ', tempRequest);
        if (tempRequest) {
          console.log('tempRequest.pinUserSnampshot: ', tempRequest.pinUserSnapshot);
          user = tempRequest.pinUserSnapshot;
          userRef = tempRequest.pinUserRef;
        }
      } else {
        console.log('the most unthinkable');
        user = undefined;
        userRef = undefined;
      }
    } else if (entity.status === RequestStatus.pending || entity.status === RequestStatus.removed || entity.status === RequestStatus.ongoing) {
      user = entity.pinUserSnapshot;
      userRef = entity.pinUserRef;
    } else if (entity.status === RequestStatus.completed || entity.status === RequestStatus.cancelled) {
      if (entity.cavUserSnapshot && entity.cavUserRef) {
        user = entity.cavUserSnapshot;
        userRef = entity.cavUserRef;
      }
    }

    console.log('user: ', user);
    console.log('userRef: ', userRef);
    console.log('entity: ', entity);

    if (entity.status === RequestStatus.pending && entity.pinRating) {
      await db
        .collection('requests')
        .doc(type === 'offer' ? entity.requestRef.id : snap.id)
        .collection('timeline')
        .doc()
        .set({
          actorRef: userRef,
          offerRef: null,
          requestRef: db.collection('requests').doc(snap.id),
          actorSnapshot: user,
          offerSnapshot: null,
          requestSnapshot: entity,
          action: statusToActionMapperRequest[`${RequestStatus.pending}_rated`],
          createdAt: new Date(),
        });
      return Promise.resolve();
    }

    if (entity.status === RequestStatus.completed && entity.cavRating) {
      await db
        .collection('requests')
        .doc(type === 'offer' ? entity.requestRef.id : snap.id)
        .collection('timeline')
        .doc()
        .set({
          actorRef: userRef,
          offerRef: null,
          requestRef: db.collection('requests').doc(snap.id),
          actorSnapshot: user,
          offerSnapshot: null,
          requestSnapshot: entity,
          action: statusToActionMapperRequest[RequestStatus.completed],
          createdAt: new Date(),
        });
      await db
        .collection('requests')
        .doc(type === 'offer' ? entity.requestRef.id : snap.id)
        .collection('timeline')
        .doc()
        .set({
          actorRef: userRef,
          offerRef: null,
          requestRef: db.collection('requests').doc(snap.id),
          actorSnapshot: user,
          offerSnapshot: null,
          requestSnapshot: entity,
          action: statusToActionMapperRequest[`${RequestStatus.completed}_rated`],
          createdAt: new Date(),
        });
      return Promise.resolve();
    }

    if (snap) {
      await db
        .collection('requests')
        .doc(type === 'offer' ? entity.requestRef.id : snap.id)
        .collection('timeline')
        .doc()
        .set({
          actorRef: userRef,
          offerRef: entity instanceof Offer || type === 'offer' ? db.collection('offers').doc(snap.id) : null,
          requestRef: entity instanceof Offer || type === 'offer' ? entity.requestRef : db.collection('requests').doc(snap.id),
          actorSnapshot: user,
          offerSnapshot: entity instanceof Offer || type === 'offer' ? entity : null,
          requestSnapshot: entity instanceof Offer || type === 'offer' ? (await entity.requestRef.get()).data() : entity,
          action:
            entity instanceof Offer || type === 'offer'
              ? statusToActionMapperOffer[entity.status as OfferStatus]
              : statusToActionMapperRequest[entity.status as RequestStatus],
          createdAt: new Date(),
        });
    }
  }
};

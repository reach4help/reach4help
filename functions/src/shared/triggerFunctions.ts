import { firestore } from 'firebase-admin';

import { db } from '../app';
import { Offer, OfferStatus } from '../models/offers';
import { Request, RequestFirestoreConverter, RequestStatus } from '../models/requests';
import { TimelineItemAction } from '../models/requests/timeline';
import { User } from '../models/users';

const statusToActionMapperRequest = {
  [RequestStatus.pending]: TimelineItemAction.CREATE_REQUEST,
  [RequestStatus.ongoing]: TimelineItemAction.ACCEPT_OFFER,
  [RequestStatus.completed]: TimelineItemAction.COMPLETE_REQUEST,
  [RequestStatus.cancelled]: TimelineItemAction.CANCEL_REQUEST,
  [RequestStatus.removed]: TimelineItemAction.REMOVE_REQUEST,
};

const statusToActionMapperOffer = {
  [OfferStatus.pending]: TimelineItemAction.CREATE_OFFER,
  [OfferStatus.accepted]: TimelineItemAction.ACCEPT_OFFER,
  [OfferStatus.cavDeclined]: TimelineItemAction.CAV_DECLINED,
  [OfferStatus.rejected]: TimelineItemAction.REJECT_OFFER,
};

export const queueTimelineItemTriggers = async (
  before: firestore.DocumentSnapshot<Offer | Request>,
  after?: firestore.DocumentSnapshot<Offer | Request>,
): Promise<void> => {
  let entity: Offer | Request | undefined;
  let snap: firestore.DocumentSnapshot<Offer | Request> | undefined;

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

    if (entity instanceof Offer) {
      if (entity.status === OfferStatus.pending || entity.status === OfferStatus.cavDeclined) {
        user = entity.cavUserSnapshot;
        userRef = entity.cavUserRef;
      } else if (entity.status === OfferStatus.accepted || entity.status === OfferStatus.rejected) {
        const tempRequest = (await entity.requestRef.withConverter(RequestFirestoreConverter).get()).data();
        if (tempRequest) {
          user = tempRequest.pinUserSnapshot;
          userRef = tempRequest.pinUserRef;
        }
      } else {
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

    if (snap) {
      await db
        .collection('requests')
        .doc(snap.id)
        .collection('timeline')
        .doc()
        .set({
          actorRef: userRef,
          offerRef: entity instanceof Offer ? snap.id : null,
          requestRef: entity instanceof Offer ? entity.requestRef : snap.id,
          actorSnapshot: user,
          offerSnapshot: entity instanceof Offer ? entity : null,
          requestSnapshot: entity instanceof Offer ? await entity.requestRef.withConverter(RequestFirestoreConverter).get() : entity,
          action: entity instanceof Offer ? statusToActionMapperOffer[entity.status] : statusToActionMapperRequest[entity.status],
          createdAt: new Date(),
        });
    }
  }
};

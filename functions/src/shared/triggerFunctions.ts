import { firestore } from "firebase-admin";

import { db } from "../app";
import { OfferStatus, Offer } from "../models/offers";
import { RequestFirestoreConverter, RequestStatus, Request } from "../models/requests";
import { TimelineItemAction } from "../models/requests/timeline";


const statusToActionMapper = {
    [OfferStatus.pending]: TimelineItemAction.CREATE_OFFER,
    [OfferStatus.accepted]: TimelineItemAction.ACCEPT_OFFER,
    [OfferStatus.cavDeclined]: '',
    [OfferStatus.rejected]: TimelineItemAction.REJECT_OFFER,
    [RequestStatus.pending]: TimelineItemAction.CREATE_REQUEST,
    [RequestStatus.ongoing]: TimelineItemAction.ACCEPT_OFFER,
    [RequestStatus.completed]: TimelineItemAction.COMPLETE_REQUEST,
    [RequestStatus.cancelled]: TimelineItemAction.CANCEL_REQUEST,
    [RequestStatus.removed]: TimelineItemAction.REMOVE_REQUEST, 
}
  
export const queueTimelineItemTriggers = async (before: firestore.DocumentSnapshot<Offer | Request>, user?: string,  after? : firestore.DocumentSnapshot<Offer | Request>): Promise<void> => {

    if (user) {
        const userObj = await db.collection('users').doc(user).get();
        let entity: Offer | Request | undefined = undefined;
        let snap: firestore.DocumentSnapshot<Offer | Request> | undefined = undefined;

        if (after) {
            entity = after.data();
            snap = after;
        } else {
            entity = before.data();
            snap = before;
        }

        if (entity && snap) {
            await db.collection('requests').doc(snap.id).collection('timeline').doc().set({
                actorRef: db.collection('users').doc(user),
                offerRef: entity instanceof Offer ? snap.id : null,
                requestRef: entity instanceof Offer ? entity.requestRef : snap.id,
                actorSnapshot: userObj,
                offerSnapshot: entity instanceof Offer ? entity : null,
                requestSnapshot: entity instanceof Offer ? await entity.requestRef.withConverter(RequestFirestoreConverter).get() : entity,
                action: statusToActionMapper[entity.status],
                createdAt: new Date(),
            });
        }
    }
}
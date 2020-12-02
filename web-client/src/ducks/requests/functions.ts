// import firebase from 'firebase';
// import { string } from 'prop-types';
import { firestore, functions } from 'src/firebase';
import { IOffer, Offer } from 'src/models/offers';
// TODO: (es) import { IOfferWithLocation } from 'src/models/offers/offersWithLocation';
import {
  IRequest,
  Request,
  RequestFirestoreConverter,
  // TODO: (es) RequestStatus,
} from 'src/models/requests';
import {
  AbstractRequestStatus,
  IRequestWithOffersAndTimelineItems,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
import {
  ITimelineItem,
  TimelineItemAction,
  TimelineItemFirestoreConverter,
} from 'src/models/requests/timeline';
// TODO: (es) import { PrivilegedUserInformation, IPrivilegedUserInformation } from 'src/models/users/privilegedInformation';

import { IgetMyPosts, IgetRequestPosts } from './types';

export const createUserRequest = async ({
  requestPayload,
}: {
  requestPayload: Request;
}) =>
  firestore
    .collection('requests')
    .doc()
    .withConverter(RequestFirestoreConverter)
    .set(requestPayload);

export const setUserRequest = async ({
  requestPayload,
  requestId,
}: {
  requestPayload: Request;
  requestId: string;
}) =>
  firestore
    .collection('requests')
    .doc(requestId)
    .withConverter(RequestFirestoreConverter)
    .set(requestPayload);

export const getMyCavRequestPosts = async ({ lat, lng }: IgetRequestPosts) =>
  functions.httpsCallable('https-api-requests-getRequests')({
    lat,
    lng,
    radius: 5,
    status: AbstractRequestStatus.accepted,
  });

export const getFindPosts = async ({ lat, lng }: IgetRequestPosts) =>
  functions.httpsCallable('https-api-requests-getRequests')({
    lat,
    lng,
    radius: 5,
    status: AbstractRequestStatus.pending,
  });

const getRequest = async (requestId: string): Promise<IRequest> => {
  const request = Request.factory(
    (
      await firestore
        .collection('requests')
        .doc(requestId)
        .get()
    ).data() as IRequest,
  );
  return request;
};

const getOffersForRequest = async (requestId: string) => {
  const result = await firestore
    .collection('requests')
    .doc(requestId)
    .collection('offers')
    .get();

  const offers: Record<string, IOffer> = {};

  for (const doc of result.docs) {
    const offer = Offer.factory(doc.data() as IOffer);
    // TODO: (es) const cavPrivilegedInfo =
    //   offer.cavUserSnapshot.username === 'deleteduser'
    //     ? null
    //     : PrivilegedUserInformation.factory(
    //         /* eslint-disable no-await-in-loop */
    //         (
    //           await offer.cavUserRef
    //             .collection('privilegedInformation')
    //             .doc(offer.cavUserRef.id)
    //             .get()
    //         ).data() as IPrivilegedUserInformation,
    //       );

    offers[doc.id] = {
      ...offer.toObject(),
      // address: cavPrivilegedInfo && cavPrivilegedInfo.addresses ? cavPrivilegedInfo.addresses.default : deletedAddress,
    } as IOffer;
  }
  return offers;
};

const getTimelineItemsForRequest = async (
  requestId: string,
): Promise<ITimelineItem[]> => {
  const timelinesResult = await firestore
    .collection('requests')
    .doc(requestId)
    .collection('timeline')
    // TODO: (es)
    .where('action', 'in', [
      TimelineItemAction.ACCEPT_OFFER,
      TimelineItemAction.CREATE_REQUEST,
      TimelineItemAction.CREATE_OFFER,
      TimelineItemAction.CAV_DECLINED,
      TimelineItemAction.REJECT_OFFER,
      TimelineItemAction.REMOVE_REQUEST,
    ])
    .withConverter(TimelineItemFirestoreConverter)
    .get();
  const timeline: ITimelineItem[] = [];
  for (const doc of timelinesResult.docs) {
    timeline.push(doc.data() as ITimelineItem);
  }
  return timeline;
};

export const getPostWithOffersAndTimelineItems = async (requestId: string) => {
  const request = await getRequest(requestId);
  const results = await Promise.all([
    getOffersForRequest(requestId),
    getTimelineItemsForRequest(requestId),
  ]);

  const requestWithOffers = RequestWithOffersAndTimeline.factory({
    ...(request.toObject() as IRequest),
    offers: results[0],
    timeline: results[1],
  } as IRequestWithOffersAndTimelineItems);

  return requestWithOffers;
};

export const getMyPinReqestPosts = async ({ userRef, status }: IgetMyPosts) => {
  let dataRequests;
  let initialQuery = firestore
    .collection('requests')
    .where('pinUserRef', '==', userRef);
  if (status) {
    initialQuery = initialQuery.where('status', '==', status);
  }
  // TODO: (es) coud I have dataRequests = await
  await initialQuery
    .withConverter(RequestFirestoreConverter)
    .get()
    .then(snapshot => {
      dataRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        // TODO:(es) Convert to request here?
        ...doc.data(),
      }));
    });
  return { data: { data: dataRequests, success: true } };
};

import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { db } from '../../../app';
import { IOffer, Offer, OfferStatus } from '../../../models/offers';
import { IOfferWithLocation } from '../../../models/offers/offersWithLocation';
import { IRequest, Request, RequestStatus } from '../../../models/requests';
import { ITimelineItem, TimelineItem, TimelineItemAction } from '../../../models/requests/timeline';
import { ApplicationPreference, IUser, User } from '../../../models/users';
import {
  AbstractRequestStatus,
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from '../../../models/requests/RequestWithOffersAndTimeline';
import { IPrivilegedUserInformation, PrivilegedUserInformation } from '../../../models/users/privilegedInformation';

const RADIUS = 5; // In Miles

const getOffersForRequestWithLocation = async (requestRef: firestore.DocumentReference) => {
  const result = await db
    .collection('offers')
    .where('requestRef', '==', requestRef)
    .get();

  console.log('getting offers for request: ', requestRef.path);

  const offersWithLocation: Record<string, IOfferWithLocation> = {};

  for (const doc of result.docs) {
    console.log('doc.id, doc.data: ', doc.id, JSON.stringify(doc.data()));
    const offer = Offer.factory(doc.data() as IOffer);
    const cavPrivilegedInfo = PrivilegedUserInformation.factory(
      /* eslint-disable no-await-in-loop */
      (
        await offer.cavUserRef
          .collection('privilegedInformation')
          .doc(offer.cavUserRef.id)
          .get()
      ).data() as IPrivilegedUserInformation,
    );

    offersWithLocation[doc.id] = {
      ...offer.toObject(),
      address: cavPrivilegedInfo.address,
    } as IOfferWithLocation;
  }
  return offersWithLocation;
};

const getTimelineForRequest = async (requestRef: firestore.DocumentReference, userRef: firestore.DocumentReference): Promise<ITimelineItem[]> => {
  const request = Request.factory((await requestRef.get()).data() as IRequest);
  if (!((request.cavUserRef && request.cavUserRef.id === userRef.id) || request.pinUserRef.id === userRef.id)) {
    const timelinesResult = await requestRef
      .collection('timeline')
      .where('action', 'in', [
        TimelineItemAction.CREATE_REQUEST,
        TimelineItemAction.CREATE_OFFER,
        TimelineItemAction.REJECT_OFFER,
        TimelineItemAction.REMOVE_REQUEST,
      ])
      .get();
    const timeline: ITimelineItem[] = [];
    for (const doc of timelinesResult.docs) {
      timeline.push(doc.data() as ITimelineItem);
    }
    return timeline;
    // eslint-disable-next-line no-else-return
  } else {
    const timelinesResult = await requestRef.collection('timeline').get();
    const timeline: ITimelineItem[] = [];
    for (const doc of timelinesResult.docs) {
      timeline.push(doc.data() as ITimelineItem);
    }
    return timeline;
  }
};

const getRequestsWithinDistance = async (lat: number, lng: number, radius: number, status: RequestStatus) => {
  // ~1 mile of lat and lon in degrees
  const unitLat = 0.0144927536231884;
  const unitLng = 0.0181818181818182;

  const lowerLat = lat - unitLat * radius;
  const lowerLng = lng - unitLng * radius;

  const greaterLat = lat + unitLat * radius;
  const greaterLng = lng + unitLng * radius;

  const lesserGeopoint = new firestore.GeoPoint(lowerLat, lowerLng);
  const greateGeopoint = new firestore.GeoPoint(greaterLat, greaterLng);

  return db
    .collection('requests')
    .where('status', '==', status)
    .where('latLng', '>=', lesserGeopoint)
    .where('latLng', '<=', greateGeopoint)
    .get();
};

const getPendingRequestsWithOffers = async (
  userRef: firestore.DocumentReference,
  userType: ApplicationPreference,
  lat: number,
  lng: number,
  radius: number = RADIUS,
) => {
  const requestWithOffers: Record<string, RequestWithOffersAndTimeline> = {};
  if (userType === ApplicationPreference.cav) {
    const requests = await getRequestsWithinDistance(lat, lng, radius, RequestStatus.pending);
    for (const doc of requests.docs) {
      const request = Request.factory(doc.data() as IRequest);
      if (request.pinUserRef.id === userRef.id) {
        // eslint-disable-next-line no-continue
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const results = await Promise.all([getOffersForRequestWithLocation(doc.ref), getTimelineForRequest(doc.ref, userRef)]);
      let shouldPush = true;
      for (const timelineDoc of results[1]) {
        const timelineInstance = TimelineItem.factory(timelineDoc);
        if (timelineInstance.action === TimelineItemAction.CREATE_OFFER && timelineInstance.actorRef.id === userRef.id) {
          shouldPush = false;
          break;
        }
      }
      if (shouldPush) {
        requestWithOffers[doc.id] = RequestWithOffersAndTimeline.factory({
          ...(request.toObject() as IRequest),
          offers: results[0],
          timeline: results[1],
        } as IRequestWithOffersAndTimeline);
      }
    }
  } else {
    console.log('a pin is looking for requests with the status as: ', RequestStatus.pending);
    console.log("the pin's ref path is: ", userRef.path);
    const requests = await db
      .collection('requests')
      .where('status', '==', RequestStatus.pending)
      .where('pinUserRef', '==', userRef)
      .get();
    for (const doc of requests.docs) {
      console.log('doc.id: ', doc.id);
      console.log('doc.data: ', JSON.stringify(doc.data()));
      const request = Request.factory(doc.data() as IRequest);
      // eslint-disable-next-line no-await-in-loop
      const timeline = await getTimelineForRequest(doc.ref, userRef);
      const mapping: Record<string, boolean> = {};
      for (const timelineDoc of timeline) {
        const timelineInstance = TimelineItem.factory(timelineDoc);
        if (
          timelineInstance.action === TimelineItemAction.CREATE_OFFER &&
          timelineInstance.offerRef &&
          timelineInstance.offerSnapshot?.status === OfferStatus.pending
        ) {
          if (mapping[timelineInstance.offerRef.id] !== false) {
            mapping[timelineInstance.offerRef.id] = true;
          }
          // break;
        }
        if (timelineInstance.action === TimelineItemAction.REJECT_OFFER && timelineInstance.offerRef) {
          mapping[timelineInstance.offerRef.id] = false;
        }
      }
      let num = 0;
      for (const k in mapping) {
        if (mapping[k]) {
          num += 1;
        }
      }
      if (num === 0) {
        requestWithOffers[doc.id] = RequestWithOffersAndTimeline.factory({
          ...(request.toObject() as IRequest),
          offers: {},
          timeline,
        } as IRequestWithOffersAndTimeline);
      }
    }
  }
  return requestWithOffers;
};

const getOngoingRequests = async (userRef: firestore.DocumentReference, userType: ApplicationPreference, finished = false) => {
  const userCondition = userType === ApplicationPreference.cav ? 'cavUserRef' : 'pinUserRef';
  const requests = await db
    .collection('requests')
    .where(userCondition, '==', userRef)
    .where('status', '==', RequestStatus.ongoing)
    .get();
  const requestWithOffers: Record<string, RequestWithOffersAndTimeline> = {};
  for (const doc of requests.docs) {
    const request = Request.factory(doc.data() as IRequest);
    if (!finished && request.pinRating && request.pinRatedAt) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (finished && !(request.pinRating && request.pinRatedAt)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    // eslint-disable-next-line no-await-in-loop
    const timeline = await getTimelineForRequest(doc.ref, userRef);
    requestWithOffers[doc.id] = RequestWithOffersAndTimeline.factory({
      ...(request.toObject() as IRequest),
      offers: {},
      timeline,
    } as IRequestWithOffersAndTimeline);
  }
  return requestWithOffers;
};

const getAcceptedRequests = async (userRef: firestore.DocumentReference, userType: ApplicationPreference) => {
  if (userType === ApplicationPreference.cav) {
    const offersMadeResult = await db
      .collection('offers')
      .where('cavUserRef', '==', userRef)
      .where('status', '==', OfferStatus.pending)
      .get();
    const requestsWithTimeline: Record<string, RequestWithOffersAndTimeline> = {};
    for (const doc of offersMadeResult.docs) {
      const offer = Offer.factory(doc.data() as IOffer);
      const request = Request.factory((await offer.requestRef.get()).data() as IRequest);
      if (request.status === RequestStatus.pending) {
        const timeline = await getTimelineForRequest(offer.requestRef, userRef);
        requestsWithTimeline[doc.id] = RequestWithOffersAndTimeline.factory({
          ...(request.toObject() as IRequest),
          offers: {},
          timeline,
        });
      }
    }
    return requestsWithTimeline;
  }
  const requestsMadeResult = await db
    .collection('requests')
    .where('pinUserRef', '==', userRef)
    .where('status', '==', RequestStatus.pending)
    .get();
  console.log('getting accepted requests along with offers as a PIN');
  const requestsWithTimelineAndOffers: Record<string, RequestWithOffersAndTimeline> = {};
  for (const doc of requestsMadeResult.docs) {
    const request = Request.factory(doc.data() as IRequest);
    const results = await Promise.all([getOffersForRequestWithLocation(doc.ref), getTimelineForRequest(doc.ref, userRef)]);
    console.log('doc.id, results obtained: ', doc.id, JSON.stringify(results));
    const mapping: Record<string, boolean> = {};
    for (const timelineDoc of results[1]) {
      const timelineInstance = TimelineItem.factory(timelineDoc);
      if (
        timelineInstance.action === TimelineItemAction.CREATE_OFFER &&
        timelineInstance.offerRef &&
        timelineInstance.offerSnapshot?.status === OfferStatus.pending
      ) {
        if (mapping[timelineInstance.offerRef.id] !== false) {
          mapping[timelineInstance.offerRef.id] = true;
        }
      }
      if (timelineInstance.action === TimelineItemAction.REJECT_OFFER && timelineInstance.offerRef) {
        mapping[timelineInstance.offerRef.id] = false;
      }
    }
    let num = 0;
    for (const k in mapping) {
      if (mapping[k]) {
        num += 1;
      }
    }
    if (num > 0) {
      requestsWithTimelineAndOffers[doc.id] = RequestWithOffersAndTimeline.factory({
        ...(request.toObject() as IRequest),
        offers: results[0],
        timeline: results[1],
      });
    }
  }
  return requestsWithTimelineAndOffers;
};

const getArchivedRequestsWithTimeline = async (userRef: firestore.DocumentReference, userType: ApplicationPreference) => {
  const userCondition = userType === ApplicationPreference.cav ? 'cavUserRef' : 'pinUserRef';
  const requests = await db
    .collection('requests')
    .where(userCondition, '==', userRef)
    .where('status', 'in', [RequestStatus.completed, RequestStatus.cancelled, RequestStatus.removed])
    .get();
  const requestsWithTimelines: Record<string, RequestWithOffersAndTimeline> = {};
  for (const doc of requests.docs) {
    const request = Request.factory(doc.data() as IRequest);
    // eslint-disable-next-line no-await-in-loop
    const timeline = await getTimelineForRequest(doc.ref, userRef);
    requestsWithTimelines[doc.id] = RequestWithOffersAndTimeline.factory({
      ...(request.toObject() as IRequest),
      offers: {},
      timeline,
    } as IRequestWithOffersAndTimeline);
  }
  return requestsWithTimelines;
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const getRequests = functions.https.onCall(async (data, context) => {
  const { lat, lng, status, radius } = data;
  const userId = context.auth?.uid;

  if (userId) {
    const userRef = db.collection('users').doc(userId);
    const user = User.factory((await userRef.get()).data() as IUser);

    if (user && user.applicationPreference) {
      switch (status) {
        case AbstractRequestStatus.pending: {
          const response = await getPendingRequestsWithOffers(userRef, user.applicationPreference, lat, lng, radius);
          const dataToSend = Object.keys(response).reduce(
            (acc: Record<string, IRequestWithOffersAndTimeline>, key: string) => ({
              ...acc,
              [key]: response[key].toObject() as IRequestWithOffersAndTimeline,
            }),
            {},
          );
          console.log('dataToSend: ', dataToSend);
          console.log('serialized data to send: ', JSON.stringify(dataToSend));
          return {
            success: true,
            data: dataToSend,
          };
        }
        case AbstractRequestStatus.accepted: {
          const response = await getAcceptedRequests(userRef, user.applicationPreference);
          const dataToSend = Object.keys(response).reduce(
            (acc: Record<string, IRequestWithOffersAndTimeline>, key: string) => ({
              ...acc,
              [key]: response[key].toObject() as IRequestWithOffersAndTimeline,
            }),
            {},
          );
          return {
            success: true,
            data: dataToSend,
          };
        }
        case AbstractRequestStatus.ongoing: {
          const response = await getOngoingRequests(userRef, user.applicationPreference);
          const dataToSend = Object.keys(response).reduce(
            (acc: Record<string, IRequestWithOffersAndTimeline>, key: string) => ({
              ...acc,
              [key]: response[key].toObject() as IRequestWithOffersAndTimeline,
            }),
            {},
          );
          return {
            success: true,
            data: dataToSend,
          };
        }
        case AbstractRequestStatus.finished: {
          const response = await getOngoingRequests(userRef, user.applicationPreference, true);
          const dataToSend = Object.keys(response).reduce(
            (acc: Record<string, IRequestWithOffersAndTimeline>, key: string) => ({
              ...acc,
              [key]: response[key].toObject() as IRequestWithOffersAndTimeline,
            }),
            {},
          );
          return {
            success: true,
            data: dataToSend,
          };
        }
        case AbstractRequestStatus.archived: {
          const response = await getArchivedRequestsWithTimeline(userRef, user.applicationPreference);
          const dataToSend = Object.keys(response).reduce(
            (acc: Record<string, IRequestWithOffersAndTimeline>, key: string) => ({
              ...acc,
              [key]: response[key].toObject() as IRequestWithOffersAndTimeline,
            }),
            {},
          );
          return {
            success: true,
            data: dataToSend,
          };
        }
        default:
          throw new functions.https.HttpsError('out-of-range', "Request Status isn't valid");
      }
    } else {
      throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
    }
  } else {
    throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
  }
});

import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { db } from '../../../app';
import { IOffer, Offer } from '../../../models/offers';
import { IOfferWithLocation, OfferWithLocation } from '../../../models/offers/offersWithLocation';
import { IRequest, Request, RequestStatus } from '../../../models/requests';
import { ApplicationPreference, IUser, User } from '../../../models/users';
import { IPrivilegedUserInformation, PrivilegedUserInformation } from '../../../models/users/privilegedInformation';
import { ITimelineItem, TimelineItem, TimelineItemAction } from '../../../models/requests/timeline';
import { IRequestWithOffersAndTimeline, RequestWithOffersAndTimeline } from '../../../models/requests/RequestWithOffersAndTimeline';

const RADIUS = 5; // In Miles

const getOffersForRequestWithLocation = async (requestRef: firestore.DocumentReference) => {
  const result = await db
    .collection('offers')
    .where('requestRef', '==', requestRef)
    .get();

  const offersWithLocation: OfferWithLocation[] = [];

  for (const doc of result.docs) {
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
    const offerWithLocation = OfferWithLocation.factory({
      ...offer.toObject(),
      address: cavPrivilegedInfo.address,
    } as IOfferWithLocation);
    offersWithLocation.push(offerWithLocation);
  }
  return offersWithLocation;
};

const getTimelineForRequest = async (requestRef: firestore.DocumentReference, userRef: firestore.DocumentReference): Promise<TimelineItem[]> => {
  const request = Request.factory((await requestRef.get()).data() as IRequest);
  if (request.cavUserRef !== userRef && request.pinUserRef !== userRef) {
    const timelinesResult = await requestRef
      .collection('timeline')
      .where('action', 'in', [
        TimelineItemAction.CREATE_REQUEST,
        TimelineItemAction.CREATE_OFFER,
        TimelineItemAction.REJECT_OFFER,
        TimelineItemAction.REMOVE_REQUEST,
      ])
      .get();
    const timeline: TimelineItem[] = [];
    for (const doc of timelinesResult.docs) {
      timeline.push(TimelineItem.factory(doc.data() as ITimelineItem));
    }
    return timeline;
    // eslint-disable-next-line no-else-return
  } else {
    const timelinesResult = await requestRef.collection('timeline').get();
    const timeline: TimelineItem[] = [];
    for (const doc of timelinesResult.docs) {
      timeline.push(TimelineItem.factory(doc.data() as ITimelineItem));
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

const getPendingRequestsWithOffers = async (lat: number, lng: number, userRef: firestore.DocumentReference, userType: ApplicationPreference) => {
  const requests = await getRequestsWithinDistance(lat, lng, RADIUS, RequestStatus.pending);
  const requestWithOffers: RequestWithOffersAndTimeline[] = [];
  for (const doc of requests.docs) {
    const request = Request.factory(doc.data() as IRequest);
    if (userType === ApplicationPreference.pin) {
      // eslint-disable-next-line no-await-in-loop
      const results = await Promise.all([getOffersForRequestWithLocation(doc.ref), getTimelineForRequest(doc.ref, userRef)]);
      requestWithOffers.push(
        RequestWithOffersAndTimeline.factory({
          ...(request.toObject() as IRequest),
          offers: results[0],
          timeline: results[1],
        } as IRequestWithOffersAndTimeline),
      );
    } else {
      // eslint-disable-next-line no-await-in-loop
      const timeline = await getTimelineForRequest(doc.ref, userRef);
      requestWithOffers.push(
        RequestWithOffersAndTimeline.factory({
          ...(request.toObject() as IRequest),
          offers: [],
          timeline,
        } as IRequestWithOffersAndTimeline),
      );
    }
  }
  return requestWithOffers;
};

// const getOngoingRequestsWithOffers = async (lat, lng, userId, userType) => {};

// const getCompletedRequestsWithOffers = async (lat, lng, userId, userType) => {};

// const getCanceledRequestsWithOffers = async (lat, lng, userId, userType) => {};

// const getRemovedRequestsWithOffers = async (lat, lng, userId, userType) => {};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const getRequests = functions.https.onCall(async (data, context) => {
  const { lat, lng, status } = data;
  const userId = context.auth?.uid;

  console.log('getRequests cloud function is running!');
  console.log('userId obtained: ', userId);
  console.log('lat, lng, status: ', lat, lng, status);

  if (userId) {
    const userRef = db.collection('users').doc(userId);
    const user = User.factory((await userRef.get()).data() as IUser);

    if (user && user.applicationPreference) {
      switch (status) {
        case RequestStatus.pending:
        default: {
          const response = getPendingRequestsWithOffers(lat, lng, userRef, user.applicationPreference);
          const dataToSend = (await response).map(obj => obj.toObject());
          console.log('dataToSend: ', JSON.stringify(dataToSend));
          return {
            success: true,
            data: dataToSend,
          };
        }
        // case RequestStatus.ongoing:
        //   return getOngoingRequestsWithOffers(lat, lng, userId, user.applicationPreference);
        // case RequestStatus.completed:
        //   return getCompletedRequestsWithOffers(lat, lng, userId, user.applicationPreference);
        // case RequestStatus.cancelled:
        //   return getCanceledRequestsWithOffers(lat, lng, userId, user.applicationPreference);
        // case RequestStatus.removed:
        //   return getRemovedRequestsWithOffers(lat, lng, userId, user.applicationPreference);
      }
    } else {
      throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
    }
  } else {
    throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
  }
});

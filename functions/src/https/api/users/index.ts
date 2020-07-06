import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { auth, db } from '../../../app';
import { IRequest, Request } from '../../../models/requests';
import { IUser, User } from '../../../models/users';
import { ITimelineItem, TimelineItem } from '../../../models/requests/timeline';
import { IOffer, Offer } from '../../../models/offers';

const deleteUserPrivilegedInformation = async (userRef: firestore.DocumentReference) => {
  const snapshot = await userRef.collection('privilegedInformation').get();
  return Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
};

const deleteUserTimelines = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  const userTimelines = await db
    .collectionGroup('timeline')
    .where('actorRef', '==', userRef)
    .get();
  return Promise.all(
    userTimelines.docs.map(doc =>
      doc.ref.update({
        actorSnapshot: deletedUser.toObject(),
      }),
    ),
  );
};

const updateOffersForRequest = async (requestRef: firestore.DocumentReference, deletedRequest: Request) => {
  const offersForRequest = await db
    .collection('offers')
    .where('requestRef', '==', requestRef)
    .get();
  return Promise.all(
    offersForRequest.docs.map(async doc =>
      doc.ref.update({
        requestSnapshot: deletedRequest.toObject(),
      }),
    ),
  );
};

const deletePinUserRequests = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  // Get All the requests that the user made
  const userRequests = await db
    .collection('requests')
    .where('pinUserRef', '==', userRef)
    .get();
  const nullLatLng = new firestore.GeoPoint(0, 0);
  const deletedAddress = 'deleted address';
  return Promise.all(
    userRequests.docs.map(async doc => {
      doc.ref.update({
        pinUserSnapshot: deletedUser.toObject(),
        latLng: nullLatLng,
        streetAddress: deletedAddress,
      });
      const requestTimelines = await doc.ref.collection('timeline').get();
      const deletedRequestSnapshot = Request.factory(doc.data() as IRequest);
      deletedRequestSnapshot.pinUserSnapshot = deletedUser;
      deletedRequestSnapshot.latLng = nullLatLng;
      deletedRequestSnapshot.streetAddress = deletedAddress;
      // The old request details still exist in every offer made for it
      await updateOffersForRequest(doc.ref, deletedRequestSnapshot);
      return Promise.all(
        requestTimelines.docs.map(timelineDoc => {
          const timelineObject = TimelineItem.factory(timelineDoc.data() as ITimelineItem);
          if (timelineObject.offerSnapshot) {
            timelineObject.offerSnapshot.requestSnapshot = deletedRequestSnapshot;
          }
          timelineObject.requestSnapshot = deletedRequestSnapshot;
          return timelineDoc.ref.update({
            ...timelineObject.toObject(),
          });
        }),
      );
    }),
  );
};

const deleteCavUserOffersAndRequests = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  // Get All Offers that the user has made as a cav
  const userOffers = await db
    .collection('offers')
    .where('cavUserRef', '==', userRef)
    .get();
  return Promise.all(
    userOffers.docs.map(async doc => {
      const offer = Offer.factory(doc.data() as IOffer);
      // Find the request the offer was made for
      const request = Request.factory((await offer.requestRef.get()).data() as IRequest);
      // Check if the offer was acceptec for the request
      if (request.cavUserRef?.id === offer.cavUserRef.id) {
        await offer.requestRef.update({
          cavUserSnapshot: deletedUser.toObject(),
        });
        request.cavUserSnapshot = deletedUser;
        offer.requestSnapshot = request;
      }

      // You still have to update the user details irrespective of whether the offer was accepted or not
      offer.cavUserSnapshot = deletedUser;
      await doc.ref.update({
        ...offer.toObject(),
      });
      // Even if the offer wasn't accepted the user details would still exist in the timeline objects
      const requestTimelines = await offer.requestRef.collection('timeline').get();
      return Promise.all(
        requestTimelines.docs.map(timelineDoc => {
          const timelineObject = TimelineItem.factory(timelineDoc.data() as ITimelineItem);
          console.log('timelineObject.actorRef: ', timelineObject.actorRef);
          if (timelineObject.offerSnapshot) {
            timelineObject.offerSnapshot = offer;
          }
          timelineObject.requestSnapshot = request;
          return timelineDoc.ref.update({
            ...timelineObject.toObject(),
          });
        }),
      );
    }),
  );
};

export const deleteUserData = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const deletedUser = User.factory((await userRef.get()).data() as IUser);
    deletedUser.displayPicture = null;
    deletedUser.displayName = 'Deleted User';
    deletedUser.username = 'deleteduser';
    deletedUser.cavQuestionnaireRef = null;
    deletedUser.pinQuestionnaireRef = null;
    console.log('about to begin user timelines');
    await deleteUserTimelines(userRef, deletedUser);
    console.log('passed user timelines');
    await deletePinUserRequests(userRef, deletedUser);
    console.log('passed pin user requests');
    await deleteCavUserOffersAndRequests(userRef, deletedUser);
    console.log('passed cav user offers and requests');

    // delete the user from auth itself.
    await deleteUserPrivilegedInformation(userRef);
    console.log('passed privilege');
    await userRef.update({ ...deletedUser.toObject() });
    await auth?.deleteUser(userRef.id);
    console.log('passed auth');
  } catch (err) {
    console.log('error: ', err);
    throw new functions.https.HttpsError('internal', 'deleting all user data failed', err);
  }
});

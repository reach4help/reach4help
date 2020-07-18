import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { auth, db } from '../../../app';
import { IRequest, Request, RequestFirestoreConverter, RequestStatus } from '../../../models/requests';
import { IUser, User } from '../../../models/users';
import { TimelineItemAction, ITimelineItem, TimelineItem } from '../../../models/requests/timeline';
import { IOffer, Offer } from '../../../models/offers';

const deleteQueryBatch = async (query: firestore.Query, resolve: Function) => {
  const querySnapshot = await query.get();
  const batchSize = querySnapshot.size;
  if (batchSize === 0) {
    console.log('Completed batch deletes');
    resolve();
    return;
  }

  const batch = db.batch();
  querySnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
};

const updateQueryBatch = async (query: firestore.Query, resolve: Function, updatedFields: {}) => {
  const querySnapshot = await query.get();
  const batchSize = querySnapshot.size;
  if (batchSize === 0) {
    console.log('Completed batch updates');
    resolve();
    return;
  }

  const batch = db.batch();
  querySnapshot.docs.forEach(doc => {
    batch.update(doc.ref, updatedFields);
  });
  await batch.commit();

  process.nextTick(() => {
    updateQueryBatch(query, resolve, updatedFields);
  });
};

const deleteUserPrivilegedInformation = async (userRef: firestore.DocumentReference) => {
  const userPrivilegedInfoQuery = userRef.collection('privilegedInformation').limit(500);
  return new Promise((resolve, reject) => {
    try {
      deleteQueryBatch(userPrivilegedInfoQuery, resolve);
    } catch {
      reject();
    }
  });
};

const deleteUserTimelines = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  const userTimelinesQuery = db
    .collectionGroup('timeline')
    .where('actorRef', '==', userRef)
    .limit(500);
  return new Promise((resolve, reject) => {
    try {
      updateQueryBatch(userTimelinesQuery, resolve, {
        actorSnapshot: deletedUser.toObject(),
      });
    } catch {
      reject();
    }
  });
};

const deletePinUserRequests = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  // Get All the requests that the user made
  try {
    await db.runTransaction(async t => {
      // Perform all reads
      const userRequests = await db
        .collection('requests')
        .where('pinUserRef', '==', userRef)
        .get();
      const nullLatLng = new firestore.GeoPoint(0, 0);
      const deletedAddress = 'deleted address';
      const requestTimelinesAndOffers = userRequests.docs.map(async doc => {
        // The old request details still exist in every offer made for it
        return {
          requestDoc: doc,
          requestTimelines: await doc.ref.collection('timeline').get(),
          requestOffers: await db
            .collection('offers')
            .where('requestRef', '==', doc.ref)
            .get(),
        };
      });
      const resolvedReads = await Promise.all(requestTimelinesAndOffers);
      // Perform all writes
      resolvedReads.forEach(({ requestDoc, requestTimelines, requestOffers }) => {
        t.update(requestDoc.ref, {
          pinUserSnapshot: deletedUser.toObject(),
          latLng: JSON.stringify(nullLatLng),
          streetAddress: deletedAddress,
          status: RequestStatus.removed,
        });
        const deletedRequestSnapshot = Request.factory(requestDoc.data() as IRequest);
        deletedRequestSnapshot.pinUserSnapshot = deletedUser;
        deletedRequestSnapshot.latLng = JSON.stringify(nullLatLng) as any;
        deletedRequestSnapshot.streetAddress = deletedAddress;
        deletedRequestSnapshot.status = RequestStatus.removed;
        requestTimelines.docs.forEach(timelineDoc => {
          const timelineObject = TimelineItem.factory(timelineDoc.data() as ITimelineItem);
          if (timelineObject.offerSnapshot) {
            timelineObject.offerSnapshot.requestSnapshot = deletedRequestSnapshot;
          }
          timelineObject.requestSnapshot = deletedRequestSnapshot;
          timelineObject.action = TimelineItemAction.CANCEL_REQUEST;
          t.update(timelineDoc.ref, {
            ...timelineObject.toObject(),
          });
        });
        requestOffers.docs.forEach(offerDoc => {
          t.update(offerDoc.ref, {
            requestSnapshot: RequestFirestoreConverter.toFirestore(deletedRequestSnapshot),
          });
        });
      });
    });
    console.log('Delete Pin User Requests transaction succeeded');
  } catch (e) {
    throw new functions.https.HttpsError('internal', 'Delete Pin User Requests transaction failed', e);
  }
};

const deleteCavUserOffersAndRequests = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  // Get All Offers that the user has made as a cav
  try {
    await db.runTransaction(async t => {
      // Perform all reads
      const userOffers = await db
        .collection('offers')
        .where('cavUserRef', '==', userRef)
        .get();
      const userOfferRequestsAndRequestTimelines = userOffers.docs.map(async doc => {
        const deletedOffer = Offer.factory(doc.data() as IOffer);
        // Find the request the offer was made for
        // Even if the offer wasn't accepted the user details would still exist in the timeline objects
        return {
          userOfferDoc: doc,
          deletedOffer,
          deletedRequest: Request.factory((await deletedOffer.requestRef.get()).data() as IRequest),
          requestTimelines: await deletedOffer.requestRef.collection('timeline').get(),
        };
      });
      const resolvedReads = await Promise.all(userOfferRequestsAndRequestTimelines);
      // Perform all writes
      resolvedReads.forEach(({ userOfferDoc, deletedOffer, deletedRequest, requestTimelines }) => {
        // Check if the offer was accepted for the request
        /* eslint-disable no-param-reassign */
        if (deletedRequest.cavUserRef?.id === deletedOffer.cavUserRef.id) {
          t.update(deletedOffer.requestRef, {
            cavUserSnapshot: deletedUser.toObject(),
          });
          deletedRequest.cavUserSnapshot = deletedUser;
          deletedOffer.requestSnapshot = deletedRequest;
        }
        // You still have to update the user details irrespective of whether the offer was accepted or not
        deletedOffer.cavUserSnapshot = deletedUser;
        t.update(userOfferDoc.ref, {
          ...deletedOffer.toObject(),
        });
        /* eslint-enable no-param-reassign */
        requestTimelines.docs.forEach(timelineDoc => {
          const timelineObject = TimelineItem.factory(timelineDoc.data() as ITimelineItem);
          console.log('timelineObject.actorRef: ', timelineObject.actorRef);
          if (timelineObject.offerSnapshot) {
            timelineObject.offerSnapshot = deletedOffer;
          }
          timelineObject.requestSnapshot = deletedRequest;
          timelineObject.action = TimelineItemAction.CANCEL_REQUEST;
          t.update(timelineDoc.ref, {
            ...timelineObject.toObject(),
          });
        });
      });
    });
    console.log('Delete Cav User Offers and Requests transaction succeeded');
  } catch (e) {
    throw new functions.https.HttpsError('internal', 'Delete Cav User Offers and Requests transaction failed', e);
  }
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

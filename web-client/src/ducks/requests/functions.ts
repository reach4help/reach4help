// import firebase from 'firebase';
// import { string } from 'prop-types';
import { firestore, functions } from 'src/firebase';
// TODO: (es) import { IOfferWithLocation } from 'src/models/offers/offersWithLocation';
import {
  Request,
  RequestFirestoreConverter,
  // TODO: (es) RequestStatus,
} from 'src/models/requests';
import { AbstractRequestStatus } from 'src/models/requests/RequestWithOffersAndTimeline';
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

export const getMyPinReqestPosts = async ({ userRef, status }: IgetMyPosts) => {
  let initialQuery = firestore
    .collection('requests')
    .where('pinUserRef', '==', userRef);
  if (status) {
    initialQuery = initialQuery.where('status', '==', status);
  }
  // TODO: (es) coud I have dataRequests = await
  return initialQuery
    .withConverter(RequestFirestoreConverter)
    .get()
    .then(snapshot => {
      snapshot.docs.map(doc => {
        const docVal = {
          id: doc.id,
          _requestRef: doc.ref,
          // TODO:(es) Convert to request here?
          ...doc.data(),
        };
        return docVal;
      });
    });
};

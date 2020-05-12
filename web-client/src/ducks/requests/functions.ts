import { firestore } from 'src/firebase';
import {
  Request,
  RequestFirestoreConverter,
  RequestStatus,
} from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';

import { IgetOpenRequests } from './types';

export const observeOpenRequests = (
  nextValue: Function,
  payload: IgetOpenRequests,
): firebase.Unsubscribe => {
  let initialQuery = firestore
    .collection('requests')
    .where('status', '==', RequestStatus.pending);

  if (payload.userType === ApplicationPreference.pin) {
    initialQuery = initialQuery.where('pinUserRef', '==', payload.userRef);
  }

  return initialQuery
    .withConverter(RequestFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};

export const setUserRequest = async ({
  requestPayload,
}: {
  requestPayload: Request;
}) =>
  firestore
    .collection('requests')
    .doc()
    .withConverter(RequestFirestoreConverter)
    .set(requestPayload);

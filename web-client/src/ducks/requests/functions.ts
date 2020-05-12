import { firestore } from 'src/firebase';
import { Request, RequestFirestoreConverter } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';

import { IgetUserRequests } from './types';

const whereConditionConverter = {
  applicationPreference: {
    [ApplicationPreference.pin]: 'pinUserRef',
    [ApplicationPreference.cav]: 'cavUserRef',
  },
};

export const observeRequests = (
  nextValue: Function,
  payload: IgetUserRequests,
): firebase.Unsubscribe =>
  firestore
    .collection('requests')
    .where(
      whereConditionConverter.applicationPreference[payload.userType],
      '==',
      payload.uid,
    )
    .withConverter(RequestFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));

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

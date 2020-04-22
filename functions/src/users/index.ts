import * as functions from 'firebase-functions';

import { onCreate, setIsUserPin } from './functions';

export const triggerEventsWhenUserIsCreated = functions.firestore
  .document('users/{userId}')
  .onCreate(onCreate);

export const callableSetUserPinClaim = functions.https.onCall((data: { status: boolean }, context) => {
  return context.auth?.uid ? setIsUserPin(context.auth.uid, data.status || false) : Promise.reject(new Error('Unauthorized'));
});

export const callableSetUserCavClaim = functions.https.onCall((data: { status: boolean }, context) => {
  return context.auth?.uid ? setIsUserPin(context.auth.uid, data.status || false) : Promise.reject(new Error('Unauthorized'));
});

export * from './privilegedInformation';

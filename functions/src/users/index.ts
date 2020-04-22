import * as functions from 'firebase-functions';

import { onCreate } from './functions';

export const triggerEventsWhenUserIsCreated = functions.firestore
  .document('users/{userId}')
  .onCreate(onCreate);

export * from './privilegedInformation';

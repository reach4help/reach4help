import * as functions from 'firebase-functions';

import { onCreate } from './privilegedFunctions';

export const triggerEventsWhenUserPrivilegedInformationIsCreated = functions.firestore
  .document('users/{userId}/privilegedInformation/{informationId}')
  .onCreate(onCreate);

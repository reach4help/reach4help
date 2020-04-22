import * as functions from 'firebase-functions';

import { createRequest, deleteRequest, updateRequest } from './functions';

export const triggerEventsWhenRequestIsCreated = functions.firestore
  .document('requests/{requestId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate(createRequest);

export const triggerEventsWhenRequestIsUpdated = functions.firestore
  .document('requests/{requestId}')
  .onUpdate(updateRequest);

export const triggerEventsWhenRequestIsDeleted = functions.firestore
  .document('requests/{requestId}')
  .onDelete(deleteRequest);

export * from './privilegedInformation';

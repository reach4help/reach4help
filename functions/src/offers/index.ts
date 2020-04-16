import * as functions from 'firebase-functions';
import { offerCreate, offerUpdate } from './functions';

export const triggerEventsWhenOfferIsCreated = functions.firestore
  .document('offers/{offerId}')
  .onCreate(offerCreate);

export const triggerEventsWhenOfferIsUpdated = functions.firestore
  .document('offers/{offerId}')
  .onUpdate(offerUpdate);

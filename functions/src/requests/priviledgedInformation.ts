import * as functions from 'firebase-functions';

export interface PrivateRequestData extends FirebaseFirestore.DocumentData {
  address: google.maps.GeocoderResult;
}

export const triggerEventsWhenRequestPrivilegedInformationIsCreated =
  functions.firestore.document('requests/{requestId}/privilegedInformation/{informationId}')
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    .onCreate((snapshot, context) => Promise.resolve());

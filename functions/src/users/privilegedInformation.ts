import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Timestamp = admin.firestore.Timestamp;

export interface PrivateUserData extends FirebaseFirestore.DocumentData {
  address: google.maps.GeocoderResult;

  termsAccepted: Timestamp; // acts as a timestamp of when and as a boolean: if accepted it exists.
  termsVersion: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cavQuestionnaire: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pinQuestionnaire: { [key: string]: any };
}

export const triggerEventsWhenUserPrivilegedInformationIsCreated =
  functions.firestore.document('users/{userId}/privilegedInformation/{informationId}')
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    .onCreate((snapshot, context) => Promise.resolve());

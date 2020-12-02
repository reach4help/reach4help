import { firestore } from 'firebase';

export type DataReferenceType = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;

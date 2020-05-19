import { firestore } from 'firebase';

import { User } from '../users';
import { MakePartial } from '../util';

export enum OfferStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  cavDeclined = 'cav_declined',
}

export interface Offer {
  cavUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  pinUserRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  requestRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  cavUserSnapshot: User;
  message: string;
  status: OfferStatus;
  createdAt: firebase.firestore.Timestamp;
}

/**
 * Initialize with default values
 */
export const initOffer = (offer: MakePartial<Offer, 'createdAt'>): Offer => ({
  createdAt: firestore.Timestamp.now(),
  ...offer,
});

export const OfferFirestoreConverter: firebase.firestore.FirestoreDataConverter<Offer> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<Offer>) =>
    data.data(),
  toFirestore: modelObject => modelObject,
};

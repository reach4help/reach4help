import { firestore } from 'src/firebase';
import { Offer, OfferFirestoreConverter } from 'src/models/offers';
import { ApplicationPreference } from 'src/models/users';

import { IgetOffers, IgetRequestOffers } from './types';

export const observeOffers = (
  nextValue: Function,
  payload: IgetOffers,
): firebase.Unsubscribe => {
  if (payload.userType === ApplicationPreference.cav) {
    return firestore
      .collection('offers')
      .where('cavUserRef', '==', payload.userRef)
      .withConverter(OfferFirestoreConverter)
      .onSnapshot(snap => nextValue(snap));
  }

  return firestore
    .collection('offers')
    .where('pinUserRef', '==', payload.userRef)
    .withConverter(OfferFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};

export const getRequestOffers = (
  payload: IgetRequestOffers,
): Promise<firebase.firestore.QuerySnapshot<Offer>> => {
  const requestRef = firestore.collection('requests').doc(payload.requestId);
  let initialQuery = firestore
    .collection('offers')
    .where('requestRef', '==', requestRef);

  if (payload.userType === ApplicationPreference.cav) {
    initialQuery = initialQuery.where('cavUserRef', '==', payload.userRef);
  } else {
    initialQuery = initialQuery.where('pinUserRef', '==', payload.userRef);
  }

  return initialQuery.withConverter(OfferFirestoreConverter).get();
};

export const createUserOffer = async ({
  offerPayload,
}: {
  offerPayload: Offer;
}) =>
  firestore
    .collection('offers')
    .doc()
    .withConverter(OfferFirestoreConverter)
    .set(offerPayload);

export const setUserOffer = async ({
  offerPayload,
  offerId,
}: {
  offerPayload: Offer;
  offerId: string;
}) =>
  firestore
    .collection('offers')
    .doc(offerId)
    .withConverter(OfferFirestoreConverter)
    .set(offerPayload);

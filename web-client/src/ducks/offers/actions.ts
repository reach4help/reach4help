import { firestore } from 'firebase';
import { IOffer, Offer } from 'src/models/offers';

import {
  createUserOffer,
  getRequestOffers as getRequestOffersFunc,
  observeOffers as observeOffersFunc,
  setUserOffer,
} from './functions';
import {
  GET_OFFERS_FOR_REQUEST,
  IgetOffers,
  IgetRequestOffers,
  OBSERVE_OFFERS,
  SET,
} from './types';

export const observeOffers = (
  dispatch: Function,
  payload: IgetOffers,
): (() => void) => {
  dispatch({
    type: OBSERVE_OFFERS,
    payload,
    observer: observeOffersFunc,
  });

  return () =>
    dispatch({
      type: OBSERVE_OFFERS.UNSUBSCRIBE,
      observerName: OBSERVE_OFFERS,
    });
};

export const getRequestOffers = (payload: IgetRequestOffers) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_OFFERS_FOR_REQUEST,
    payload,
    firebase: getRequestOffersFunc,
  });

export const setOffer = (payload: Offer | IOffer, offerId?: string) => (
  dispatch: Function,
) => {
  if (!(payload instanceof Offer)) {
    const offerPayload = Offer.factory({
      ...payload,
      seenAt: firestore.Timestamp.now(),
    });
    dispatch({
      type: SET,
      payload: {
        offerPayload,
        offerId,
      },
      firebase: offerId ? setUserOffer : createUserOffer,
    });
  } else {
    const offerPayload = {
      ...payload,
      seenAt: firestore.Timestamp.now(),
    };
    dispatch({
      type: SET,
      payload: {
        offerPayload,
        offerId,
      },
      firebase: offerId ? setUserOffer : createUserOffer,
    });
  }
};

import { firestore } from 'firebase';
import { IOffer, Offer, OfferStatus } from 'src/models/offers';

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
  RESET_SET,
  SET,
  SET_TEMP_OFFER,
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

export const setOffer = (
  payload: Offer | IOffer,
  offerId?: string,
  phoneNumber?: string | null,
) => (dispatch: Function) => {
  if (!(payload instanceof Offer)) {
    const offerPayload = Offer.factory({
      ...payload,
    });

    dispatch({
      type:
        phoneNumber || offerPayload.status === OfferStatus.cavDeclined
          ? SET
          : SET_TEMP_OFFER,
      payload: {
        offerPayload,
        offerId,
      },
      firebase:
        phoneNumber || offerPayload.status === OfferStatus.cavDeclined
          ? offerId
            ? setUserOffer
            : createUserOffer
          : null,
    });
  } else {
    const offerPayload = payload;
    // eslint-disable-next-line no-param-reassign
    payload.updatedAt = firestore.Timestamp.now();
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

export const resetSetOfferState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_SET,
    payload: true,
  });

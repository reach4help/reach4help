import { Offer } from 'src/models/offers';
import createReducer from 'src/store/utils/createReducer';

import {
  GET_OFFERS_FOR_REQUEST,
  IgetRequestOffers,
  OBSERVE_OFFERS,
  OffersState,
  RESET_SET,
  SET,
  SET_TEMP_OFFER,
} from './types';

const initialSetActionState = {
  loading: false,
  success: undefined,
  error: undefined,
  modalState: false,
};

const initialState: OffersState = {
  forRequest: undefined,
  data: undefined,
  loading: false,
  error: undefined,
  observerReceivedFirstUpdate: false,
  setAction: initialSetActionState,
};

export default createReducer<OffersState>(
  {
    [SET.PENDING]: (state: OffersState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
      state.newOfferTemp = undefined;
    },
    [SET.COMPLETED]: (
      state: OffersState,
      { payload }: { payload: 1 | 2 | 3 },
    ) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = payload;
    },
    [SET.REJECTED]: (state: OffersState, { payload }: { payload: Error }) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = undefined;
    },
    [SET_TEMP_OFFER]: (
      state: OffersState,
      {
        payload,
      }: {
        payload: {
          offerPayload: Offer;
          offerId: string;
        };
      },
    ) => {
      state.newOfferTemp = payload;
    },
    [RESET_SET]: (state: OffersState) => {
      state.setAction.loading = false;
      state.setAction.success = undefined;
    },
    [OBSERVE_OFFERS.SUBSCRIBE]: (state: OffersState) => {
      state.loading = true;
    },
    [OBSERVE_OFFERS.UPDATED]: (
      state: OffersState,
      {
        payload,
      }: {
        payload: firebase.firestore.QuerySnapshot<Offer>;
      },
    ) => {
      state.data = payload.docs.reduce(
        (acc, doc) => ({
          ...acc,
          [doc.id]: doc.data(),
        }),
        {},
      );
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
    [OBSERVE_OFFERS.ERROR]: (
      state: OffersState,
      { payload }: { payload: Error },
    ) => {
      state.error = payload;
      state.loading = false;
    },
    [GET_OFFERS_FOR_REQUEST.PENDING]: (
      state: OffersState,
      { payload }: { payload: IgetRequestOffers },
    ) => {
      state.forRequest = {
        loading: true,
        data: undefined,
        requestId: payload.requestId,
        error: undefined,
      };
    },
    [GET_OFFERS_FOR_REQUEST.COMPLETED]: (
      state: OffersState,
      {
        payload,
      }: {
        payload: firebase.firestore.QuerySnapshot<Offer>;
      },
    ) => {
      if (state.forRequest) {
        state.forRequest.data = payload.docs.reduce(
          (acc, doc) => ({
            ...acc,
            [doc.id]: doc.data(),
          }),
          {},
        );
        state.forRequest.loading = false;
      }
    },
    [GET_OFFERS_FOR_REQUEST.REJECTED]: (
      state: OffersState,
      {
        payload,
      }: {
        payload: Error;
      },
    ) => {
      if (state.forRequest) {
        state.forRequest.error = payload;
        state.forRequest.loading = false;
      }
    },
  },
  initialState,
);

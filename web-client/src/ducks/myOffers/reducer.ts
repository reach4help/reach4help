import { Post } from 'src/models/posts';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  OBSERVE_MY_OFFERS,
  OfferState,
  RESET_SET,
  SET,
  SET_TEMP_OFFER,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

const initialState: OfferState = {
  setAction: initialSetActionState,
  myOffers: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
  newOfferTemp: undefined,
};

export default createReducer<OfferState>(
  {
    [OBSERVE_MY_OFFERS.SUBSCRIBE]: (state: OfferState) => {
      state.myOffers.loading = true;
    },
    [OBSERVE_MY_OFFERS.UPDATED]: (
      state: OfferState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.observerReceivedFirstUpdate = true;
      state.myOffers.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myOffers.error = undefined;
    },
    [OBSERVE_MY_OFFERS.ERROR]: (
      state: OfferState,
      { payload }: { payload: Error },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.error = payload;
    },
    [OBSERVE_MY_OFFERS.SUBSCRIBE]: (state: OfferState) => {
      state.myOffers.loading = true;
    },
    [OBSERVE_MY_OFFERS.UPDATED]: (
      state: OfferState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.observerReceivedFirstUpdate = true;
      state.myOffers.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myOffers.error = undefined;
    },
    [OBSERVE_MY_OFFERS.ERROR]: (
      state: OfferState,
      { payload }: { payload: Error },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.error = payload;
    },
    [SET.PENDING]: (state: OfferState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [SET.COMPLETED]: (state: OfferState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
      state.newOfferTemp = undefined;
    },
    [SET.REJECTED]: (state: OfferState, { payload }: { payload: Error }) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
      state.newOfferTemp = undefined;
    },
    [SET_TEMP_OFFER]: (
      state: OfferState,
      {
        payload,
      }: {
        payload: {
          offerPayload: Post;
          offerId: string;
        };
      },
    ) => {
      state.newOfferTemp = payload;
    },
    [RESET_SET]: (state: OfferState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.setAction.error = undefined;
    },
    [CHANGE_MODAL]: (state: OfferState, { payload }: { payload: boolean }) => {
      state.setAction.modalState = payload;
      if (!payload) {
        state.setAction.success = false;
      }
    },
  },
  initialState,
);

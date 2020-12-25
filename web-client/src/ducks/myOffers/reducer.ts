import { Post } from 'src/models/posts';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  OBSERVE_ALL_MY_OFFERS,
  PostState,
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

const initialState: PostState = {
  setAction: initialSetActionState,
  myOffers: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
  myOffers: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
  newOfferTemp: undefined,
};

export default createReducer<PostState>(
  {
    [OBSERVE_ALL_MY_OFFERS.SUBSCRIBE]: (state: PostState) => {
      state.myOffers.loading = true;
    },
    [OBSERVE_ALL_MY_OFFERS.UPDATED]: (
      state: PostState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Offer> },
    ) => {
      state.myOffers.loading = false;
      state.mys.observerReceivedFirstUpdate = true;
      state.myOffers.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myOffers.error = undefined;
    },
    [OBSERVE_ALL_MY_OFFERS.ERROR]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.error = payload;
    },
    [OBSERVE_ALL_MY_OFFERS.SUBSCRIBE]: (state: PostState) => {
      state.myOffers.loading = true;
    },
    [OBSERVE_ALL_MY_OFFERS.UPDATED]: (
      state: PostState,
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
    [OBSERVE_ALL_MY_OFFERS.ERROR]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.error = payload;
    },
    [SET.PENDING]: (state: PostState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [SET.COMPLETED]: (state: PostState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
      state.newOfferTemp = undefined;
    },
    [SET.REJECTED]: (state: PostState, { payload }: { payload: Error }) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
      state.newOfferTemp = undefined;
    },
    [SET_TEMP_OFFER]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          requestPayload: Post;
          requestId: string;
        };
      },
    ) => {
      state.newOfferTemp = payload;
    },
    [RESET_SET]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.setAction.error = undefined;
    },
    [CHANGE_MODAL]: (state: PostState, { payload }: { payload: boolean }) => {
      state.setAction.modalState = payload;
      if (!payload) {
        state.setAction.success = false;
      }
    },
  },
  initialState,
);

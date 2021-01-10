import createReducer from 'src/store/utils/createReducer';

import { OBSERVE_MY_OFFERS, OBSERVE_MY_REQUESTS, PostState } from './types';

const initialState: PostState = {
  myRequests: {
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
};

export default createReducer<PostState>(
  {
    [OBSERVE_MY_REQUESTS.SUBSCRIBE]: (state: PostState) => {
      state.myRequests.loading = true;
    },
    [OBSERVE_MY_REQUESTS.UPDATED]: (
      state: PostState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Request> },
    ) => {
      state.myRequests.loading = false;
      state.myRequests.observerReceivedFirstUpdate = true;
      state.myRequests.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myRequests.error = undefined;
    },
    [OBSERVE_MY_REQUESTS.ERROR]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.myRequests.loading = false;
      state.myRequests.error = payload;
    },
    [OBSERVE_MY_OFFERS.SUBSCRIBE]: (state: PostState) => {
      state.myOffers.loading = true;
    },
    [OBSERVE_MY_OFFERS.UPDATED]: (
      state: PostState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Request> },
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
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.error = payload;
    },
  },
  initialState,
);

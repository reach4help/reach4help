import { Post } from 'src/models/Post';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  OBSERVE_MY_OFFERS,
  OBSERVE_MY_REQUESTS,
  PostState,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

const initialState: PostState = {
  setAction: initialSetActionState,
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
  newRequestTemp: undefined,
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
    [SET.PENDING]: (state: PostState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [SET.COMPLETED]: (state: PostState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
      state.newRequestTemp = undefined;
    },
    [SET.REJECTED]: (state: PostState, { payload }: { payload: Error }) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
      state.newRequestTemp = undefined;
    },
    [SET_TEMP_REQUEST]: (
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
      state.newRequestTemp = payload;
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

import { Post } from 'src/models/posts';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  DISPATCH_CREATE_PRIVATE_REQUEST,
  OBSERVE_GET_MY_REQUESTS,
  OBSERVE_UPDATE_PRIVATE_REQUEST,
  RequestState,
  RESET_UPDATE_PRIVATE_REQUEST,
  UPDATE_TEMP_REQUEST,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

const initialState: RequestState = {
  setAction: initialSetActionState,
  myRequests: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
  newRequestTemp: undefined,
};

export default createReducer<RequestState>(
  {
    [DISPATCH_CREATE_PRIVATE_REQUEST.PENDING]: (state: RequestState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [DISPATCH_CREATE_PRIVATE_REQUEST.COMPLETED]: (
      state: RequestState,
      // { payload }: { payload: true },
    ) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
    },
    [DISPATCH_CREATE_PRIVATE_REQUEST.REJECTED]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = undefined;
    },
    [OBSERVE_GET_MY_REQUESTS.SUBSCRIBE]: (state: RequestState) => {
      state.myRequests.loading = true;
    },
    [OBSERVE_GET_MY_REQUESTS.UPDATED]: (
      state: RequestState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
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
    [OBSERVE_GET_MY_REQUESTS.ERROR]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.myRequests.loading = false;
      state.myRequests.error = payload;
    },
    [OBSERVE_UPDATE_PRIVATE_REQUEST.PENDING]: (state: RequestState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [OBSERVE_UPDATE_PRIVATE_REQUEST.COMPLETED]: (state: RequestState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
      state.newRequestTemp = undefined;
    },
    [OBSERVE_UPDATE_PRIVATE_REQUEST.REJECTED]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
      state.newRequestTemp = undefined;
    },
    [UPDATE_TEMP_REQUEST]: (
      state: RequestState,
      {
        payload,
      }: {
        payload: {
          offerPayload: Post;
          offerId: string;
        };
      },
    ) => {
      state.newRequestTemp = payload;
    },
    [RESET_UPDATE_PRIVATE_REQUEST]: (state: RequestState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.setAction.error = undefined;
    },
    [CHANGE_MODAL]: (
      state: RequestState,
      { payload }: { payload: boolean },
    ) => {
      state.setAction.modalState = payload;
      if (!payload) {
        state.setAction.success = false;
      }
    },
  },
  initialState,
);

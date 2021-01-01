import { Post } from 'src/models/posts';
import createReducer from 'src/store/utils/createReducer';

import { XSpecificOffersState } from '../xSpecificOffers/types';
import {
  CHANGE_MODAL,
  OBSERVE_CREATE_GENERAL_REQUEST,
  OBSERVE_GET_MY_REQUESTS,
  OBSERVE_UPDATE_GENERAL_REQUEST,
  PostState,
  RESET_UPDATE_GENERAL_REQUEST,
  UPDATE_TEMP_REQUEST,
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
    [OBSERVE_CREATE_GENERAL_REQUEST.PENDING]: (state: PostState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [OBSERVE_CREATE_GENERAL_REQUEST.COMPLETED]: (
      state: PostState,
      // { payload }: { payload: true },
    ) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
    },
    [OBSERVE_CREATE_GENERAL_REQUEST.REJECTED]: (
      state: XSpecificOffersState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = undefined;
    },
    [OBSERVE_GET_MY_REQUESTS.SUBSCRIBE]: (state: PostState) => {
      state.myRequests.loading = true;
    },
    [OBSERVE_GET_MY_REQUESTS.UPDATED]: (
      state: PostState,
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
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.myRequests.loading = false;
      state.myRequests.error = payload;
    },
    [OBSERVE_UPDATE_GENERAL_REQUEST.PENDING]: (state: PostState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [OBSERVE_UPDATE_GENERAL_REQUEST.COMPLETED]: (state: PostState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
      state.newRequestTemp = undefined;
    },
    [OBSERVE_UPDATE_GENERAL_REQUEST.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
      state.newRequestTemp = undefined;
    },
    [UPDATE_TEMP_REQUEST]: (
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
    [RESET_UPDATE_GENERAL_REQUEST]: (state: PostState) => {
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

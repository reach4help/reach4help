import { Request } from 'src/models/requests';
import {
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_CAV_REQUEST_POSTS,
  GET_FIND_REQUEST_POSTS as GET_FIND_POSTS,
  GET_PIN_REQUEST_POSTS,
  PostState,
  RESET_CAV_REQUEST_POSTS,
  RESET_FIND_REQUEST_POSTS,
  RESET_PIN_REQUEST_POSTS,
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

const initialPostsState = {
  loading: false,
  observerReceivedFirstUpdate: false,
  data: undefined,
  error: undefined,
};

const initialSyncPostsState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const initialState: PostState = {
  syncPinRequestPostsState: initialSyncPostsState,
  syncCavRequestPostsState: initialSyncPostsState,
  syncFindPostsState: initialSyncPostsState,
  openRequests: initialPostsState,
  ongoingRequests: initialPostsState,
  completedRequests: initialPostsState,
  cancelledRequests: initialPostsState,
  removedRequests: initialPostsState,
  setAction: initialSetActionState,
  newRequestTemp: undefined,
};

export default createReducer<PostState>(
  {
    [GET_FIND_POSTS.PENDING]: (state: PostState) => {
      state.syncFindPostsState.loading = true;
      state.syncFindPostsState.data = undefined;
    },
    [GET_FIND_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, IRequestWithOffersAndTimeline>;
          };
        };
      },
    ) => {
      state.syncFindPostsState.loading = false;
      state.syncFindPostsState.error = undefined;
      const mappedData = Object.keys(payload.data.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
      state.syncFindPostsState.data = mappedData;
    },
    [GET_FIND_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncFindPostsState.data = undefined;
      state.syncFindPostsState.loading = false;
      state.syncFindPostsState.error = payload;
    },
    [GET_PIN_REQUEST_POSTS.PENDING]: (state: PostState) => {
      state.syncPinRequestPostsState.loading = true;
      state.syncPinRequestPostsState.data = undefined;
    },
    [GET_PIN_REQUEST_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, IRequestWithOffersAndTimeline>;
          };
        };
      },
    ) => {
      state.syncPinRequestPostsState.loading = false;
      state.syncPinRequestPostsState.error = undefined;
      const mappedData = Object.keys(payload.data.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
      state.syncPinRequestPostsState.data = mappedData;
    },
    [GET_PIN_REQUEST_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncPinRequestPostsState.data = undefined;
      state.syncPinRequestPostsState.loading = false;
      state.syncPinRequestPostsState.error = payload;
    },
    [GET_CAV_REQUEST_POSTS.PENDING]: (state: PostState) => {
      state.syncCavRequestPostsState.loading = true;
      state.syncCavRequestPostsState.data = undefined;
    },
    [GET_CAV_REQUEST_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, IRequestWithOffersAndTimeline>;
          };
        };
      },
    ) => {
      state.syncCavRequestPostsState.loading = false;
      state.syncCavRequestPostsState.error = undefined;
      state.syncCavRequestPostsState.data = Object.keys(
        payload.data.data,
      ).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_CAV_REQUEST_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncCavRequestPostsState.data = undefined;
      state.syncCavRequestPostsState.loading = false;
      state.syncCavRequestPostsState.error = payload;
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
          requestPayload: Request;
          requestId: string;
        };
      },
    ) => {
      state.newRequestTemp = payload;
    },
    [RESET_CAV_REQUEST_POSTS]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncCavRequestPostsState.data = undefined;
      state.syncCavRequestPostsState.loading = false;
    },
    [RESET_FIND_REQUEST_POSTS]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncFindPostsState.data = undefined;
      state.syncFindPostsState.loading = false;
    },
    [RESET_PIN_REQUEST_POSTS]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncPinRequestPostsState.data = undefined;
      state.syncPinRequestPostsState.loading = false;
    },
    [RESET_SET]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncPinRequestPostsState.data = undefined;
      state.syncPinRequestPostsState.loading = false;
      state.syncCavRequestPostsState.data = undefined;
      state.syncCavRequestPostsState.loading = false;
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

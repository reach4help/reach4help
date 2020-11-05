import { Request } from 'src/models/requests';
import {
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_OFFER_POST,
  GET_REQUEST_POST,
  PostState,
  RESET_OFFER_POST,
  RESET_REQUEST_POST,
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
  syncRequestPostsState: initialSyncPostsState,
  syncOfferPostsState: initialSyncPostsState,
  syncOngoingRequestsState: initialSyncPostsState,
  syncArchivedRequestsState: initialSyncPostsState,
  syncFinishedRequestsState: initialSyncPostsState,
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
    [GET_REQUEST_POST.PENDING]: (state: PostState) => {
      state.syncRequestPostsState.loading = true;
      state.syncRequestPostsState.data = undefined;
    },
    [GET_REQUEST_POST.COMPLETED]: (
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
      state.syncRequestPostsState.loading = false;
      state.syncRequestPostsState.error = undefined;
      const mappedData = Object.keys(payload.data.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
      state.syncRequestPostsState.data = mappedData;
    },
    [GET_REQUEST_POST.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncRequestPostsState.data = undefined;
      state.syncRequestPostsState.loading = false;
      state.syncRequestPostsState.error = payload;
    },
    [GET_OFFER_POST.PENDING]: (state: PostState) => {
      state.syncOfferPostsState.loading = true;
      state.syncOfferPostsState.data = undefined;
    },
    [GET_OFFER_POST.COMPLETED]: (
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
      state.syncOfferPostsState.loading = false;
      state.syncOfferPostsState.error = undefined;
      state.syncOfferPostsState.data = Object.keys(payload.data.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_OFFER_POST.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncOfferPostsState.data = undefined;
      state.syncOfferPostsState.loading = false;
      state.syncOfferPostsState.error = payload;
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
    [RESET_OFFER_POST]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncOfferPostsState.data = undefined;
      state.syncOfferPostsState.loading = false;
    },
    [RESET_REQUEST_POST]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncRequestPostsState.data = undefined;
      state.syncRequestPostsState.loading = false;
    },
    [RESET_SET]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncRequestPostsState.data = undefined;
      state.syncRequestPostsState.loading = false;
      state.syncOfferPostsState.data = undefined;
      state.syncOfferPostsState.loading = false;
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

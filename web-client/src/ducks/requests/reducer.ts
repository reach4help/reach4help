import { Request, RequestStatus } from 'src/models/requests';
import {
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_ARCHIVED,
  GET_FINISHED,
  GET_OFFER_POST,
  GET_ONGOING,
  GET_REQUEST_POST,
  OBSERVE_CANCELLED_POSTS,
  OBSERVE_COMPLETED_POSTS,
  OBSERVE_ONGOING_POSTS,
  OBSERVE_OPEN_POSTS,
  OBSERVE_REMOVED_POSTS,
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

const postStatusMapper = {
  [RequestStatus.pending]: 'openRequests',
  [RequestStatus.ongoing]: 'ongoingRequests',
  [RequestStatus.completed]: 'completedRequests',
  [RequestStatus.cancelled]: 'cancelledRequests',
  [RequestStatus.removed]: 'removedRequests',
};
const updateRequestState = (state: PostState, payload) => {
  state[
    postStatusMapper[payload.requestStatus]
  ].data = payload.snap.docs.reduce(
    (acc, doc) => ({
      ...acc,
      [doc.id]: doc.data(),
    }),
    {},
  );
  state[postStatusMapper[payload.requestStatus]].loading = false;
  state[
    postStatusMapper[payload.requestStatus]
  ].observerReceivedFirstUpdate = true;
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
    [GET_ARCHIVED.PENDING]: (state: PostState) => {
      state.syncArchivedRequestsState.loading = true;
      state.syncArchivedRequestsState.data = undefined;
    },
    [GET_ARCHIVED.COMPLETED]: (
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
      state.syncArchivedRequestsState.loading = false;
      state.syncArchivedRequestsState.error = undefined;
      state.syncArchivedRequestsState.data = Object.keys(
        payload.data.data,
      ).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_ARCHIVED.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncArchivedRequestsState.data = undefined;
      state.syncArchivedRequestsState.loading = false;
      state.syncArchivedRequestsState.error = payload;
    },
    [GET_FINISHED.PENDING]: (state: PostState) => {
      state.syncFinishedRequestsState.loading = true;
      state.syncFinishedRequestsState.data = undefined;
    },
    [GET_FINISHED.COMPLETED]: (
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
      state.syncFinishedRequestsState.loading = false;
      state.syncFinishedRequestsState.error = undefined;
      state.syncFinishedRequestsState.data = Object.keys(
        payload.data.data,
      ).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_FINISHED.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncFinishedRequestsState.data = undefined;
      state.syncFinishedRequestsState.loading = false;
      state.syncFinishedRequestsState.error = payload;
    },
    [GET_ONGOING.PENDING]: (state: PostState) => {
      state.syncOngoingRequestsState.loading = true;
      state.syncOngoingRequestsState.data = undefined;
    },
    [GET_ONGOING.COMPLETED]: (
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
      state.syncOngoingRequestsState.loading = false;
      state.syncOngoingRequestsState.error = undefined;
      state.syncOngoingRequestsState.data = Object.keys(
        payload.data.data,
      ).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_ONGOING.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncOngoingRequestsState.data = undefined;
      state.syncOngoingRequestsState.loading = false;
      state.syncOngoingRequestsState.error = payload;
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
    [RESET_SET]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncRequestPostsState.data = undefined;
      state.syncRequestPostsState.loading = false;
      state.syncOngoingRequestsState.data = undefined;
      state.syncOngoingRequestsState.loading = false;
      state.syncOfferPostsState.data = undefined;
      state.syncOfferPostsState.loading = false;
      state.syncFinishedRequestsState.data = undefined;
      state.syncFinishedRequestsState.loading = false;
      state.syncArchivedRequestsState.data = undefined;
      state.syncArchivedRequestsState.loading = false;
    },
    [CHANGE_MODAL]: (state: PostState, { payload }: { payload: boolean }) => {
      state.setAction.modalState = payload;
      if (!payload) {
        state.setAction.success = false;
      }
    },
    [OBSERVE_OPEN_POSTS.SUBSCRIBE]: (state: PostState) => {
      state.openRequests.loading = true;
    },
    [OBSERVE_OPEN_POSTS.UPDATED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: firebase.firestore.QuerySnapshot<Request>;
      },
    ) => {
      state.openRequests.data = payload.docs.reduce(
        (acc, doc) => ({
          ...acc,
          [doc.id]: doc.data(),
        }),
        {},
      );
      state.openRequests.loading = false;
      state.openRequests.observerReceivedFirstUpdate = true;
    },
    [OBSERVE_OPEN_POSTS.ERROR]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.openRequests.error = payload;
      state.openRequests.loading = false;
    },
    [OBSERVE_ONGOING_POSTS.SUBSCRIBE]: (state: PostState) => {
      state.openRequests.loading = true;
    },
    [OBSERVE_ONGOING_POSTS.UPDATED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
    [OBSERVE_COMPLETED_POSTS.SUBSCRIBE]: (state: PostState) => {
      state.completedRequests.loading = true;
    },
    [OBSERVE_COMPLETED_POSTS.UPDATED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
    [OBSERVE_CANCELLED_POSTS.SUBSCRIBE]: (state: PostState) => {
      state.cancelledRequests.loading = true;
    },
    [OBSERVE_CANCELLED_POSTS.UPDATED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
    [OBSERVE_REMOVED_POSTS.SUBSCRIBE]: (state: PostState) => {
      state.cancelledRequests.loading = true;
    },
    [OBSERVE_REMOVED_POSTS.UPDATED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
  },
  initialState,
);

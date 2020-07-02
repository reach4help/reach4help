import { Request, RequestStatus } from 'src/models/requests';
import {
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_ACCEPTED,
  GET_ARCHIVED,
  GET_FINISHED,
  GET_ONGOING,
  GET_OPEN,
  OBSERVE_CANCELLED_REQUESTS,
  OBSERVE_COMPLETED_REQUESTS,
  OBSERVE_ONGOING_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  OBSERVE_REMOVED_REQUESTS,
  RequestState,
  RESET_SET,
  SET,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

const initialRequestsState = {
  loading: false,
  observerReceivedFirstUpdate: false,
  data: undefined,
  error: undefined,
};

const initialSyncRequestsState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const initialState: RequestState = {
  syncOpenRequestsState: initialSyncRequestsState,
  syncAcceptedRequestsState: initialSyncRequestsState,
  syncOngoingRequestsState: initialSyncRequestsState,
  syncArchivedRequestsState: initialSyncRequestsState,
  syncFinishedRequestsState: initialSyncRequestsState,
  openRequests: initialRequestsState,
  ongoingRequests: initialRequestsState,
  completedRequests: initialRequestsState,
  cancelledRequests: initialRequestsState,
  removedRequests: initialRequestsState,
  setAction: initialSetActionState,
};

const requestStatusMapper = {
  [RequestStatus.pending]: 'openRequests',
  [RequestStatus.ongoing]: 'ongoingRequests',
  [RequestStatus.completed]: 'completedRequests',
  [RequestStatus.cancelled]: 'cancelledRequests',
  [RequestStatus.removed]: 'removedRequests',
};
const updateRequestState = (state: RequestState, payload) => {
  state[
    requestStatusMapper[payload.requestStatus]
  ].data = payload.snap.docs.reduce(
    (acc, doc) => ({
      ...acc,
      [doc.id]: doc.data(),
    }),
    {},
  );
  state[requestStatusMapper[payload.requestStatus]].loading = false;
  state[
    requestStatusMapper[payload.requestStatus]
  ].observerReceivedFirstUpdate = true;
};

export default createReducer<RequestState>(
  {
    [GET_OPEN.PENDING]: (state: RequestState) => {
      state.syncOpenRequestsState.loading = true;
      state.syncOpenRequestsState.data = undefined;
    },
    [GET_OPEN.COMPLETED]: (
      state: RequestState,
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
      state.syncOpenRequestsState.loading = false;
      state.syncOpenRequestsState.error = undefined;
      const mappedData = Object.keys(payload.data.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
      state.syncOpenRequestsState.data = mappedData;
    },
    [GET_OPEN.REJECTED]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.syncOpenRequestsState.data = undefined;
      state.syncOpenRequestsState.loading = false;
      state.syncOpenRequestsState.error = payload;
    },
    [GET_ACCEPTED.PENDING]: (state: RequestState) => {
      state.syncAcceptedRequestsState.loading = true;
      state.syncAcceptedRequestsState.data = undefined;
    },
    [GET_ACCEPTED.COMPLETED]: (
      state: RequestState,
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
      state.syncAcceptedRequestsState.loading = false;
      state.syncAcceptedRequestsState.error = undefined;
      state.syncAcceptedRequestsState.data = Object.keys(
        payload.data.data,
      ).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_ACCEPTED.REJECTED]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.syncAcceptedRequestsState.data = undefined;
      state.syncAcceptedRequestsState.loading = false;
      state.syncAcceptedRequestsState.error = payload;
    },
    [GET_ARCHIVED.PENDING]: (state: RequestState) => {
      state.syncArchivedRequestsState.loading = true;
      state.syncArchivedRequestsState.data = undefined;
    },
    [GET_ARCHIVED.COMPLETED]: (
      state: RequestState,
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
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.syncArchivedRequestsState.data = undefined;
      state.syncArchivedRequestsState.loading = false;
      state.syncArchivedRequestsState.error = payload;
    },
    [GET_FINISHED.PENDING]: (state: RequestState) => {
      state.syncFinishedRequestsState.loading = true;
      state.syncFinishedRequestsState.data = undefined;
    },
    [GET_FINISHED.COMPLETED]: (
      state: RequestState,
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
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.syncFinishedRequestsState.data = undefined;
      state.syncFinishedRequestsState.loading = false;
      state.syncFinishedRequestsState.error = payload;
    },
    [GET_ONGOING.PENDING]: (state: RequestState) => {
      state.syncOngoingRequestsState.loading = true;
      state.syncOngoingRequestsState.data = undefined;
    },
    [GET_ONGOING.COMPLETED]: (
      state: RequestState,
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
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.syncOngoingRequestsState.data = undefined;
      state.syncOngoingRequestsState.loading = false;
      state.syncOngoingRequestsState.error = payload;
    },
    [SET.PENDING]: (state: RequestState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [SET.COMPLETED]: (state: RequestState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
    },
    [SET.REJECTED]: (state: RequestState, { payload }: { payload: Error }) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
    },
    [RESET_SET]: (state: RequestState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncOpenRequestsState.data = undefined;
      state.syncOpenRequestsState.loading = false;
      state.syncOngoingRequestsState.data = undefined;
      state.syncOngoingRequestsState.loading = false;
      state.syncAcceptedRequestsState.data = undefined;
      state.syncAcceptedRequestsState.loading = false;
      state.syncFinishedRequestsState.data = undefined;
      state.syncFinishedRequestsState.loading = false;
      state.syncArchivedRequestsState.data = undefined;
      state.syncArchivedRequestsState.loading = false;
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
    [OBSERVE_OPEN_REQUESTS.SUBSCRIBE]: (state: RequestState) => {
      state.openRequests.loading = true;
    },
    [OBSERVE_OPEN_REQUESTS.UPDATED]: (
      state: RequestState,
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
    [OBSERVE_OPEN_REQUESTS.ERROR]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.openRequests.error = payload;
      state.openRequests.loading = false;
    },
    [OBSERVE_ONGOING_REQUESTS.SUBSCRIBE]: (state: RequestState) => {
      state.openRequests.loading = true;
    },
    [OBSERVE_ONGOING_REQUESTS.UPDATED]: (
      state: RequestState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
    [OBSERVE_COMPLETED_REQUESTS.SUBSCRIBE]: (state: RequestState) => {
      state.completedRequests.loading = true;
    },
    [OBSERVE_COMPLETED_REQUESTS.UPDATED]: (
      state: RequestState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
    [OBSERVE_CANCELLED_REQUESTS.SUBSCRIBE]: (state: RequestState) => {
      state.cancelledRequests.loading = true;
    },
    [OBSERVE_CANCELLED_REQUESTS.UPDATED]: (
      state: RequestState,
      {
        payload,
      }: {
        payload: {
          requestStatus: RequestStatus;
          snap: firebase.firestore.QuerySnapshot<Request>;
        };
      },
    ) => updateRequestState(state, payload),
    [OBSERVE_REMOVED_REQUESTS.SUBSCRIBE]: (state: RequestState) => {
      state.cancelledRequests.loading = true;
    },
    [OBSERVE_REMOVED_REQUESTS.UPDATED]: (
      state: RequestState,
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

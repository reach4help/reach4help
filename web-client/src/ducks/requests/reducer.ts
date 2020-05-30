import { Request, RequestStatus } from 'src/models/requests';
import {
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_OPEN,
  OBSERVE_CANCELLED_REQUESTS,
  OBSERVE_COMPLETED_REQUESTS,
  OBSERVE_ONGOING_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  OBSERVE_REMOVED_REQUESTS,
  RequestState,
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
          status: boolean;
          data: Record<string, IRequestWithOffersAndTimeline>;
        };
      },
    ) => {
      state.syncOpenRequestsState.loading = false;
      state.syncOpenRequestsState.error = undefined;
      state.syncOpenRequestsState.data = Object.keys(payload.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data[key]),
        }),
        {},
      );
    },
    [GET_OPEN.REJECTED]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.syncOpenRequestsState.data = undefined;
      state.syncOpenRequestsState.loading = false;
      state.syncOpenRequestsState.error = payload;
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

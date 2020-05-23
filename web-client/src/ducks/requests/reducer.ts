import { Request, RequestStatus } from 'src/models/requests';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  OBSERVE_CANCELLED_REQUESTS,
  OBSERVE_COMPLETED_REQUESTS,
  OBSERVE_ONGOING_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  OBSERVE_REMOVED_REQUESTS,
  RequestState,
  SET,
  UPDATE,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

const initialUpdateActionState = {
  loading: false,
  success: false,
  error: undefined,
};

const initialRequestsState = {
  loading: false,
  observerReceivedFirstUpdate: false,
  data: undefined,
  error: undefined,
};

const initialState: RequestState = {
  openRequests: initialRequestsState,
  ongoingRequests: initialRequestsState,
  completedRequests: initialRequestsState,
  cancelledRequests: initialRequestsState,
  removedRequests: initialRequestsState,
  setAction: initialSetActionState,
  updateAction: initialUpdateActionState,
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
    [UPDATE.PENDING]: (state: RequestState) => {
      state.updateAction.loading = true;
      state.updateAction.error = undefined;
    },
    [UPDATE.COMPLETED]: (state: RequestState) => {
      state.updateAction.loading = false;
      state.updateAction.success = true;
      state.updateAction.error = undefined;
    },
    [UPDATE.REJECTED]: (
      state: RequestState,
      { payload }: { payload: Error },
    ) => {
      state.updateAction.loading = false;
      state.updateAction.success = false;
      state.updateAction.error = payload;
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

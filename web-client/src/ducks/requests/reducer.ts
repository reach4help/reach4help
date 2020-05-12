import { Request } from 'src/models/requests';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  OBSERVE_OPEN_REQUESTS,
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

const initialState: RequestState = {
  openRequests: initialRequestsState,
  ongoingRequests: initialRequestsState,
  completedRequests: initialRequestsState,
  closedRequests: initialRequestsState,
  setAction: initialSetActionState,
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
      state.openRequests.data = payload.docs.map(doc => doc.data());
      state.openRequests.loading = false;
      state.openRequests.observerReceivedFirstUpdate = true;
    },
  },
  initialState,
);

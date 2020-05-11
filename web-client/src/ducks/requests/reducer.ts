import { Request } from 'src/models/requests';
import createReducer from 'src/store/utils/createReducer';

import { CHANGE_MODAL, OBSERVE_REQUESTS, SET, UserRequestState } from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

const initialState: UserRequestState = {
  requests: undefined,
  loading: false,
  setAction: initialSetActionState,
  observerReceivedFirstUpdate: false,
  error: undefined,
};

export default createReducer<UserRequestState>(
  {
    [SET.PENDING]: (state: UserRequestState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [SET.COMPLETED]: (state: UserRequestState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
    },
    [SET.REJECTED]: (
      state: UserRequestState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
    },
    [CHANGE_MODAL]: (
      state: UserRequestState,
      { payload }: { payload: boolean },
    ) => {
      state.setAction.modalState = payload;
      if (!payload) {
        state.setAction.success = false;
      }
    },
    [OBSERVE_REQUESTS.SUBSCRIBE]: (state: UserRequestState) => {
      state.loading = true;
    },
    [OBSERVE_REQUESTS.UPDATED]: (
      state: UserRequestState,
      {
        payload,
      }: {
        payload: firebase.firestore.QuerySnapshot<Request>;
      },
    ) => {
      // eslint-disable-next-line prefer-destructuring,
      state.requests = payload.docs.map(doc => doc.data());
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
  },
  initialState,
);

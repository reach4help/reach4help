import { firestore } from 'firebase';
import createReducer from 'src/store/utils/createReducer';

import { GET, ProfileState, SET, UPDATE } from './types';

const initialState: ProfileState = {
  profile: undefined,
  uid: undefined,
  loading: false,
  setAction: undefined,
  updateAction: undefined,
  error: undefined,
};

export default createReducer<ProfileState>(
  {
    [GET.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [GET.COMPLETED]: (
      state: ProfileState,
      { payload }: { payload: firestore.DocumentSnapshot },
    ) => {
      state.profile = payload.data();
      state.uid = payload.id;
      state.loading = false;
      state.error = undefined;
    },
    [GET.REJECTED]: (state: ProfileState, { payload }: { payload: Error }) => {
      state.error = payload;
      state.loading = false;
      state.profile = undefined;
      state.uid = undefined;
    },
    [SET.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [SET.COMPLETED]: (
      state: ProfileState,
      { payload }: { payload: Record<string, any> },
    ) => {
      state.error = undefined;
      state.loading = false;
      state.setAction = payload;
    },
    [SET.REJECTED]: (state: ProfileState, { payload }: { payload: Error }) => {
      state.loading = false;
      state.error = payload;
      state.setAction = undefined;
    },
    [UPDATE.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [UPDATE.COMPLETED]: (
      state: ProfileState,
      { payload }: { payload: Record<string, any> },
    ) => {
      state.error = undefined;
      state.loading = false;
      state.updateAction = payload;
    },
    [UPDATE.REJECTED]: (
      state: ProfileState,
      { payload }: { payload: Error },
    ) => {
      state.loading = false;
      state.error = payload;
      state.updateAction = undefined;
    },
  },
  initialState,
);

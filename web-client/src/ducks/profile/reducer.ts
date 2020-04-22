import { firestore } from 'firebase';
import createReducer from 'src/store/utils/createReducer';

import {
  GET,
  OBSERVE_PRIVILEGED,
  OBSERVE_PROFILE,
  ProfileState,
  SET,
  UPDATE,
} from './types';

const initialState: ProfileState = {
  profile: undefined,
  privilegedInformation: undefined,
  uid: undefined,
  loading: false,
  setAction: undefined,
  updateAction: undefined,
  observerReceivedFirstUpdate: false,
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
      {
        payload,
      }: { payload: [firestore.DocumentSnapshot, firestore.DocumentSnapshot] },
    ) => {
      state.profile = payload[0].data();
      state.privilegedInformation = payload[1]?.data();
      state.uid = payload[0].id;
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
    [SET.COMPLETED]: (state: ProfileState, { payload }: { payload: any }) => {
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
    [OBSERVE_PRIVILEGED.SUBSCRIBE]: (state: ProfileState) => {
      state.loading = true;
    },
    [OBSERVE_PRIVILEGED.UPDATED]: (
      state: ProfileState,
      {
        payload,
      }: {
        payload: Record<string, firebase.firestore.DocumentData | undefined>;
      },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.privilegedInformation = payload[0];
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
    [OBSERVE_PROFILE.SUBSCRIBE]: (state: ProfileState) => {
      state.loading = true;
    },
    [OBSERVE_PROFILE.UPDATED]: (
      state: ProfileState,
      {
        payload,
      }: {
        payload: Record<string, firebase.firestore.DocumentData | undefined>;
      },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.profile = payload[0];
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
  },
  initialState,
);

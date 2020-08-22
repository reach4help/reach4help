import { firestore } from 'firebase';
import { firestore as db } from 'src/firebase';
import { User, UserFirestoreConverter } from 'src/models/users';
import { PrivilegedUserInformation } from 'src/models/users/privilegedInformation';
import createReducer from 'src/store/utils/createReducer';

import {
  DELETE_AVATAR,
  DELETE_ME,
  GET,
  OBSERVE_PRIVILEGED,
  OBSERVE_PROFILE,
  ProfileState,
  SET,
  UPDATE,
  UPDATE_PRIVILEGED,
  UPLOAD_AVATAR,
} from './types';

const initialState: ProfileState = {
  profile: undefined,
  privilegedInformation: undefined,
  userRef: undefined,
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
      }: {
        payload: [
          firestore.DocumentSnapshot<User>,
          firestore.DocumentSnapshot<PrivilegedUserInformation>,
        ];
      },
    ) => {
      state.profile = payload[0].data();
      state.privilegedInformation = payload[1]?.data();
      state.userRef = db
        .collection('users')
        .doc(payload[0].id)
        .withConverter(UserFirestoreConverter);
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
    [UPDATE.COMPLETED]: (state: ProfileState) => {
      state.error = undefined;
      state.loading = false;
      state.updateAction = true;
    },
    [UPDATE.REJECTED]: (
      state: ProfileState,
      { payload }: { payload: Error },
    ) => {
      state.loading = false;
      state.error = payload;
      state.updateAction = undefined;
    },
    [UPDATE_PRIVILEGED.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [UPDATE_PRIVILEGED.COMPLETED]: (state: ProfileState) => {
      state.error = undefined;
      state.loading = false;
      state.updateAction = true;
    },
    [UPDATE_PRIVILEGED.REJECTED]: (
      state: ProfileState,
      { payload }: { payload: Error },
    ) => {
      state.loading = false;
      state.error = payload;
      state.updateAction = undefined;
    },
    [DELETE_ME.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [DELETE_ME.COMPLETED]: (state: ProfileState) => {
      state.error = undefined;
      state.loading = false;
      state.updateAction = true;
      // This is a bad practice as Reducers are not supposed to have side effects, but this is an exception to make things simpler
      window.location.href = '/';
    },
    [DELETE_ME.REJECTED]: (
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
        payload: firebase.firestore.DocumentSnapshot<PrivilegedUserInformation>;
      },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.privilegedInformation = payload.data();
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
        payload: firebase.firestore.DocumentSnapshot<User>;
      },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.profile = payload.data();
      state.userRef = db
        .collection('users')
        .doc(payload.id)
        .withConverter(UserFirestoreConverter);
      state.uid = payload.id;
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
    [UPLOAD_AVATAR.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [UPLOAD_AVATAR.COMPLETED]: (
      state: ProfileState,
      {
        payload,
      }: {
        payload: firestore.DocumentSnapshot<User>;
      },
    ) => {
      state.profile = payload.data();
      state.userRef = db
        .collection('users')
        .doc(payload.id)
        .withConverter(UserFirestoreConverter);
      state.uid = payload.id;
      state.loading = false;
      state.error = undefined;
    },
    [UPLOAD_AVATAR.REJECTED]: (
      state: ProfileState,
      { payload }: { payload: Error },
    ) => {
      state.error = payload;
      state.loading = false;
      state.profile = undefined;
      state.uid = undefined;
    },
    [DELETE_AVATAR.PENDING]: (state: ProfileState) => {
      state.loading = true;
      state.error = undefined;
    },
    [DELETE_AVATAR.COMPLETED]: (
      state: ProfileState,
      {
        payload,
      }: {
        payload: firestore.DocumentSnapshot<User>;
      },
    ) => {
      state.profile = payload.data();
      state.userRef = db
        .collection('users')
        .doc(payload.id)
        .withConverter(UserFirestoreConverter);
      state.uid = payload.id;
      state.loading = false;
      state.error = undefined;
    },
    [DELETE_AVATAR.REJECTED]: (
      state: ProfileState,
      { payload }: { payload: Error },
    ) => {
      state.error = payload;
      state.loading = false;
      state.profile = undefined;
      state.uid = undefined;
    },
  },
  initialState,
);

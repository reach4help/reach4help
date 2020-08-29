import firebase, { firebaseAuth } from 'src/firebase';
import createReducer from 'src/store/utils/createReducer';

import emailReducer from './email/reducer';
import facebookReducer from './facebook/reducer';
import googleReducer from './google/reducer';
import phoneReducer from './phone/reducer';
import { AuthState, LOGOUT, OBSERVE_USER, SET_ONBOARDED } from './types';

const initialState: AuthState = {
  loading: false,
  checkEmail: undefined,
  onboarded: false,
  error: undefined,
  user: firebaseAuth.currentUser,
  confirmationResult: undefined,
  observerReceivedFirstUpdate: false,
};
export default createReducer<AuthState>(
  {
    ...facebookReducer,
    ...phoneReducer,
    ...emailReducer,
    ...googleReducer,
    [OBSERVE_USER.SUBSCRIBE]: (state: AuthState) => {
      state.loading = true;
    },
    [OBSERVE_USER.UPDATED]: (
      state: AuthState,
      { payload }: { payload: firebase.User },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.user = payload;
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
    [LOGOUT.PENDING]: (state: AuthState) => {
      state.loading = true;
    },
    [LOGOUT.REJECTED]: (state: AuthState, { payload }: { payload: Error }) => {
      state.loading = false;
      state.error = payload;
    },
    [LOGOUT.COMPLETED]: (state: AuthState) => {
      state.loading = false;
      state.user = undefined;
      state.confirmationResult = undefined;
    },
    [SET_ONBOARDED]: (state: AuthState, { payload }: { payload: boolean }) => {
      state.onboarded = payload;
    },
  },
  initialState,
);

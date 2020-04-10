import merge from 'lodash/merge';
import firebase, { firebaseAuth } from 'src/firebase';
import createReducer from 'src/store/utils/createReducer';

import facebookReducer from './facebook/reducer';
import phoneReducer from './phone/reducer';
import { AuthState, OBSERVE_USER } from './types';

const initialState: AuthState = {
  loading: false,
  error: undefined,
  user: firebaseAuth.currentUser,
  confirmationResult: undefined,
  observerReceivedFirstUpdate: false,
};
export default createReducer<AuthState>(
  merge(facebookReducer, phoneReducer, {
    [OBSERVE_USER.SUBSCRIBE]: (state: AuthState) => {
      state.loading = true;
    },
    [OBSERVE_USER.UPDATED]: (
      state: AuthState,
      { payload }: { payload: Record<string, firebase.User | null> },
    ) => {
      // eslint-disable-next-line prefer-destructuring
      state.user = payload[0];
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
  }),
  initialState,
);

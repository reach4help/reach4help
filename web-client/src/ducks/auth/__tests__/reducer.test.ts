// import firebase from '../../../firebase';
import firebase, { firestore } from 'firebase';

import { IUser, User } from '../../../models/users';
import reducer from '../reducer';
import { AuthState, OBSERVE_USER } from '../types';

interface CombinedUser extends firebase.User, User {}

const buildUser = (overrides?: IUser | undefined): Partial<CombinedUser> =>
  User.factory({
    username: 'test',
    applicationPreference: null,
    pinQuestionnaireRef: null,
    cavQuestionnaireRef: null,
    casesCompleted: 0,
    requestsMade: 0,
    pinRatingsReceived: 0,
    cavRatingsReceived: 0,
    averageRating: 0,
    displayName: 'test',
    displayPicture: 'test',
    createdAt: firestore.Timestamp.now(),
    ...overrides,
  });

const buildState = (
  overrides?: Partial<AuthState> | undefined,
): Omit<AuthState, 'user'> & { user: CombinedUser } => ({
  loading: false,
  checkEmail: undefined,
  onboarded: false,
  error: undefined,
  user: buildUser(),
  confirmationResult: undefined,
  observerReceivedFirstUpdate: false,
  ...overrides,
});

// export interface Action {
//     type: string;
//     payload?: any;
//     meta?: any;
//     api?: Function;
//     firebase?: Function;
//   }

describe('Auth Reducer', () => {
  it('Should set state to "loading" after subscribing', () => {
    const initialState = buildState();

    const newState = reducer(initialState, { type: OBSERVE_USER.SUBSCRIBE });

    expect(newState.loading).toBe(true);
  });

  it('Should update the auth state', () => {
    const ORIGINAL_USERNAME = 'SHOULD NOT APPEAR AFTER UPDATE';
    const UPDATED_USERNAME = 'NEW USERNAME';

    const stateToUpdate = buildState({
      loading: true,
      user: buildUser({
        username: ORIGINAL_USERNAME,
      }) as CombinedUser,
    });

    expect(stateToUpdate.loading).toBe(true);
    expect(stateToUpdate.user.username).toBe(ORIGINAL_USERNAME);

    const newState = reducer(stateToUpdate, {
      type: OBSERVE_USER.UPDATED,
      payload: buildUser({ username: UPDATED_USERNAME }),
    });

    expect(newState.loading).toBe(false);
    expect(newState.user.username).toBe(UPDATED_USERNAME);
    expect(newState.observerReceivedFirstUpdate).toBe(true);
  });
});

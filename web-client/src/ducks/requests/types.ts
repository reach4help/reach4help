import { Request } from 'src/models/requests';
import { ApplicationPreference, User } from 'src/models/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'REQUESTS',
);

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const OBSERVE_OPEN_REQUESTS = observerType('OBSERVE_OPEN_REQUESTS');

export const SET = asyncType('SET');

export const UPDATE = asyncType('UPDATE');

export interface RequestState {
  openRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Request[];
    error?: Error;
  };
  ongoingRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Request[];
    error?: Error;
  };
  closedRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Request[];
    error?: Error;
  };
  completedRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Request[];
    error?: Error;
  };
  setAction: {
    success: boolean;
    loading: boolean;
    modalState: boolean;
    error?: Error;
  };
}

export interface IgetOpenRequests {
  userRef?: firebase.firestore.DocumentReference<User>;
  userType: ApplicationPreference;
}

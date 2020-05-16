import { Request, RequestStatus } from 'src/models/requests';
import { ApplicationPreference, User } from 'src/models/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'REQUESTS',
);

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const OBSERVE_OPEN_REQUESTS = observerType('OBSERVE_OPEN_REQUESTS');

export const OBSERVE_ONGOING_REQUESTS = observerType(
  'OBSERVE_ONGOING_REQUESTS',
);

export const OBSERVE_ACCEPTED_REQUESTS = observerType(
  'OBSERVE_ACCEPTED_REQUESTS',
);

export const OBSERVE_COMPLETED_REQUESTS = observerType(
  'OBSERVE_COMPLETED_REQUESTS',
);

export const OBSERVE_FINISHED_REQUESTS = observerType(
  'OBSERVE_FINISHED_REQUESTS',
);

export const OBSERVE_CANCELLED_REQUESTS = observerType(
  'OBSERVE_CANCELLED_REQUESTS',
);

export const OBSERVE_CLOSED_REQUESTS = observerType('OBSERVE_CLOSED_REQUESTS');

export const SET = asyncType('SET');

export const UPDATE = asyncType('UPDATE');

export interface RequestState {
  openRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  ongoingRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  acceptedRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  closedRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  completedRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  finishedRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  cancelledRequests: {
    observerReceivedFirstUpdate: boolean;
    loading: boolean;
    data?: Record<string, Request>;
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

export interface IgetNonOpenRequests {
  userRef: firebase.firestore.DocumentReference<User>;
  userType: ApplicationPreference;
  requestStatus: RequestStatus;
}

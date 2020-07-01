import { Request, RequestStatus } from 'src/models/requests';
import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
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

export const OBSERVE_COMPLETED_REQUESTS = observerType(
  'OBSERVE_COMPLETED_REQUESTS',
);

export const OBSERVE_CANCELLED_REQUESTS = observerType(
  'OBSERVE_CANCELLED_REQUESTS',
);

export const OBSERVE_REMOVED_REQUESTS = observerType(
  'OBSERVE_REMOVED_REQUESTS',
);

export const SET = asyncType('SET');
export const RESET_SET = syncType('RESET_SET');

export const GET_OPEN = asyncType('GET_OPEN');
export const GET_ACCEPTED = asyncType('GET_ACCEPTED');
export const GET_ONGOING = asyncType('GET_ONGOING');
export const GET_FINISHED = asyncType('GET_FINISHED');
export const GET_ARCHIVED = asyncType('GET_ARCHIVED');

export const UPDATE = asyncType('UPDATE');

export interface RequestState {
  syncOpenRequestsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  syncAcceptedRequestsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  syncOngoingRequestsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  syncFinishedRequestsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  syncArchivedRequestsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
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
  removedRequests: {
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
  updateAction: {
    success: boolean;
    loading: boolean;
    modalState: boolean;
    error?: Error;
  };
}

export interface IgetOpenRequests {
  userRef?: firebase.firestore.DocumentReference<User>;
  lat?: number;
  lng?: number;
  userType: ApplicationPreference;
}

export interface IgetNonOpenRequests {
  userRef: firebase.firestore.DocumentReference<User>;
  userType: ApplicationPreference;
  requestStatus: RequestStatus;
}

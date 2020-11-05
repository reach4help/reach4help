import { Request } from 'src/models/requests';
import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
import { ApplicationPreference, User } from 'src/models/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'REQUESTS',
);

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const OBSERVE_OPEN_POSTS = observerType('OBSERVE_OPEN_POSTS');

export const OBSERVE_ONGOING_POSTS = observerType('OBSERVE_ONGOING_POSTS');

export const OBSERVE_COMPLETED_POSTS = observerType('OBSERVE_COMPLETED_POSTS');

export const OBSERVE_CANCELLED_POSTS = observerType('OBSERVE_CANCELLED_POSTS');

export const OBSERVE_REMOVED_POSTS = observerType('OBSERVE_REMOVED_POSTS');

export const SET = asyncType('SET');
export const RESET_SET = syncType('RESET_SET');
export const RESET_REQUEST_POST = syncType('RESET_REQUEST_POST');
export const RESET_OFFER_POST = syncType('RESET_OFFER_POST');

export const GET_REQUEST_POST = asyncType('GET_REQUEST_POST');
export const GET_OFFER_POST = asyncType('GET_OFFER_POST');

export const UPDATE = asyncType('UPDATE');

export const SET_TEMP_REQUEST = syncType('SET_TEMP_REQUEST');

export interface PostState {
  syncRequestPostsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  syncOfferPostsState: {
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
  newRequestTemp?: {
    requestPayload: Request;
    requestId: string;
  };
}

export interface IgetRequestPosts {
  userRef?: firebase.firestore.DocumentReference<User>;
  lat?: number;
  lng?: number;
  userType: ApplicationPreference;
}

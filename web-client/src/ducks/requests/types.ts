import { Request } from 'src/models/requests';
import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
import { ApplicationPreference, User } from 'src/models/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'REQUESTS',
);

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const SET = asyncType('SET');
export const RESET_SET = syncType('RESET_SET');
export const RESET_FIND_REQUEST_POSTS = syncType('RESET_FIND_REQUEST_POSTS');
export const RESET_PIN_REQUEST_POSTS = syncType('RESET_PIN_REQUEST_POSTS');
export const RESET_CAV_REQUEST_POSTS = syncType('RESET_CAV_REQUEST_POSTS');

export const GET_FIND_POSTS = asyncType('GET_FIND_POSTS');
export const GET_PIN_REQUEST_POSTS = asyncType('GET_PIN_REQUEST_POSTS');
export const GET_REQUEST_WITH_OFFERS_AND_TIMELINES = asyncType(
  'GET_REQUEST_WITH_OFFERS_AND_TIMELINES',
);
export const GET_CAV_REQUEST_POSTS = asyncType('GET_CAV_REQUEST_POSTS');

export const UPDATE = asyncType('UPDATE');

export const SET_TEMP_REQUEST = syncType('SET_TEMP_REQUEST');

export interface PostState {
  syncFindPostsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  syncMyPinRequestPostsState: {
    loading: boolean;
    data?: Record<string, Request>;
    error?: Error;
  };
  syncPostWithOffersAndTimelinesState: {
    loading: boolean;
    data?: RequestWithOffersAndTimeline;
    error?: Error;
  };
  syncCavRequestPostsState: {
    loading: boolean;
    data?: Record<string, RequestWithOffersAndTimeline>;
    error?: Error;
  };
  // // TODO: (es) Do we need these?
  // openRequests: {
  //   observerReceivedFirstUpdate: boolean;
  //   loading: boolean;
  //   data?: Record<string, Request>;
  //   error?: Error;
  // };
  // ongoingRequests: {
  //   observerReceivedFirstUpdate: boolean;
  //   loading: boolean;
  //   data?: Record<string, Request>;
  //   error?: Error;
  // };
  // removedRequests: {
  //   observerReceivedFirstUpdate: boolean;
  //   loading: boolean;
  //   data?: Record<string, Request>;
  //   error?: Error;
  // };
  // completedRequests: {
  //   observerReceivedFirstUpdate: boolean;
  //   loading: boolean;
  //   data?: Record<string, Request>;
  //   error?: Error;
  // };
  // cancelledRequests: {
  //   observerReceivedFirstUpdate: boolean;
  //   loading: boolean;
  //   data?: Record<string, Request>;
  //   error?: Error;
  // };
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

export interface IgetMyPosts {
  userRef: firebase.firestore.DocumentReference<User>;
  status?: string;
}

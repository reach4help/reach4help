import { Post } from 'src/models/posts';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType, syncType } = createActionTypeFactory('POSTS');

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const OBSERVE_CREATE_GENERAL_REQUEST = asyncType(
  'OBSERVE_CREATE_GENERAL_REQUEST',
);
export const OBSERVE_UPDATE_GENERAL_REQUEST = asyncType(
  'UPDATE_GENERAL_REQUEST',
);
export const RESET_UPDATE_GENERAL_REQUEST = syncType(
  'RESET_UPDATE_GENERAL_REQUEST',
);

export const OBSERVE_GET_MY_REQUESTS = observerType('OBSERVE_GET_MY_REQUESTS');
export const OBSERVE_GET_MY_OFFERS = observerType('OBSERVE_MY_OFFERS');

export const UPDATE_TEMP_REQUEST = syncType('SET_TEMP_REQUEST');

export interface PostState {
  myRequests: {
    loading: boolean;
    data?: Record<string, Post>;
    observerReceivedFirstUpdate: boolean;
    error?: Error;
  };
  myOffers: {
    loading: boolean;
    data?: Record<string, Post>;
    observerReceivedFirstUpdate: boolean;
    error?: Error;
  };
  setAction: {
    success: boolean;
    loading: boolean;
    modalState: boolean;
    error?: Error;
  };
  newRequestTemp?: {
    requestPayload: Post;
    requestId: string;
  };
}

import { Post } from 'src/models/posts';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType, syncType } = createActionTypeFactory('POSTS');

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const DISPATCH_CREATE_PUBLIC_REQUEST = asyncType(
  'DISPATCH_CREATE_PUBLIC_REQUEST',
);
export const OBSERVE_UPDATE_PUBLIC_REQUEST = asyncType('UPDATE_PUBLIC_REQUEST');
export const RESET_UPDATE_PUBLIC_REQUEST = syncType(
  'RESET_UPDATE_PUBLIC_REQUEST',
);

export const OBSERVE_GET_MY_REQUESTS = observerType('OBSERVE_GET_MY_REQUESTS');

export const UPDATE_TEMP_REQUEST = syncType('SET_TEMP_REQUEST');

export interface RequestState {
  myRequests: {
    loading: boolean;
    data?: Record<string, Post>;
    observerReceivedFirstUpdate: boolean;
    error?: Error;
  };
  setAction: {
    success?: boolean;
    loading: boolean;
    modalState: boolean;
    error?: Error;
  };
  newRequestTemp?: {
    requestPayload: Post;
    requestId: string;
  };
}

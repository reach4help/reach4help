import { Post } from 'src/models/posts';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { observerType } = createActionTypeFactory('MY_REQUESTS');

export const OBSERVE = observerType('OBSERVE');

export interface MyRequestsState {
  myRequests: {
    loading: boolean;
    data?: Record<string, Post>;
    observerReceivedFirstUpdate: boolean;
    error?: Error;
  };
}

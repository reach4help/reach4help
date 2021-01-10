import { Post } from 'src/models/Post';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType } = createActionTypeFactory('POSTS');

export const OBSERVE_MY_REQUESTS = observerType('OBSERVE_MY_REQUESTS');
export const OBSERVE_MY_OFFERS = observerType('OBSERVE_MY_OFFERS');

export const UPDATE = asyncType('UPDATE');

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
}

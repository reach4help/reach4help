import { Post } from 'src/models/posts/Post';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType, syncType } = createActionTypeFactory(
  'MY_OFFERS',
);

export const CREATE = asyncType('CREATE');
export const UPDATE = asyncType('UPDATE');
export const RESET_UPDATE = syncType('RESET_UPDATE');

export const OBSERVE = observerType('OBSERVE');

export interface MyOffersState {
  myOffers: {
    loading: boolean;
    data?: Record<string, Post>;
    observerReceivedFirstUpdate: boolean;
    error?: Error;
  };
  setAction: {
    success?: boolean;
    loading: boolean;
    error?: Error;
  };
}

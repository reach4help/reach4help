import { Post } from 'src/models/posts';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType, syncType } = createActionTypeFactory('POSTS');

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const SET = asyncType('SET');
export const RESET_SET = syncType('RESET_SET');

export const OBSERVE_ALL_MY_OFFERS = observerType('OBSERVE_ALL_MY_OFFERS');

export const UPDATE = asyncType('UPDATE');

export const SET_TEMP_OFFER = syncType('SET_TEMP_OFFER');

export interface OfferState {
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
  newOfferTemp?: {
    offerPayload: Post;
    offerId: string;
  };
}

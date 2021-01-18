import { Post } from 'src/models/posts';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType, syncType } = createActionTypeFactory('POSTS');

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const DISPATCH_CREATE_GENERAL_OFFER = asyncType(
  'DISPATCH_CREATE_GENERAL_OFFER',
);
export const OBSERVE_UPDATE_GENERAL_OFFER = asyncType('UPDATE_GENERAL_OFFER');
export const RESET_UPDATE_GENERAL_OFFER = syncType(
  'RESET_UPDATE_GENERAL_OFFER',
);

export const OBSERVE_GET_MY_OFFERS = observerType('OBSERVE_MY_OFFERS');

export const UPDATE_TEMP_OFFER = syncType('SET_TEMP_OFFER');

export interface OfferState {
  myOffers: {
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
  newOfferTemp?: {
    offerPayload: Post;
    offerId: string;
  };
}

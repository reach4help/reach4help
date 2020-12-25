import { Post } from 'src/models/posts';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType, observerType, syncType } = createActionTypeFactory('POSTS');

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const SET = asyncType('SET');
export const RESET_SET = syncType('RESET_SET');

export const OBSERVE_ALL_FIND_REQUESTS = observerType('OBSERVE_ALL_FIND_REQUESTS');

export const UPDATE = asyncType('UPDATE');

export const SET_TEMP_FIND_REQUESTS = syncType('SET_TEMP_FIND_RQUESTS');

export interface FindRequestState {
  myFindPosts: {
    loading: boolean;
    data?: Record<string, Post>;
    observerReceivedFirstUpdate: boolean;
    error?: Error;
  };
}

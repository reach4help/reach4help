import { Post } from 'src/models/posts';
import createReducer from 'src/store/utils/createReducer';

import {
  FindRequestState,
  OBSERVE_ALL_FIND_REQUESTS,
} from './types';

const initialState: FindRequestState = {
  myFindPosts: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
};

export default createReducer<FindRequestState>(
  {
    [OBSERVE_ALL_FIND_REQUESTS.SUBSCRIBE]: (state: FindRequestState) => {
      state.myFindPosts.loading = true;
    },
    [OBSERVE_ALL_FIND_REQUESTS.UPDATED]: (
      state: FindRequestState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
    ) => {
      state.myFindPosts.loading = false;
      state.myFindPosts.observerReceivedFirstUpdate = true;
      state.myFindPosts.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myFindPosts.error = undefined;
    },
    [OBSERVE_ALL_FIND_REQUESTS.ERROR]: (
      state: FindRequestState,
      { payload }: { payload: Error },
    ) => {
      state.myFindPosts.loading = false;
      state.myFindPosts.error = payload;
    },
    [OBSERVE_ALL_FIND_REQUESTS.SUBSCRIBE]: (state: FindRequestState) => {
      state.myFindPosts.loading = true;
    },
    [OBSERVE_ALL_FIND_REQUESTS.UPDATED]: (
      state: FindRequestState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
    ) => {
      state.myFindPosts.loading = false;
      state.myFindPosts.observerReceivedFirstUpdate = true;
      state.myFindPosts.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myFindPosts.error = undefined;
    },
    [OBSERVE_ALL_FIND_REQUESTS.ERROR]: (
      state: FindRequestState,
      { payload }: { payload: Error },
    ) => {
      state.myFindPosts.loading = false;
      state.myFindPosts.error = payload;
    },
  },
  initialState,
);

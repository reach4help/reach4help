import { Post } from 'src/models/posts/Post';
import createReducer from 'src/store/utils/createReducer';

import { MyRequestsState, OBSERVE } from './types';

const initialState: MyRequestsState = {
  myRequests: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
};

export default createReducer<MyRequestsState>(
  {
    [OBSERVE.SUBSCRIBE]: (state: MyRequestsState) => {
      state.myRequests.loading = true;
    },
    [OBSERVE.UPDATED]: (
      state: MyRequestsState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
    ) => {
      state.myRequests.loading = false;
      state.myRequests.observerReceivedFirstUpdate = true;
      state.myRequests.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myRequests.error = undefined;
    },
    [OBSERVE.ERROR]: (
      state: MyRequestsState,
      { payload }: { payload: Error },
    ) => {
      state.myRequests.loading = false;
      state.myRequests.error = payload;
    },
  },
  initialState,
);

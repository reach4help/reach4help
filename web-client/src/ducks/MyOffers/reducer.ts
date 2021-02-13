import { Post } from 'src/models/posts';
import createReducer from 'src/store/utils/createReducer';

import {
  CREATE,
  OBSERVE,
  UPDATE,
  MyOffersState,
  RESET_UPDATE,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
};

const initialState: MyOffersState = {
  setAction: initialSetActionState,
  myOffers: {
    loading: false,
    data: undefined,
    observerReceivedFirstUpdate: false,
    error: undefined,
  },
};

export default createReducer<MyOffersState>(
  {
    [CREATE.PENDING]: (state: MyOffersState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [CREATE.COMPLETED]: (
      state: MyOffersState,
      // { payload }: { payload: true },
    ) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
    },
    [CREATE.REJECTED]: (
      state: MyOffersState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = undefined;
    },
    [OBSERVE.SUBSCRIBE]: (state: MyOffersState) => {
      state.myOffers.loading = true;
    },
    [OBSERVE.UPDATED]: (
      state: MyOffersState,
      { payload }: { payload: firebase.firestore.QuerySnapshot<Post> },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.observerReceivedFirstUpdate = true;
      state.myOffers.data = payload.docs.reduce(
        (acc, obj) => ({
          ...acc,
          [obj.id]: obj.data(),
        }),
        {},
      );
      state.myOffers.error = undefined;
    },
    [OBSERVE.ERROR]: (
      state: MyOffersState,
      { payload }: { payload: Error },
    ) => {
      state.myOffers.loading = false;
      state.myOffers.error = payload;
    },
    [UPDATE.PENDING]: (state: MyOffersState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [UPDATE.COMPLETED]: (state: MyOffersState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
    },
    [UPDATE.REJECTED]: (
      state: MyOffersState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
    },
    [RESET_UPDATE]: (state: MyOffersState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.setAction.error = undefined;
    },
  },
  initialState,
);

import createReducer from 'src/store/utils/createReducer';

import { DISPATCH_CREATE_XSPECIFIC_OFFER, XSpecificOffersState } from './types';

const initialSetActionState = {
  loading: false,
  success: undefined,
  error: undefined,
  modalState: false,
};

const initialState: XSpecificOffersState = {
  forRequest: undefined,
  data: undefined,
  loading: false,
  error: undefined,
  observerReceivedFirstUpdate: false,
  setAction: initialSetActionState,
};

export default createReducer<XSpecificOffersState>(
  {
    [DISPATCH_CREATE_XSPECIFIC_OFFER.PENDING]: (
      state: XSpecificOffersState,
    ) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [DISPATCH_CREATE_XSPECIFIC_OFFER.COMPLETED]: (
      state: XSpecificOffersState,
      { payload }: { payload: true },
    ) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = payload;
    },
    [DISPATCH_CREATE_XSPECIFIC_OFFER.REJECTED]: (
      state: XSpecificOffersState,
      { payload }: { payload: Error },
    ) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = undefined;
    },
  },
  initialState,
);

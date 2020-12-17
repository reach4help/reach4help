import { TimelineItem } from 'src/models/requests/timeline';
import createReducer from 'src/store/utils/createReducer';

import { OBSERVE_TIMELINE, TimelineState } from './types';

const initialState: TimelineState = {
  loading: false,
  observerReceivedFirstUpdate: false,
  data: undefined,
  error: undefined,
};

export default createReducer<TimelineState>(
  {
    [OBSERVE_TIMELINE.SUBSCRIBE]: (state: TimelineState) => {
      state.loading = true;
    },
    [OBSERVE_TIMELINE.UPDATED]: (
      state: TimelineState,
      {
        payload,
      }: {
        payload: firebase.firestore.QuerySnapshot<TimelineItem>;
      },
    ) => {
      state.data = payload.docs.map(doc => doc.data());
      state.loading = false;
      state.observerReceivedFirstUpdate = true;
    },
    [OBSERVE_TIMELINE.ERROR]: (
      state: TimelineState,
      { payload }: { payload: Error },
    ) => {
      state.error = payload;
      state.loading = false;
    },
  },
  initialState,
);

import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
import { TimelineItem } from 'src/models/requests/timeline';
import createReducer from 'src/store/utils/createReducer';

import { PostState } from '../requests/types';
import { GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS, OBSERVE_TIMELINE, TimelineState } from './types';

const initialState: TimelineState = {
  loading: false,
  observerReceivedFirstUpdate: false,
  data: undefined,
  error: undefined,
};

export default createReducer<TimelineState>(
  {
    [GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS.PENDING]: (state: PostState) => {
      state.syncPostWithOffersAndTimelinesState.loading = true;
      state.syncPostWithOffersAndTimelinesState.data = undefined;
    },
    [GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: RequestWithOffersAndTimeline;
          };
        };
      },
    ) => {
      state.syncPostWithOffersAndTimelinesState.loading = false;
      state.syncPostWithOffersAndTimelinesState.error = undefined;
      const requestWithOffersAndTimeline: RequestWithOffersAndTimeline =
        payload.data.data;

      state.syncPostWithOffersAndTimelinesState.data = requestWithOffersAndTimeline;
    },
    [GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncMyPinRequestPostsState.data = undefined;
      state.syncMyPinRequestPostsState.loading = false;
      state.syncMyPinRequestPostsState.error = payload;
    },
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

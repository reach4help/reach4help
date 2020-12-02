// import TimelineItem from 'antd/lib/timeline/TimelineItem';
// import { OfferStatus } from 'src/models/offers';
import { IRequest, Request } from 'src/models/requests';
import {
  IRequestWithOffersAndTimelineItems,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
// import { TimelineItemAction } from 'src/models/requests/timeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_CAV_REQUEST_POSTS,
  GET_FIND_POSTS,
  GET_PIN_REQUEST_POSTS,
  GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS,
  PostState,
  RESET_CAV_REQUEST_POSTS,
  RESET_FIND_REQUEST_POSTS,
  RESET_PIN_REQUEST_POSTS,
  RESET_SET,
  SET,
  SET_TEMP_REQUEST,
} from './types';

const initialSetActionState = {
  loading: false,
  success: false,
  error: undefined,
  modalState: false,
};

// TODO: (es) const initialPostsState = {
//   loading: false,
//   observerReceivedFirstUpdate: false,
//   data: undefined,
//   error: undefined,
// };

const initialSyncPostsState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const initialState: PostState = {
  syncMyPinRequestPostsState: initialSyncPostsState,
  syncCavRequestPostsState: initialSyncPostsState,
  syncFindPostsState: initialSyncPostsState,
  syncPostWithOffersAndTimelinesState: initialSyncPostsState,
  // TODO: openRequests: initialPostsState,
  // ongoingRequests: initialPostsState,
  // completedRequests: initialPostsState,
  // cancelledRequests: initialPostsState,
  // removedRequests: initialPostsState,
  setAction: initialSetActionState,
  newRequestTemp: undefined,
};

export default createReducer<PostState>(
  {
    [GET_FIND_POSTS.PENDING]: (state: PostState) => {
      state.syncFindPostsState.loading = true;
      state.syncFindPostsState.data = undefined;
    },
    [GET_FIND_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, IRequestWithOffersAndTimelineItems>;
          };
        };
      },
    ) => {
      state.syncFindPostsState.loading = false;
      state.syncFindPostsState.error = undefined;
      const mappedData = Object.keys(payload.data.data).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
      state.syncFindPostsState.data = mappedData;
    },
    [GET_FIND_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncFindPostsState.data = undefined;
      state.syncFindPostsState.loading = false;
      state.syncFindPostsState.error = payload;
    },
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
    [GET_PIN_REQUEST_POSTS.PENDING]: (state: PostState) => {
      state.syncPostWithOffersAndTimelinesState.loading = true;
      state.syncPostWithOffersAndTimelinesState.data = undefined;
    },
    [GET_PIN_REQUEST_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, RequestWithOffersAndTimeline>;
          };
        };
      },
    ) => {
      state.syncPostWithOffersAndTimelinesState.loading = false;
      state.syncPostWithOffersAndTimelinesState.error = undefined;
      const requests: Record<string, Request> = {};
      const requestData = payload.data.data;
      for (const key in requestData) {
        // if (key) required by eslint guard-for-in rule
        if (key) {
          const r = requestData[key];
          requests[key] = Request.factoryFromUnderscore(r as IRequest);
        }
      }
      state.syncMyPinRequestPostsState.data = requests;
    },
    [GET_PIN_REQUEST_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncMyPinRequestPostsState.data = undefined;
      state.syncMyPinRequestPostsState.loading = false;
      state.syncMyPinRequestPostsState.error = payload;
    },
    [GET_CAV_REQUEST_POSTS.PENDING]: (state: PostState) => {
      state.syncCavRequestPostsState.loading = true;
      state.syncCavRequestPostsState.data = undefined;
    },
    [GET_CAV_REQUEST_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, IRequestWithOffersAndTimelineItems>;
          };
        };
      },
    ) => {
      state.syncCavRequestPostsState.loading = false;
      state.syncCavRequestPostsState.error = undefined;
      state.syncCavRequestPostsState.data = Object.keys(
        payload.data.data,
      ).reduce(
        (acc: Record<string, RequestWithOffersAndTimeline>, key: string) => ({
          ...acc,
          [key]: RequestWithOffersAndTimeline.factory(payload.data.data[key]),
        }),
        {},
      );
    },
    [GET_CAV_REQUEST_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncCavRequestPostsState.data = undefined;
      state.syncCavRequestPostsState.loading = false;
      state.syncCavRequestPostsState.error = payload;
    },
    [SET.PENDING]: (state: PostState) => {
      state.setAction.loading = true;
      state.setAction.error = undefined;
    },
    [SET.COMPLETED]: (state: PostState) => {
      state.setAction.error = undefined;
      state.setAction.loading = false;
      state.setAction.success = true;
      state.newRequestTemp = undefined;
    },
    [SET.REJECTED]: (state: PostState, { payload }: { payload: Error }) => {
      state.setAction.loading = false;
      state.setAction.error = payload;
      state.setAction.success = false;
      state.newRequestTemp = undefined;
    },
    [SET_TEMP_REQUEST]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          requestPayload: Request;
          requestId: string;
        };
      },
    ) => {
      state.newRequestTemp = payload;
    },
    [RESET_CAV_REQUEST_POSTS]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncCavRequestPostsState.data = undefined;
      state.syncCavRequestPostsState.loading = false;
    },
    [RESET_FIND_REQUEST_POSTS]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncFindPostsState.data = undefined;
      state.syncFindPostsState.loading = false;
    },
    [RESET_PIN_REQUEST_POSTS]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncMyPinRequestPostsState.data = undefined;
      state.syncMyPinRequestPostsState.loading = false;
    },
    [RESET_SET]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncMyPinRequestPostsState.data = undefined;
      state.syncMyPinRequestPostsState.loading = false;
      state.syncCavRequestPostsState.data = undefined;
      state.syncCavRequestPostsState.loading = false;
    },
    [CHANGE_MODAL]: (state: PostState, { payload }: { payload: boolean }) => {
      state.setAction.modalState = payload;
      if (!payload) {
        state.setAction.success = false;
      }
    },
  },
  initialState,
);

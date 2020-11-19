// import TimelineItem from 'antd/lib/timeline/TimelineItem';
// import { OfferStatus } from 'src/models/offers';
import { IRequest, Request } from 'src/models/requests';
import {
  IRequestWithOffersAndTimeline,
  RequestWithOffersAndTimeline,
} from 'src/models/requests/RequestWithOffersAndTimeline';
// import { TimelineItemAction } from 'src/models/requests/timeline';
import createReducer from 'src/store/utils/createReducer';

import {
  CHANGE_MODAL,
  GET_CAV_REQUEST_POSTS,
  GET_FIND_REQUEST_POSTS as GET_FIND_POSTS,
  GET_PIN_REQUEST_POSTS,
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

const initialPostsState = {
  loading: false,
  observerReceivedFirstUpdate: false,
  data: undefined,
  error: undefined,
};

const initialSyncPostsState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const initialState: PostState = {
  syncPinRequestPostsState: initialSyncPostsState,
  syncCavRequestPostsState: initialSyncPostsState,
  syncFindPostsState: initialSyncPostsState,
  openRequests: initialPostsState,
  ongoingRequests: initialPostsState,
  completedRequests: initialPostsState,
  cancelledRequests: initialPostsState,
  removedRequests: initialPostsState,
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
            data: Record<string, IRequestWithOffersAndTimeline>;
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
    [GET_PIN_REQUEST_POSTS.PENDING]: (state: PostState) => {
      state.syncPinRequestPostsState.loading = true;
      state.syncPinRequestPostsState.data = undefined;
    },
    [GET_PIN_REQUEST_POSTS.COMPLETED]: (
      state: PostState,
      {
        payload,
      }: {
        payload: {
          data: {
            status: boolean;
            data: Record<string, Request>;
          };
        };
      },
    ) => {
      state.syncPinRequestPostsState.loading = false;
      state.syncPinRequestPostsState.error = undefined;
      const requestsWithOffers: Record<
        string,
        RequestWithOffersAndTimeline
      > = {};
      const requestData = payload.data.data;
      const requestsArray = Object.keys(requestData).map(
        key => requestData[key],
      );
      for (const request of requestsArray) {
        // console.log('doc.data: ', JSON.stringify(doc.data()));
        // eslint-disable-next-line no-await-in-loop
        // const timeline = await getTimelineForRequest(doc.ref, userRef);
        // const mapping: Record<string, boolean> = {};
        // for (const timelineDoc of timeline) {
        // console.log('timelinedoc being parsed: ', JSON.stringify(timelineDoc));
        // console.log('timelineDoc.actorRef: ', timelineDoc.actorRef);
        //   const timelineInstance = TimelineItem.factory(timelineDoc);
        //   if (
        //     timelineInstance.action === TimelineItemAction.CREATE_OFFER &&
        //     timelineInstance.offerRef &&
        //     timelineInstance.offerSnapshot?.status === OfferStatus.pending
        //   ) {
        //     if (mapping[timelineInstance.offerRef.id] !== false) {
        //       mapping[timelineInstance.offerRef.id] = true;
        //     }
        //     // break;
        //   }
        //   if (timelineInstance.action === TimelineItemAction.REJECT_OFFER && timelineInstance.offerRef) {
        //     mapping[timelineInstance.offerRef.id] = false;
        //   }
        // }
        // let num = 0;
        // for (const k in mapping) {
        //   if (mapping[k]) {
        //     num += 1;
        //   }
        // }
        // if (num === 0) {
        requestsWithOffers[request.id] = RequestWithOffersAndTimeline.factory({
          ...(request as IRequest),
          offers: {},
          timeline: {},
        } as IRequestWithOffersAndTimeline);
        // }
      }
      state.syncPinRequestPostsState.data = requestsWithOffers;
    },
    [GET_PIN_REQUEST_POSTS.REJECTED]: (
      state: PostState,
      { payload }: { payload: Error },
    ) => {
      state.syncPinRequestPostsState.data = undefined;
      state.syncPinRequestPostsState.loading = false;
      state.syncPinRequestPostsState.error = payload;
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
            data: Record<string, IRequestWithOffersAndTimeline>;
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
      state.syncPinRequestPostsState.data = undefined;
      state.syncPinRequestPostsState.loading = false;
    },
    [RESET_SET]: (state: PostState) => {
      state.setAction.loading = false;
      state.setAction.success = false;
      state.syncPinRequestPostsState.data = undefined;
      state.syncPinRequestPostsState.loading = false;
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

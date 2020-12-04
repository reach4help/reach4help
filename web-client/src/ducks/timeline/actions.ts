import { User } from 'src/models/users';

import { getPostWithOffersAndTimelineItems as getPostWithOffersAndTimelineItemsFunc,
         getTimelinesForPost as getTimelinesForPostFunc } from './functions';
import { GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS, GET_TIMELINES_FOR_POST, RESET_TIMELINES_FOR_POST } from './types';

/**
 * Selects request posts for specified user
 * @param [IgetRequestPosts] payload - WHERE clause values
 */
export const getPostWithOffersAndTimelineItems = (payload:
  { userRef: firebase.firestore.DocumentReference<User>;
    status?: string;
   }) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_POST_WITH_OFFERS_AND_TIMELINE_ITEMS,
    firebase: getPostWithOffersAndTimelineItemsFunc,
    payload,
  });

export const getTimelinesForPost = (payload: { postId: string }) => (
  dispatch: Function,
) =>
  dispatch({
    type: GET_TIMELINES_FOR_POST,
    firebase: getTimelinesForPostFunc,
    payload,
  });

export const resetTimelinesForPostState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_TIMELINES_FOR_POST,
    payload: true,
  });

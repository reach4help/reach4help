import { DataReferenceType } from '../../types';
import { getTimelinesForPost as getTimelinesForPostFunc } from './functions';
import { GET_TIMELINES_FOR_POST, RESET_TIMELINES_FOR_POST } from './types';

export const getTimelinesForPost = (payload: {postRef: DataReferenceType}) => (
    dispatch: Function,
  ) =>
    dispatch({
      type: GET_TIMELINES_FOR_POST,
      firebase: getTimelinesForPostFunc,
      payload,
    });

export const resetPinRequestPostsState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_TIMELINES_FOR_POST,
    payload: true,
  });


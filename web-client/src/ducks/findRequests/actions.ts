import { observeFindRequests as observeFindRequestsFunc } from './functions';
import { CHANGE_MODAL, OBSERVE_ALL_FIND_REQUESTS, RESET_SET } from './types';

export const observeFindRequests = (
  dispatch: Function,
  {
    lat,
    lng,
  }: {
    lat?: number;
    lng?: number;
  },
): Function => {
  dispatch({
    type: OBSERVE_ALL_FIND_REQUESTS,
    observer: observeFindRequestsFunc,
    payload: {
      lat,
      lng,
    },
  });
  return () =>
    dispatch({
      type: OBSERVE_ALL_FIND_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_ALL_FIND_REQUESTS,
    });
};

export const resetSetRequestState = () => (dispatch: Function) =>
  dispatch({
    type: RESET_SET,
    payload: true,
  });

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

import { IRequest, Request, RequestStatus } from 'src/models/requests';

import {
  createUserRequest,
  observeNonOpenRequests as observeNonOpenRequestsFunc,
  observeOpenRequests as observeOpenRequestsFunc,
  setUserRequest,
  updateUserRequest,
} from './functions';
import {
  CHANGE_MODAL,
  IgetNonOpenRequests,
  IgetOpenRequests,
  IupdateRequest,
  OBSERVE_CANCELLED_REQUESTS,
  OBSERVE_COMPLETED_REQUESTS,
  OBSERVE_ONGOING_REQUESTS,
  OBSERVE_OPEN_REQUESTS,
  OBSERVE_REMOVED_REQUESTS,
  SET,
  UPDATE,
} from './types';

const requestStatusMapper = {
  [RequestStatus.ongoing]: OBSERVE_ONGOING_REQUESTS,
  [RequestStatus.completed]: OBSERVE_COMPLETED_REQUESTS,
  [RequestStatus.cancelled]: OBSERVE_CANCELLED_REQUESTS,
  [RequestStatus.removed]: OBSERVE_REMOVED_REQUESTS,
};

export const observeOpenRequests = (
  dispatch: Function,
  payload: IgetOpenRequests,
): (() => void) => {
  dispatch({
    type: OBSERVE_OPEN_REQUESTS,
    observer: observeOpenRequestsFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_OPEN_REQUESTS.UNSUBSCRIBE,
      observerName: OBSERVE_OPEN_REQUESTS,
    });
};

export const observeNonOpenRequests = (
  dispatch: Function,
  payload: IgetNonOpenRequests,
): (() => void) => {
  dispatch({
    type: requestStatusMapper[payload.requestStatus],
    observer: observeNonOpenRequestsFunc,
    payload,
  });

  return () =>
    dispatch({
      type: requestStatusMapper[payload.requestStatus].UNSUBSCRIBE,
      observerName: requestStatusMapper[payload.requestStatus],
    });
};

export const setRequest = (payload: IRequest, requestId?: string) => (
  dispatch: Function,
) => {
  const requestPayload = Request.factory({
    ...payload,
  });

  dispatch({
    type: SET,
    payload: {
      requestPayload,
      requestId,
    },
    firebase: requestId ? setUserRequest : createUserRequest,
  });
};

export const updateRequest = ({
  requestId,
  fieldsToUpdate,
}: IupdateRequest) => (dispatch: Function) => {
  dispatch({
    type: UPDATE,
    payload: {
      requestId,
      fieldsToUpdate,
    },
    firebase: updateUserRequest,
  });
};

export const changeModal = state => (dispatch: Function) =>
  dispatch({
    type: CHANGE_MODAL,
    payload: state,
  });

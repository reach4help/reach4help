import { Request } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'PROFILE',
);

export const CHANGE_MODAL = syncType('CHANGE_MODAL');

export const OBSERVE_REQUESTS = observerType('OBSERVE_REQUESTS');

export const SET = asyncType('SET');

export const UPDATE = asyncType('UPDATE');

export interface UserRequestState {
  requests: Request[] | undefined;
  setAction: {
    success: boolean;
    loading: boolean;
    error?: Error;
    modalState: boolean;
  };
  observerReceivedFirstUpdate: boolean;
  loading: boolean;
  error?: Error;
}

export interface IgetUserRequests {
  uid: string;
  userType: ApplicationPreference;
}

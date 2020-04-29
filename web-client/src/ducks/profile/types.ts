import { User } from 'src/models/users';
import { PrivilegedUserInformation } from 'src/models/users/privilegedInformation';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType } = createActionTypeFactory('PROFILE');

export const GET = asyncType('GET');

export const OBSERVE_PROFILE = observerType('OBSERVE_PROFILE');
export const OBSERVE_PRIVILEGED = observerType('OBSERVE_PRIVILEGED');

export const SET = asyncType('SET');

export const UPDATE = asyncType('UPDATE');

export interface ProfileState {
  profile: User | undefined;
  privilegedInformation: PrivilegedUserInformation | undefined;
  uid: string | undefined;
  setAction: Record<string, any> | undefined;
  updateAction: Record<string, any> | undefined;
  observerReceivedFirstUpdate: boolean;
  loading: boolean;
  error?: Error;
}

export interface IgetUserProfile {
  uid: string;
}

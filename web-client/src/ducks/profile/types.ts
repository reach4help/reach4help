import { User } from 'src/models/users';
import { PrivilegedUserInformation } from 'src/models/users/privilegedInformation';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType } = createActionTypeFactory('PROFILE');

export const DELETE_ME = asyncType('DELETE_ME');

export const GET = asyncType('GET');

export const OBSERVE_PROFILE = observerType('OBSERVE_PROFILE');
export const OBSERVE_PRIVILEGED = observerType('OBSERVE_PRIVILEGED');

export const SET = asyncType('SET');

export const UPDATE = asyncType('UPDATE');
export const UPDATE_PRIVILEGED = asyncType('UPDATE_PRIVILEGED');

export const UPLOAD_AVATAR = asyncType('UPLOAD');
export const DELETE_AVATAR = asyncType('DELETE_AVATAR');

export interface ProfileState {
  profile?: User;
  privilegedInformation?: PrivilegedUserInformation;
  userRef?: firebase.firestore.DocumentReference<User>;
  uid?: string;
  setAction?: Record<string, any>;
  updateAction?: boolean;
  observerReceivedFirstUpdate: boolean;
  privilegedObserverReceivedFirstUpdate: boolean;
  loading: boolean;
  error?: Error;
}

export interface IgetUserProfile {
  uid: string;
}

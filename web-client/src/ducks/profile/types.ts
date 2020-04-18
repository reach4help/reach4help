import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType } = createActionTypeFactory('PROFILE');

export const GET = asyncType('GET');

export const UPDATE = asyncType('UPDATE');

export const SET = asyncType('SET');

export interface ProfileState {
  profile: firebase.firestore.DocumentData | undefined;
  uid: string | undefined;
  setAction: Record<string, any> | undefined;
  updateAction: Record<string, any> | undefined;
  loading: boolean;
  error?: Error;
}

export interface IgetUserProfile {
  uid: string;
}

import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'AUTH',
);

export const LOGIN = asyncType('LOGIN');
export const LOGOUT = asyncType('LOGOUT');

export const OBSERVE_USER = observerType('OBSERVE_USER');

export const SET_ONBOARDED = syncType('SET_ONBOARDED');

export enum authProviders {
  facebook = 'facebook',
  google = 'google',
  email = 'email',
}

export interface EmailAndPasswordPayload {
  email: string;
  password: string;
}

export interface AuthState {
  user?: firebase.User | null;
  checkEmail?: {
    loading: boolean;
    present: boolean;
    intermediateData: EmailAndPasswordPayload;
    method?: authProviders;
    error?: Error;
  };
  onboarded: boolean;
  loading: boolean;
  observerReceivedFirstUpdate: boolean;
  error?: Error;
  confirmationResult?: firebase.auth.ConfirmationResult;
}

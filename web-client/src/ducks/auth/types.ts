import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType } = createActionTypeFactory('AUTH');

export const LOGIN = asyncType('LOGIN');
export const LOGOUT = asyncType('LOGOUT');

export const OBSERVE_USER = observerType('OBSERVE_USER');

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
  loading: boolean;
  observerReceivedFirstUpdate: boolean;
  error?: Error;
  confirmationResult?: firebase.auth.ConfirmationResult;
}

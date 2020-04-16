import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType } = createActionTypeFactory('AUTH');

export const LOGIN = asyncType('LOGIN');

export const OBSERVE_USER = observerType('OBSERVE_USER');

export interface AuthState {
  user?: firebase.User | null;
  loading: boolean;
  observerReceivedFirstUpdate: boolean;
  error?: Error;
  confirmationResult?: firebase.auth.ConfirmationResult;
}

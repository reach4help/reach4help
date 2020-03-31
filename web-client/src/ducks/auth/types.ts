import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType } = createActionTypeFactory('AUTH');

export const LOGIN = asyncType('LOGIN');

export interface LoginAction {
  facebookAuthToken: string;
  userId: string;
}

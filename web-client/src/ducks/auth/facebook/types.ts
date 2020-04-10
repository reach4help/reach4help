import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { asyncType: firebaseAsyncType } = createActionTypeFactory('FIREBASE');

export const FIREBASE_FACEBOOK_LOGIN_POPUP = firebaseAsyncType(
  'FACEBOOK_POPUP',
);
export const FIREBASE_LOGIN_REDIRECT = firebaseAsyncType('LOGIN_REDIRECT');
export const TRIGGER_LOGIN_WITH_REDIRECT = firebaseAsyncType(
  'TRIGGER_LOGIN_WITH_REDIRECT',
);
export const GET_LOGIN_REDIRECT_RESULT = firebaseAsyncType(
  'GET_LOGIN_REDIRECT_RESULT',
);

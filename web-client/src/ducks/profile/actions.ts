import { getUserProfile as getUserProfileFunc } from './functions';
import { GET, IgetUserProfile } from './types';

export const getUserProfile = (payload: IgetUserProfile) => (
  dispatch: Function,
): void => {
  dispatch({
    type: GET,
    payload,
    firebase: getUserProfileFunc,
  });
};

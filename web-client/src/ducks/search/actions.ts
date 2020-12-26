import { getSearchKey } from './functions';
import { GET_SEARCH_KEY } from './types';

export const getAuthenticatedSearchKey = () => (dispatch: Function) => {
  dispatch({
    type: GET_SEARCH_KEY,
    firebase: getSearchKey,
    payload: { authenticated: true },
  });
};

export const getUnauthenticatedSearchKey = () => (dispatch: Function) => {
  dispatch({
    type: GET_SEARCH_KEY,
    firebase: getSearchKey,
    payload: { authenticated: false },
  });
};

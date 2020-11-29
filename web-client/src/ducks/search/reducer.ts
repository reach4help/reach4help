import createReducer from 'src/store/utils/createReducer';

import { GET_SEARCH_KEY, IgetSearchKeyResult, SearchState } from './types';

const initialSearchKeyState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const initialState: SearchState = {
  getSearchKey: initialSearchKeyState,
};

export default createReducer<SearchState>(
  {
    [GET_SEARCH_KEY.PENDING]: (state: SearchState) => {
      state.getSearchKey.loading = true;
      state.getSearchKey.data = undefined;
      state.getSearchKey.error = undefined;
    },
    [GET_SEARCH_KEY.COMPLETED]: (
      state: SearchState,
      {
        payload: data,
      }: {
        payload: IgetSearchKeyResult;
      },
    ) => {
      state.getSearchKey.loading = false;
      state.getSearchKey.error = undefined;
      state.getSearchKey.data = data;
    },
    [GET_SEARCH_KEY.REJECTED]: (
      state: SearchState,
      { payload: error }: { payload: Error },
    ) => {
      state.getSearchKey.data = undefined;
      state.getSearchKey.loading = false;
      state.getSearchKey.error = error;
    },
  },
  initialState,
);

import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'SEARCH',
);

export const GET_SEARCH_KEY = asyncType('GET_SEARCH_KEY');

export interface SearchState {
  getSearchKey: {
    loading: boolean;
    data?: IgetSearchKeyResult;
    error?: Error;
  };
}

export interface IgetSearchKey {
  authenticated: boolean;
}

export interface IgetSearchKeyResult {
  isAuthenticated: boolean;
  searchKey: string;
  indexName: string;
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthenticatedSearchKey,
  getUnauthenticatedSearchKey,
} from 'src/ducks/search/actions';
import { AppState } from 'src/store';

export const useSearchKey = () => {
  const onboarded = useSelector((state: AppState) => state.auth.onboarded);
  const dispatch = useDispatch();
  const searchKeyState = useSelector(
    (state: AppState) => state.search.getSearchKey,
  );
  const hasSearchKey = !!searchKeyState.data;
  useEffect(() => {
    if (!hasSearchKey && !searchKeyState.loading) {
      if (onboarded) {
        dispatch(getAuthenticatedSearchKey());
      } else {
        dispatch(getUnauthenticatedSearchKey());
      }
    }
  }, [dispatch, onboarded, searchKeyState.loading, hasSearchKey]);
  return searchKeyState.data;
};

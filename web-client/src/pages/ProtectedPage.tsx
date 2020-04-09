import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { AppState } from 'src/store';

import { LoginLocation } from './routes/LoginRoute/constants';

interface ProtectedPageProps {
  children: React.ReactNode;
}
const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect((): any => observeUserAction(dispatch), [dispatch]);
  if (!loading && !user) {
    history.replace({
      pathname: LoginLocation.path,
      state: { redirectBack: location.pathname },
    });
    return null;
  }
  return <>{children}</>;
};

export default ProtectedPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import { AppState } from 'src/store';

import { AuthState } from '../ducks/auth/reducer';

interface AuthenticatedPageProps {
  children: React.ReactNode;
}
const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
  const auth: AuthState = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  if (auth.loading && !auth.user) {
    return <>Loading</>;
  }
  if (!auth.user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: location.pathname },
        }}
      />
    );
  }

  return <>{children}</>;
};

export default AuthenticatedPage;

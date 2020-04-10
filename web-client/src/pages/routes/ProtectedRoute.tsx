import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import { PhoneEntryLocation } from 'src/modules/phone/pages/routes/PhoneEntryRoute/constants';
import { AppState } from 'src/store';

import { AuthState } from '../../ducks/auth/reducer';

const ProtectedRoute: React.FC<RouteProps> = ({ path, component }) => {
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

  if (!auth.user.phoneNumber) {
    return (
      <Redirect
        to={{
          pathname: PhoneEntryLocation.path,
        }}
      />
    );
  }

  return <Route path={path} component={component} />;
};

export default ProtectedRoute;

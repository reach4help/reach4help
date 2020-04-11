import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import { PersonalDataLocation } from './routes/PersonalDataRoute/constants';
import PersonalDataRoute from './routes/PersonalDataRoute/PersonalDataRoute';

const ContentPage = (): ReactElement => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  if (loading && !user) {
    return <>Loading</>;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: location.pathname },
        }}
      />
    );
  }
  // FIXME This should check if the user has already filled the
  // Personal data from
  // if(auth.user.geolocation)
  // eslint-disable-next-line no-constant-condition
  if (false) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return (
    <Switch>
      <Route
        path={PersonalDataLocation.path}
        component={PersonalDataRoute}
        exact
      />
      <Route path="*" component={NotFoundRoute} />
    </Switch>
  );
};
export default ContentPage;

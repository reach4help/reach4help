import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import { PersonalDataLocation } from 'src/modules/personalData/pages/routes/PersonalDataRoute/constants';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import { PhoneEntryLocation } from './routes/PhoneEntryRoute/constants';
import PhoneEntryRoute from './routes/PhoneEntryRoute/PhoneEntryRoute';
import { PhoneVerifyLocation } from './routes/PhoneVerifyRoute/constants';
import PhoneVerifyRoute from './routes/PhoneVerifyRoute/PhoneVerifyRoute';

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
  if (user.phoneNumber) {
    return (
      <Redirect
        to={{
          pathname: PersonalDataLocation.path,
        }}
      />
    );
  }

  return (
    <Switch>
      <Route path={PhoneEntryLocation.path} component={PhoneEntryRoute} exact />
      <Route
        path={PhoneVerifyLocation.path}
        component={PhoneVerifyRoute}
        exact
      />
      <Route path="*" component={NotFoundRoute} />
    </Switch>
  );
};

export default ContentPage;

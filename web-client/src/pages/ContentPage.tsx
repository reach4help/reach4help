import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppState } from 'src/store';

import { NEW_REQUEST_PATH } from './routes/NewRequestRoute/constants';
import NewRequestRoute from './routes/NewRequestRoute/NewRequestRoute';
import NotFoundRoute from './routes/NotFoundRoute';
import { PhoneEntryLocation } from './routes/PhoneEntryRoute/constants';

const ContentPage = (): ReactElement => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);

  if (!user || !user.phoneNumber) {
    return (
      <Redirect
        to={{
          pathname: PhoneEntryLocation.path,
        }}
      />
    );
  }

  return (
    <Switch>
      <Route exact path={NEW_REQUEST_PATH} component={NewRequestRoute} />
      <Route path="*">
        <NotFoundRoute />
      </Route>
    </Switch>
  );
};

export default ContentPage;

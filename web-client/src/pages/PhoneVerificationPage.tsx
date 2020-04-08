import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';

import { PhoneEntryLocation } from './routes/PhoneEntryRoute/constants';
import PhoneEntryRoute from './routes/PhoneEntryRoute/PhoneEntryRoute';
import { PhoneVerifyLocation } from './routes/PhoneVerifyRoute/constants';
import PhoneVerifyRoute from './routes/PhoneVerifyRoute/PhoneVerifyRoute';

const PhoneVerificationPage: React.FC = () => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
  const dispatch = useDispatch();
  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  if (user.phoneNumber) {
    return (
      <Redirect
        to={{
          // TODO This should go to user details instead
          pathname: '/',
        }}
      />
    );
  }

  return (
    <Switch>
      <Route
        exact
        path={PhoneVerifyLocation.path}
        component={PhoneVerifyRoute}
      />
      <Route exact path={PhoneEntryLocation.path} component={PhoneEntryRoute} />
    </Switch>
  );
};

export default PhoneVerificationPage;

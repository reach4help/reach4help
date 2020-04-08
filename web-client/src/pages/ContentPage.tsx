import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { AppState } from 'src/store';

import { PhoneEntryLocation } from './routes/PhoneEntryRoute/constants';

const ContentPage = (): ReactElement => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
  const dispatch = useDispatch();
  useEffect((): any => observeUserAction(dispatch), [dispatch]);

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
    <Router>
      <Route path="*">This is some content</Route>
    </Router>
  );
};

export default ContentPage;

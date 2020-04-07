import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PhoneNumberContainer from 'src/containers/PhoneNumberContainer/PhoneNumberContainer';

import { PhoneEntry, PhoneVerify } from './constants';

const PhoneNumberPage: React.FC = () => (
  <Router>
    <Route exact path={PhoneVerify.path}>
      <PhoneNumberContainer type="verify" />
    </Route>
    <Route exact path={PhoneEntry.path}>
      <PhoneNumberContainer type="entry" />
    </Route>
  </Router>
);

export default PhoneNumberPage;

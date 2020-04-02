import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import PhoneNumberPage from './routes/PhoneNumberPage';

const ContentPage = (): ReactElement => (
  <Router>
    <Route path="*">
      <PhoneNumberPage />
    </Route>
  </Router>
);

export default ContentPage;

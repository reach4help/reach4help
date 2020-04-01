import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const ContentPage = (): ReactElement => (
  <Router>
    <Route path="*">
      {/* <ExampleProtectedRoute /> */}
      Protected route - This route is now accessible because login succeeded
      TODO: No routes available
    </Route>
  </Router>
);

export default ContentPage;

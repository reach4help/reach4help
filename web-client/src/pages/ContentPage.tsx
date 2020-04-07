import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const ContentPage = (): ReactElement => (
  <Router>
    <Route path="*">This is some content</Route>
  </Router>
);

export default ContentPage;

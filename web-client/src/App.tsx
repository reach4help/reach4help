import { enableAllPlugins } from 'immer';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Login from './pages/login';
import NotFound from './pages/not-found';
import configureStore from './store';

// Later we can check if we need all immer plugins
enableAllPlugins();

const App = (): ReactElement => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

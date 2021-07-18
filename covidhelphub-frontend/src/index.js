import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Router } from 'react-router-dom';

import './Auth.css';

import { Auth0Provider } from './Auth/react-auth0-spa';
import history from './utils/history';
import { AUTH_CONFIG } from './Auth/auth0-variables';

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

const mainRoutes = (
  <Router history={history}>
    <Route
      path="/"
      render={props => (
        <Auth0Provider
          domain={AUTH_CONFIG.domain}
          client_id={AUTH_CONFIG.clientId}
          redirect_uri={AUTH_CONFIG.callbackUrl}
          onRedirectCallback={onRedirectCallback}
        />
      )}
    />
  </Router>
);

ReactDOM.render(mainRoutes, document.getElementById('root'));

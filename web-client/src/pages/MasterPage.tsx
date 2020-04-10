import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import modules from '../modules';
import NotFoundRoute from './routes/NotFoundRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const MasterPage = (): ReactElement => {
  const renderModules = () =>
    Object.keys(modules).map(moduleName => {
      const routeModule = modules[moduleName];
      return routeModule.protected ? (
        <ProtectedRoute
          key={moduleName}
          path={routeModule.path}
          component={routeModule.component}
        />
      ) : (
        <Route
          key={moduleName}
          path={routeModule.path}
          component={routeModule.component}
        />
      );
    });
  return (
    <Router>
      <Switch>
        {renderModules()}
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Router>
  );
};
export default MasterPage;

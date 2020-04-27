import React, { ReactElement } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { NewRequestLocation } from 'src/modules/request/pages/routes/NewRequestRoute/constants';

import modules from '../modules';
import DashboardRoute from './routes/DashboardRoute';
import NotFoundRoute from './routes/NotFoundRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const MasterPage = (): ReactElement => {
  const renderModules = () =>
    Object.keys(modules).map(moduleName => {
      const routeModule = modules[moduleName];
      if (routeModule.layout === 'dashboard') {
        return (
          <DashboardRoute
            key={moduleName}
            path={routeModule.path}
            component={routeModule.component}
            menuItems={routeModule.menuItems || []}
          />
        );
      }

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
        {/* TEMPORARY - Redirect to new request so that people don't see a 404 page */}
        <Route path="/" exact>
          <Redirect
            to={{
              pathname: NewRequestLocation.path,
            }}
          />
        </Route>
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Router>
  );
};
export default MasterPage;

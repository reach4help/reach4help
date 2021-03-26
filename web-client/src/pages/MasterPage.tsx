import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout/DashboardLayout';
import { signOutCurrentUserAction } from 'src/ducks/auth/actions';
import { RootUrl } from 'src/modules/post/constants';
import { Module } from 'src/types/module';

import modules from '../modules';
import NotFoundRoute from './routes/NotFoundRoute';
import PartiallyProtectedRoute from './routes/ParitallyProtectedRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const MasterPage = (): ReactElement => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const titleFromPath = () => {
    const path = window.location.pathname;
    const title = 'Reach4Help';

    switch (path) {
      case '/about':
      case '/create':
      case '/login':
      case '/phone':
      case `${RootUrl}`:
      case '/personal-data':
      case '/personal-data/role-info':
      case '/phone/entry':
      case '/phone/verify':
        return `${title}: `.concat(
          t(`routeSubtitles.${path.replace(/\//g, '_')}`),
        );
      default:
        return title;
    }
  };

  const renderLayout = (routeModule: Module) => {
    if (routeModule.layout === 'dashboard') {
      return (
        <>
          <Helmet>
            <title>{titleFromPath()}</title>
          </Helmet>
          <DashboardLayout
            logoutHandler={() => dispatch(signOutCurrentUserAction())}
          >
            <Route path={routeModule.path} component={routeModule.component} />
          </DashboardLayout>
        </>
      );
    }
    return <routeModule.component />;
  };

  const renderModules = () =>
    Object.keys(modules).map(moduleName => {
      const routeModule = modules[moduleName];
      // test components here
      return routeModule.protected ? (
        <ProtectedRoute
          key={moduleName}
          path={routeModule.path}
          component={() => renderLayout(routeModule)}
        />
      ) : routeModule.partiallyProtected ? (
        <PartiallyProtectedRoute
          key={moduleName}
          path={routeModule.path}
          component={() => renderLayout(routeModule)}
        />
      ) : (
        <Route
          key={moduleName}
          path={routeModule.path}
          component={() => renderLayout(routeModule)}
        />
      );
    });
  return (
    <Router>
      <Switch>
        {renderModules()}
        <Redirect path="/" to="/home" exact />
        <Route path="" component={NotFoundRoute} />
      </Switch>
    </Router>
  );
};
export default MasterPage;

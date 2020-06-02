import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout/DashboardLayout';
import { signOutCurrentUserAction } from 'src/ducks/auth/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { RoleInfoLocation } from 'src/modules/personalData/pages/routes/RoleInfoRoute/constants';

import { AuthState } from '../ducks/auth/types';
import { updateUserProfile } from '../ducks/profile/actions';
import { ApplicationPreference } from '../models/users';
import modules from '../modules';
import NotFoundRoute from './routes/NotFoundRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const MasterPage = (): ReactElement => {
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const userProfile = profileState.profile;

  const dispatch = useDispatch();

  const authState = useSelector(({ auth }: { auth: AuthState }) => auth);

  const toggleApplicationPreference = () => {
    const user = profileState.profile;
    if (user && authState.user) {
      const currentPreference = user.applicationPreference;
      user.applicationPreference =
        currentPreference === ApplicationPreference.cav
          ? ApplicationPreference.pin
          : ApplicationPreference.cav;
      dispatch(updateUserProfile(authState.user.uid, user));
    }
  };

  const renderLayout = routeModule => {
    if (routeModule.layout === 'dashboard' && userProfile) {
      return (
        <DashboardLayout
          menuItems={routeModule.menuItems}
          profileData={userProfile}
          isCav={userProfile?.applicationPreference === 'cav'}
          logoutHandler={() => dispatch(signOutCurrentUserAction())}
          toggleApplicationPreference={toggleApplicationPreference}
        >
          <Route path={routeModule.path} component={routeModule.component} />
        </DashboardLayout>
      );
    }
    return <routeModule.component />;
  };

  const renderModules = () =>
    Object.keys(modules).map(moduleName => {
      const routeModule = modules[moduleName];

      return routeModule.protected ? (
        <ProtectedRoute
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
        {/* TEMPORARY - Redirect to new request so that people don't see a 404 page */}
        <ProtectedRoute
          path="/"
          component={() => <Redirect to={RoleInfoLocation.path} />}
        />
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Router>
  );
};
export default MasterPage;

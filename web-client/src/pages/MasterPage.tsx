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
import { changeModal, setRequest } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { IUser } from 'src/models/users';
import { OpenRequestsLocation } from 'src/modules/requests/pages/routes/OpenRequestsRoute/constants';

import modules from '../modules';
import NotFoundRoute from './routes/NotFoundRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const MasterPage = (): ReactElement => {
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const userProfile = profileState.profile;

  const newRequestState = useSelector(
    ({ requests }: { requests: RequestState }) => requests.setAction,
  );

  const dispatch = useDispatch();

  const newRequestSubmitHandler = (title: string, body: string) => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.privilegedInformation
    ) {
      dispatch(
        setRequest({
          title,
          description: body,
          pinUserRef: profileState.userRef,
          pinUserSnapshot: profileState.profile.toObject() as IUser,
          latLng: profileState.privilegedInformation.address.coords,
        }),
      );
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
          modalSubmitHandler={newRequestSubmitHandler}
          modalStateHandler={state => dispatch(changeModal(state))}
          modalState={newRequestState.modalState}
          modalSuccess={newRequestState.success}
          modalLoading={newRequestState.loading}
          modalError={newRequestState.error}
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
        <Route path="/" exact>
          <Redirect to={OpenRequestsLocation.path} />
        </Route>
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Router>
  );
};
export default MasterPage;

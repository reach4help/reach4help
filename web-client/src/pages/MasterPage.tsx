import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout/DashboardLayout';
import { signOutCurrentUserAction } from 'src/ducks/auth/actions';
import { observeOffers } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import { FindRequestsLocation } from 'src/modules/requests/pages/routes/FindRequestsRoute/constants';
import { Module } from 'src/types/module';

import { AuthState } from '../ducks/auth/types';
import { updateUserProfile } from '../ducks/profile/actions';
import { ApplicationPreference, User } from '../models/users';
import modules from '../modules';
import NotFoundRoute from './routes/NotFoundRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const mockProfile = User.factory({
  username: 'pleaseLogin',
});

const MasterPage = (): ReactElement => {
  const { t } = useTranslation();

  const titleFromPath = () => {
    const path = window.location.pathname;
    const title = 'Reach4Help';

    switch (path) {
      case '/login':
      case '/phone':
      case '/requests':
      case '/personal-data':
      case '/timeline':
      case '/personal-data/role-info':
      case '/phone/entry':
      case '/phone/verify':
      case '/requests/accepted':
      case '/requests/archived':
      case '/requests/find':
      case '/requests/finished':
      case '/requests/new':
      case '/requests/ongoing':
      case '/requests/open':
        return `${title}: `.concat(
          t(`routeSubtitles.${path.replace(/\//g, '_')}`),
        );

      /* TODO  Not currently working for timeline routes
            "/timeline/accepted/:requestId",
            "/timeline/:requestId"
        */
      default:
        return path.startsWith('/timeline')
          ? `${title}: Request Timeline`
          : title;
    }
  };

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );
  const [changeRolePast, setChangeRolePast] = useState<
    ApplicationPreference | undefined
  >(undefined);
  const userProfile = profileState.profile;

  const dispatch = useDispatch();
  // const history = useHistory();

  const authStateUser = useSelector(
    ({ auth }: { auth: AuthState }) => auth.user,
  );

  useEffect(() => {
    if (
      !(profileState.error && profileState.loading) &&
      profileState.updateAction &&
      changeRolePast &&
      userProfile &&
      userProfile.applicationPreference
    ) {
      if (changeRolePast !== userProfile.applicationPreference) {
        window.location.href = '/';
      }
    }
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      !offersState.data &&
      !offersState.loading
    ) {
      observeOffers(dispatch, {
        userType: profileState.profile.applicationPreference,
        userRef: profileState.userRef,
      });
    }
  }, [userProfile, changeRolePast, profileState, offersState, dispatch]);

  const toggleApplicationPreference = () => {
    const user = profileState.profile;
    if (user && authStateUser) {
      const currentPreference = user.applicationPreference;
      if (currentPreference) {
        setChangeRolePast(currentPreference);
      }
      user.applicationPreference =
        currentPreference === ApplicationPreference.cav
          ? ApplicationPreference.pin
          : ApplicationPreference.cav;
      dispatch(updateUserProfile(authStateUser.uid, user));
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
            menuItems={
              routeModule.dynamicMenuLinks
                ? routeModule.dynamicMenuLinks(profileState)
                : routeModule.menuItems
            }
            offersState={offersState || {}}
            profileData={userProfile || mockProfile}
            isCav={userProfile?.applicationPreference === 'cav'}
            logoutHandler={() => dispatch(signOutCurrentUserAction())}
            toggleApplicationPreference={toggleApplicationPreference}
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
        <Route
          path="/"
          component={() => <Redirect to={FindRequestsLocation.path} />}
        />
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Router>
  );
};
export default MasterPage;

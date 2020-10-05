import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';
import { observeUserAction, setOnboarded } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { AppState } from 'src/store';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';

const PartiallyProtectedRoute: React.FC<RouteProps> = ({ path, component }) => {
  const user = useSelector((state: AppState) => state.auth.user);
  const observerReceivedFirstUpdate = useSelector(
    (state: AppState) => state.auth.observerReceivedFirstUpdate,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const dispatch = useDispatch();

  const [statusDetected, setStatusDetected] = useState<boolean>(false);

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  useEffect((): any => {
    if (user && user.uid) {
      const observeProfileSubscription = observeProfile(dispatch, {
        uid: user.uid,
      });
      const observePrivilegedSubscription = observePrivileged(dispatch, {
        uid: user.uid,
      });
      return () => {
        observeProfileSubscription();
        observePrivilegedSubscription();
      };
    }
    return undefined;
  }, [dispatch, user]);

  useEffect(() => {
    if (
      (observerReceivedFirstUpdate && !user?.uid) ||
      (observerReceivedFirstUpdate &&
        profileState.observerReceivedFirstUpdate &&
        profileState.privilegedObserverReceivedFirstUpdate)
    ) {
      if (!statusDetected) {
        setStatusDetected(true);
      }
      if (user?.uid && user.phoneNumber && profileState.profile?.displayName) {
        return setOnboarded(dispatch, true);
      }
      return setOnboarded(dispatch, false);
    }
    return undefined;
  }, [
    dispatch,
    observerReceivedFirstUpdate,
    profileState,
    statusDetected,
    user,
  ]);

  if (!statusDetected) {
    return <LoadingWrapper />;
  }

  return <Route path={path} component={component} />;
};

export default PartiallyProtectedRoute;

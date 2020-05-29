import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { Request, RequestStatus } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const ClosedRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [archivedRequests, setArchivedRequests] = useState<
    Record<string, Request>
  >({});

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.userRef && profileState.profile?.applicationPreference) {
      const cancelledSubscription = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.cancelled,
      });
      const removedSubscription = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.removed,
      });
      const completedSubscription = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.completed,
      });
      return () => {
        cancelledSubscription();
        removedSubscription();
        completedSubscription();
      };
    }
  }, [dispatch, profileState]);

  useEffect(() => {
    if (
      requestsState.cancelledRequests.data &&
      requestsState.completedRequests.data &&
      requestsState.removedRequests.data
    ) {
      const internalArchivedRequests: Record<string, Request> = {
        ...requestsState.cancelledRequests.data,
        ...requestsState.removedRequests.data,
        ...requestsState.completedRequests.data,
      };
      setArchivedRequests(internalArchivedRequests);
    }
  }, [requestsState, setArchivedRequests]);

  return (
    <>
      <Header
        requestsType="Closed"
        numRequests={Object.keys(archivedRequests || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={archivedRequests}
        loading={
          (requestsState.cancelledRequests &&
            requestsState.cancelledRequests.loading) ||
          (requestsState.removedRequests &&
            requestsState.removedRequests.loading) ||
          (requestsState.completedRequests &&
            requestsState.completedRequests.loading)
        }
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
      />
    </>
  );
};

ClosedRequestsContainer.propTypes = {};

export default ClosedRequestsContainer;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import {
  observeNonOpenRequests,
  observeOpenRequests,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { Request, RequestStatus } from 'src/models/requests';

import TopPanel from '../../components/TopPanel';

interface TimelineViewContainerProps {
  requestId: string;
}

const TimelineViewContainer: React.FC<TimelineViewContainerProps> = ({
  requestId,
}) => {
  const dispatch = useDispatch();

  const [request, setRequest] = useState<Request | undefined>(undefined);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );

  useEffect(() => {
    let requestTemp: Request | undefined = requestsState.openRequests.data
      ? requestsState.openRequests.data[requestId]
      : undefined;
    requestTemp =
      requestTemp ||
      (requestsState.closedRequests.data
        ? requestsState.closedRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.ongoingRequests.data
        ? requestsState.ongoingRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.completedRequests.data
        ? requestsState.completedRequests.data[requestId]
        : undefined);

    setRequest(requestTemp);
  }, [requestsState, requestId]);

  useEffect(() => {
    if (profileState.profile && profileState.userRef) {
      const unsubscribeFromOpen = observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
      const unsubscribeFromCompleted = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.completed,
      });
      const unsubscribeFromOngoing = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.ongoing,
      });
      return () => {
        unsubscribeFromOpen();
        unsubscribeFromCompleted();
        unsubscribeFromOngoing();
      };
    }
  }, [dispatch, profileState]);

  if (!(profileState.profile && request)) {
    return <>Loading...</>;
  }

  /*
    TODO: 
      Once backend changes for profile snapshot is done, instead of user={profileState.profile},
      The Top Panel must take the user details from the request itself
  */
  return <TopPanel request={request} user={profileState.profile} />;
};

export default TimelineViewContainer;

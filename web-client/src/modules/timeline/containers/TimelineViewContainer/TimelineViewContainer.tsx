import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
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
      (requestsState.ongoingRequests.data
        ? requestsState.ongoingRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.completedRequests.data
        ? requestsState.completedRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.cancelledRequests.data
        ? requestsState.cancelledRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.removedRequests.data
        ? requestsState.removedRequests.data[requestId]
        : undefined);
    setRequest(requestTemp);
  }, [requestsState, requestId]);

  useEffect(() => {
    if (profileState.profile && profileState.userRef) {
      const unsubscribeFromOpen = observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });

      const unsubscribeFromOngoing = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.ongoing,
      });

      const unsubscribeFromCompleted = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.completed,
      });

      const unsubscribeFromCancelled = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.cancelled,
      });

      const unsubscribeFromRemoved = observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.removed,
      });

      return () => {
        unsubscribeFromOpen();
        unsubscribeFromOngoing();
        unsubscribeFromCompleted();
        unsubscribeFromCancelled();
        unsubscribeFromRemoved();
      };
    }
  }, [dispatch, profileState]);

  if (!(profileState.profile && request)) {
    return <LoadingWrapper />;
  }

  const mockRequestUser = {
    name: 'Jon Snow',
    rating: 4.5,
    likes: 52,
    distance: '5km',
    address: '509 Gorby Lane, Jackson, FL 32065',
    applicationPreference: 'pin',
  };

  /*
    TODO: 
      Once backend changes for profile snapshot is done, instead of user={mockRequestUser},
      The Top Panel must take the user details from the request itself
  */
  return <TopPanel request={request} user={mockRequestUser} />;
};

export default TimelineViewContainer;

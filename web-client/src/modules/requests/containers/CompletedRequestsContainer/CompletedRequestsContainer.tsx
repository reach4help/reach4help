import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { RequestStatus } from 'src/models/requests';

import RequestList from '../../components/RequestList/RequestList';

const CompletedRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const completedRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.completedRequests,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.profile && profileState.userRef) {
      return observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.completed,
      });
    }
  }, [profileState, dispatch]);

  return (
    <RequestList
      requests={Object.values(completedRequests.data || {})}
      loading={completedRequests && completedRequests.loading}
    />
  );
};

CompletedRequestsContainer.propTypes = {};

export default CompletedRequestsContainer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { RequestStatus } from 'src/models/requests';

import RequestList from '../../components/RequestList/RequestList';

const OngoingRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const ongoingRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.ongoingRequests,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.profile && profileState.userRef) {
      return observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.ongoing,
      });
    }
  }, [profileState, dispatch]);

  return (
    <RequestList
      requests={Object.values(ongoingRequests.data || {})}
      loading={ongoingRequests && ongoingRequests.loading}
    />
  );
};

OngoingRequestsContainer.propTypes = {};

export default OngoingRequestsContainer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';

import RequestList from '../../components/RequestList/RequestList';

const OpenRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const openRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.openRequests,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.profile) {
      return observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
    }
  }, [profileState, dispatch]);

  return (
    <RequestList
      requests={Object.values(openRequests.data || {})}
      loading={openRequests && openRequests.loading}
    />
  );
};

OpenRequestsContainer.propTypes = {};

export default OpenRequestsContainer;

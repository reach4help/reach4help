import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { RequestStatus } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';

import Header from '../../components/Header/Header';
import RequestList from '../../components/RequestList/RequestList';

const ClosedRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const closedRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.closedRequests,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.userRef && profileState.profile?.applicationPreference) {
      return observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.cancelled,
      });
    }
  }, [dispatch, profileState]);

  const handleRequest: Function = () => 'Fill logic here';

  return (
    <>
      <Header
        requestsType="Closed"
        numRequests={closedRequests.data?.length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={closedRequests.data}
        loading={closedRequests && closedRequests.loading}
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
      />
    </>
  );
};

ClosedRequestsContainer.propTypes = {};

export default ClosedRequestsContainer;

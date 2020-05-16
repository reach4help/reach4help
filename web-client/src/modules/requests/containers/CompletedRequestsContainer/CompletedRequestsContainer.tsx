import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { RequestStatus } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';

import Header from '../../components/Header/Header';
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

  const handleRequest: Function = () => 'Fill logic here';

  return (
    <>
      <Header
        requestsType="Completed"
        numRequests={completedRequests.data?.length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={Object.values(completedRequests.data || {})}
        loading={completedRequests && completedRequests.loading}
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
      />
    </>
  );
};

CompletedRequestsContainer.propTypes = {};

export default CompletedRequestsContainer;

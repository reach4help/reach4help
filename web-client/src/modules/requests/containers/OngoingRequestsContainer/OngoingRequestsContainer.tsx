import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { RequestStatus } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const OngoingRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  return (
    <>
      <Header
        requestsType="Ongoing"
        numRequests={Object.keys(ongoingRequests.data || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={ongoingRequests.data}
        loading={ongoingRequests && ongoingRequests.loading}
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
      />
    </>
  );
};

OngoingRequestsContainer.propTypes = {};

export default OngoingRequestsContainer;

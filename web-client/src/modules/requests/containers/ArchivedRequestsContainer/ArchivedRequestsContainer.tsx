import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { getArchivedRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const ClosedRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const archivedRequestsWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      requests.syncArchivedRequestsState,
  );

  useEffect(() => {
    if (profileState.userRef && profileState.profile?.applicationPreference) {
      dispatch(
        getArchivedRequests({
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
        }),
      );
    }
  }, [dispatch, profileState]);

  return (
    <>
      <Header
        requestsType="Closed"
        numRequests={
          Object.keys(archivedRequestsWithOffersAndTimeline.data || {}).length
        }
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={archivedRequestsWithOffersAndTimeline.data}
        loading={
          archivedRequestsWithOffersAndTimeline &&
          archivedRequestsWithOffersAndTimeline.loading
        }
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
      />
    </>
  );
};

ClosedRequestsContainer.propTypes = {};

export default ClosedRequestsContainer;

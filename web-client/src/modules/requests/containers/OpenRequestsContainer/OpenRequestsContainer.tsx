import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
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

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  const handleRequest: Function = (id, action) => {};

  return (
    <>
      <Header
        requestsType="Open"
        numRequests={Object.keys(openRequests.data || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={openRequests.data}
        loading={openRequests && openRequests.loading}
        handleRequest={handleRequest}
        isCavAndOpenRequest={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        RequestItem={RequestItem}
      />
    </>
  );
};

OpenRequestsContainer.propTypes = {};

export default OpenRequestsContainer;

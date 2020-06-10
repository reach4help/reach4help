import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
import { ProfileState } from 'src/ducks/profile/types';
import { getFinishedRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const CompletedRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const finishedRequestsWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      requests.syncFinishedRequestsState,
  );

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.profile.applicationPreference
    ) {
      dispatch(
        getFinishedRequests({
          userType: profileState.profile.applicationPreference,
          userRef: profileState.userRef,
        }),
      );
    }
  }, [profileState, dispatch]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  if (
    !finishedRequestsWithOffersAndTimeline.data ||
    finishedRequestsWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <Header
        requestsType="Finished"
        numRequests={
          Object.keys(finishedRequestsWithOffersAndTimeline.data || {}).length
        }
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={finishedRequestsWithOffersAndTimeline.data}
        loading={
          finishedRequestsWithOffersAndTimeline &&
          finishedRequestsWithOffersAndTimeline.loading
        }
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
      />
    </>
  );
};

CompletedRequestsContainer.propTypes = {};

export default CompletedRequestsContainer;

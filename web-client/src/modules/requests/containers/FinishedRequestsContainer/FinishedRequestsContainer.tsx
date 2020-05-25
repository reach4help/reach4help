import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import { observeNonOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { Request, RequestStatus } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const CompletedRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [finishedRequests, setFinishedRequests] = useState<
    Record<string, Request>
  >({});
  const completedRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.completedRequests,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.profile.applicationPreference
    ) {
      return observeNonOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
        requestStatus: RequestStatus.completed,
      });
    }
  }, [profileState, dispatch]);

  useEffect(() => {
    if (completedRequests.data) {
      const internalFinishedRequests: Record<string, Request> = {};
      for (const key in completedRequests.data) {
        if (
          completedRequests.data[key].cavRatedAt instanceof Date &&
          !(completedRequests.data[key].pinRatedAt instanceof Date)
        ) {
          internalFinishedRequests[key] = completedRequests.data[key];
        }
      }
      setFinishedRequests(internalFinishedRequests);
    }
  }, [completedRequests, setFinishedRequests]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  return (
    <>
      <Header
        requestsType="Completed"
        numRequests={Object.keys(finishedRequests || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={finishedRequests}
        loading={completedRequests && completedRequests.loading}
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
      />
    </>
  );
};

CompletedRequestsContainer.propTypes = {};

export default CompletedRequestsContainer;

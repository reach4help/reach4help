import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
import { ProfileState } from 'src/ducks/profile/types';
import { getOngoingRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const OngoingRequestsContainer: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const ongoingRequestWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      requests.syncOngoingRequestsState,
  );

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      profileState.userRef
    ) {
      dispatch(
        getOngoingRequests({
          userType: profileState.profile.applicationPreference,
          userRef: profileState.userRef,
        }),
      );
    }
  }, [profileState, dispatch]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  if (
    !ongoingRequestWithOffersAndTimeline.data ||
    ongoingRequestWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <Header
        requestsType={t(
          'modules.requests.containers.OngoingRequestsContainer.ongoing',
        )}
        numRequests={
          Object.keys(ongoingRequestWithOffersAndTimeline.data || {}).length
        }
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
      />
      <RequestList
        requests={ongoingRequestWithOffersAndTimeline.data}
        loading={
          ongoingRequestWithOffersAndTimeline &&
          ongoingRequestWithOffersAndTimeline.loading
        }
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
      />
    </>
  );
};

OngoingRequestsContainer.propTypes = {};

export default OngoingRequestsContainer;

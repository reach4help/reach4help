import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getFinishedRequests,
  resetSetRequestState,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../../components/Modals/OneTimeModal';
import Header from '../../components/Header';
import RequestItem from '../../components/RequestItem';
import RequestList from '../../components/RequestList';

const CompletedRequestsContainer: React.FC = () => {
  const { t } = useTranslation();
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
    dispatch(resetSetRequestState());
  }, [dispatch]);

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
  const instructions = [t('information_modal.FinishedRequestsContainer.0')];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.FinishedRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <Header
        requestsType={t(
          'modules.requests.containers.FinishedRequestsContainer.finished',
        )}
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
      <InformationModal
        title={t('information_modal.FinishedRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

export default CompletedRequestsContainer;

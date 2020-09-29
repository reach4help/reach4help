import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import {
  //   ?? temporarily commented out, should be deleted getAcceptedRequests,
  getOpenRequests,
  resetSetRequestState,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import RequestItem from '../components/RequestItem';
import RequestList from '../components/RequestList';

export const RequestsContainer: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const requestWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      //  TODO: ?? remove this - old code, keeping just in case
      // if (
      //     profileState.profile?.applicationPreference ===
      //     ApplicationPreference.cav
      //   ) {
      //     return requests.syncAcceptedRequestsState;
      //   }
      requests.syncOpenRequestsState,
  );

  useEffect(() => {
    dispatch(resetSetRequestState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getOpenRequests({
        userType: ApplicationPreference.pin,
        userRef: profileState.userRef,
      }),
    );
  }, [profileState, dispatch]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  const toCloseRequest: Function = id => `Fill logic: Remove request ${id}`;

  if (
    !requestWithOffersAndTimeline.data ||
    requestWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }

  const instructions = [
    t('information_modal.OpenRequestsContainer.0'),
    t('information_modal.OpenRequestsContainer.1'),
    t('information_modal.OpenRequestsContainer.2'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.OpenRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <Header
        requestsType={t(
          'modules.requests.containers.OpenRequestContainer.open',
        )}
        numRequests={
          Object.keys(requestWithOffersAndTimeline.data || {}).length
        }
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests={false}
      />
      <RequestList
        requests={requestWithOffersAndTimeline.data}
        loading={
          requestWithOffersAndTimeline && requestWithOffersAndTimeline.loading
        }
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        isPinAndOpenRequest={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.pin
        }
        RequestItem={RequestItem}
        toCloseRequest={toCloseRequest}
      />
      <InformationModal
        title={t('information_modal.OpenRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

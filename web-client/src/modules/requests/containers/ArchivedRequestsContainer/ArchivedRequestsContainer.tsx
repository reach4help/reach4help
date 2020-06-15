import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  InformationModal,
  makeLocalStorageKey,
} from 'src/components/InformationModal/InformationModal';
import { ProfileState } from 'src/ducks/profile/types';
import { getArchivedRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';

import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';

const ClosedRequestsContainer: React.FC = () => {
  const { t } = useTranslation();
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

  if (
    !archivedRequestsWithOffersAndTimeline.data ||
    archivedRequestsWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }
  const instructions = [t('information_modal.ArchivedRequestsContainer.0')];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.ArchivedRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <Header
        requestsType="Archived"
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
      <InformationModal
        title={t('information_modal.ArchivedRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

export default ClosedRequestsContainer;

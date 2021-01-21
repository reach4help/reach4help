import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeGetMyOffers } from 'src/ducks/PublicOffers/actions';
import { OfferState } from 'src/ducks/PublicOffers/types';
import { ApplicationPreference } from 'src/models/users';
// TODO: (es) remove import { TimelineViewLocation } from 'src/modules/timeline/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import PublicPostsList from '../components/PublicPostList';

const RequestPostsContainer: React.FC<{ status: string | null }> = ({
  status,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const myOffers = useSelector(
    ({ myOfferReducer }: { myOfferReducer: OfferState }) =>
      myOfferReducer.myOffers,
  );
  useEffect(() => {
    if (profileState.userRef) {
      observeGetMyOffers(dispatch, { status, userRef: profileState.userRef });
    }
  }, [dispatch, profileState.userRef, status]);

  if (myOffers.loading) {
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
        numRequests={Object.keys(myOffers.data || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests={false}
      />
      <PublicPostsList
        posts={myOffers.data}
        loading={myOffers && myOffers.loading}
      />
      <InformationModal
        title={t('information_modal.OpenRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

export default RequestPostsContainer;

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { observeMyOffers } from 'src/ducks/MyOffers/actions';
import { MyOffersState } from 'src/ducks/MyOffers/types';
import { ProfileState } from 'src/ducks/profile/types';
import { observeGetMyOffers } from 'src/ducks/PublicOffers/actions';
import { OfferState } from 'src/ducks/PublicOffers/types';
import {
  MyOfferPostsStatusAllUrl,
  MyOfferPostsStatusClosedUrl,
  MyOfferPostsStatusOnGoingUrl,
  MyOfferPostsStatusOpenUrl,
} from 'src/modules/myRequests/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import FilterByDropDownMenu from '../components/FilterByDropDownMenu';
import PublicPostsList from '../components/PublicPostList';

// TODO: (es) remove import { TimelineViewLocation } from 'src/modules/timeline/constants';

const RequestPostsContainer: React.FC<{ status: string | null }> = ({
  status,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const myOffers = useSelector(
    ({ myOfferReducer }: { myOfferReducer: MyOffersState }) =>
      myOfferReducer.myOffers,
  );
  useEffect(() => {
    if (profileState.userRef) {
      observeMyOffers(dispatch, { status, userRef: profileState.userRef });
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
      <FilterByDropDownMenu
        type="offers"
        allPath={MyOfferPostsStatusAllUrl}
        openPath={MyOfferPostsStatusOpenUrl}
        onGoingPath={MyOfferPostsStatusOnGoingUrl}
        closedPath={MyOfferPostsStatusClosedUrl}
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

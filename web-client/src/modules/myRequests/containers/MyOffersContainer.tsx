import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { observeMyOffers } from 'src/ducks/myRequests/actions';
import { PostState } from 'src/ducks/myRequests/types';
import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
// TODO: (es) remove import { TimelineViewLocation } from 'src/modules/timeline/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import RequestList from '../components/PostList';

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
    ({ posts }: { posts: PostState }) => posts.myOffers,
  );

  useEffect(
    (): any =>
      observeMyOffers(dispatch, { status, userRef: profileState.userRef! }),
    [dispatch],
  );

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
      <RequestList
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

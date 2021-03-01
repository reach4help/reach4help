import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { observeAllMyRequests } from 'src/ducks/myRequests/actions';
import { PostState } from 'src/ducks/myRequests/types';
import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import PostList from '../components/PostList';

const OfferPostsContainer: React.FC<{ status: string | null }> = ({
  status,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const myRequests = useSelector(
    ({ posts }: { posts: PostState }) => posts.myRequests,
  );

  useEffect(
    (): any =>
      observeMyRequests(dispatch, {
        status,
        userRef: profileState.userRef!,
      }),
    [dispatch],
  );

  if (myRequests.loading) {
    return <LoadingWrapper />;
  }

  const instructions = [
    t('information_modal.AcceptedRequestsContainer.0'),
    t('information_modal.AcceptedRequestsContainer.1'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.AcceptedRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <FilterByDropDownMenu
        type="requests"
        allPath={MyRequestPostsStatusAllUrl}
        openPath={MyRequestPostsStatusOpenUrl}
        onGoingPath={MyRequestPostsStatusOnGoingUrl}
        closedPath={MyRequestPostsStatusClosedUrl}
      />
      <PostList
        posts={myRequests.data}
        loading={myRequests && myRequests.loading}
      />
      <InformationModal
        title={t('information_modal.AcceptedRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

export default OfferPostsContainer;

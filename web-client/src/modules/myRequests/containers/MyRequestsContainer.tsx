import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'src/ducks/profile/types';
import { observeGetMyRequests } from 'src/ducks/PublicRequests/actions';
import { RequestState } from 'src/ducks/PublicRequests/types';
import { ApplicationPreference } from 'src/models/users';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import PostList from '../components/PublicPostList';

const RequestPostsContainer: React.FC<{ status: string | null }> = ({
  status,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const myRequests = useSelector(
    ({ myRequestReducer }: { myRequestReducer: RequestState }) =>
      myRequestReducer.myRequests,
  );

  useEffect(() => {
    if (profileState.userRef) {
      observeGetMyRequests(dispatch, {
        status,
        userRef: profileState.userRef,
      });
    }
  }, [dispatch, status, profileState.userRef]);

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
      <Header
        requestsType={t(
          'modules.requests.containers.AcceptedRequestContainer.accepted',
        )}
        numRequests={Object.keys(myRequests.data || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests
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

export default RequestPostsContainer;

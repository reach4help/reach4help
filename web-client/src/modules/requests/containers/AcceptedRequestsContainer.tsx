import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getAcceptedPosts,
  resetSetRequestState,
} from 'src/ducks/requests/actions';
import { PostState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineAcceptedViewLocation } from 'src/modules/timeline/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import AcceptedRequestItem from '../components/AcceptedRequestItem';
import Header from '../components/Header';
import RequestList from '../components/RequestList';

const OpenRequestsContainer: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const acceptedRequestsWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: PostState }) => requests.syncOfferPostsState,
  );

  useEffect(() => {
    dispatch(resetSetRequestState());
  }, [dispatch]);

  useEffect(() => {
    if (profileState.profile && profileState.profile.applicationPreference) {
      dispatch(
        getAcceptedPosts({
          userType: profileState.profile.applicationPreference,
          userRef: profileState.userRef,
        }),
      );
    }
  }, [profileState, dispatch]);

  const handleRequest: Function = id =>
    history.push(TimelineAcceptedViewLocation.toUrl({ requestId: id }));

  if (
    !acceptedRequestsWithOffersAndTimeline.data ||
    acceptedRequestsWithOffersAndTimeline.loading
  ) {
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
        numRequests={
          Object.keys(acceptedRequestsWithOffersAndTimeline.data || {}).length
        }
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests
      />
      <RequestList
        requests={acceptedRequestsWithOffersAndTimeline.data}
        loading={
          acceptedRequestsWithOffersAndTimeline &&
          acceptedRequestsWithOffersAndTimeline.loading
        }
        handleRequest={handleRequest}
        RequestItem={AcceptedRequestItem}
      />
      <InformationModal
        title={t('information_modal.AcceptedRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

export default OpenRequestsContainer;

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getCavRequestPosts,
  resetCavRequestPostsState,
} from 'src/ducks/requests/actions';
import { PostState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineOfferPostViewLocation } from 'src/modules/timeline/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import OfferPostItem from '../components/OfferPostItem';
import RequestList from '../components/RequestList';
import { PostTabsType } from '../constants';

const OfferPostsContainer: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const offerPostsWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: PostState }) =>
      requests.syncCavRequestPostsState,
  );

  const path = history.location.pathname;
  const isOfferTab = path.includes(PostTabsType.offers);

  useEffect(() => {
    if (isOfferTab) {
      dispatch(resetCavRequestPostsState());
    }
  }, [isOfferTab, dispatch]);

  useEffect(() => {
    if (isOfferTab && profileState.profile?.applicationPreference) {
      dispatch(
        getCavRequestPosts({
          userType: profileState.profile.applicationPreference,
          userRef: profileState.userRef,
        }),
      );
    }
  }, [isOfferTab, profileState, dispatch]);

  const handleRequest: Function = id =>
    history.push(TimelineOfferPostViewLocation.toUrl({ requestId: id }));

  if (
    !offerPostsWithOffersAndTimeline.data ||
    offerPostsWithOffersAndTimeline.loading
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
          Object.keys(offerPostsWithOffersAndTimeline.data || {}).length
        }
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests
      />
      <RequestList
        requests={offerPostsWithOffersAndTimeline.data}
        loading={
          offerPostsWithOffersAndTimeline &&
          offerPostsWithOffersAndTimeline.loading
        }
        handleRequest={handleRequest}
        RequestItem={OfferPostItem}
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

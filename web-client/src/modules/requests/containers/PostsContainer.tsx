import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getAcceptedRequests,
  getOpenRequests,
  resetSetRequestState,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import Header from '../components/Header';
import RequestItem from '../components/RequestItem';
import RequestList from '../components/RequestList';
import { PostTabsType } from '../constants';

const PostsContainer: React.FC<PostsProps> = ({
  postType, // offer or request
}) => {
  const isOffers = postType === PostTabsType.offers;
  const isRequests = !isOffers;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const requestWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      isOffers
        ? requests.syncAcceptedRequestsState
        : requests.syncOpenRequestsState,
  );

  const instructions = [
    t('information_modal.OpenRequestsContainer.0'),
    t('information_modal.OpenRequestsContainer.1'),
    t('information_modal.OpenRequestsContainer.2'),
  ];

  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.OpenRequestsContainer',
    userid: profileState.uid,
  });

  function handleRequest(id) {
    history.push(TimelineViewLocation.toUrl({ requestId: id }));
  }

  function toCloseRequest(id) {
    return `Fill logic: Remove request ${id}`;
  }

  useEffect(() => {
    dispatch(resetSetRequestState());
  }, [dispatch]);

  useEffect(() => {
    if (isOffers) {
      dispatch(
        getAcceptedRequests({
          userType: ApplicationPreference.cav,
          userRef: profileState.userRef,
        }),
      );
    } else {
      dispatch(
        getOpenRequests({
          userType: ApplicationPreference.pin,
          userRef: profileState.userRef,
        }),
      );
    }
  }, [profileState, isOffers, dispatch]);

  if (
    !requestWithOffersAndTimeline.data ||
    requestWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <Header
        requestsType={t(
          'modules.requests.containers.OpenRequestContainer.open',
        )}
        numRequests={
          Object.keys(requestWithOffersAndTimeline.data || {}).length
        }
        isCav={isOffers}
        isAcceptedRequests={false}
      />
      <RequestList
        requests={requestWithOffersAndTimeline.data}
        loading={
          requestWithOffersAndTimeline && requestWithOffersAndTimeline.loading
        }
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        isPinAndOpenRequest={isRequests}
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

interface PostsProps {
  postType: PostTabsType; // offer or request
}
export default PostsContainer;

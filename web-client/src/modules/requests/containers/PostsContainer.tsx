import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthState } from 'src/ducks/auth/types';
import { updateUserProfile } from 'src/ducks/profile/actions';
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
import { PostsSuffixTypes } from '../constants';

const PostsContainer: React.FC<PostsProps> = ({
  postType, // offer or request
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const isOffers = postType === PostsSuffixTypes.offers;

  const requestWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) => {
      if (isOffers) {
        return requests.syncAcceptedRequestsState;
      }
      return requests.syncOpenRequestsState;
    },
  );
  const user = profileState.profile;
  const authState = useSelector(({ auth }: { auth: AuthState }) => auth);

  function chooseApplicationPreference(preference) {
    if (user && authState.user) {
      user.applicationPreference = preference;
      dispatch(updateUserProfile(authState.user.uid, user));
    }
  }
  const preference = isOffers
    ? ApplicationPreference.cav
    : ApplicationPreference.pin;
  chooseApplicationPreference(preference);

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

interface PostsProps {
  postType: PostsSuffixTypes; // offer or request
}
export default PostsContainer;

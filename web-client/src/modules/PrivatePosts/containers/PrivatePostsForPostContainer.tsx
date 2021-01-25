/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  InformationModal,
  makeLocalStorageKey,
} from 'src/components/Modals/OneTimeModal';
import { resetSetRequestState } from 'src/ducks/findRequests/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { RequestState } from 'src/ducks/PublicRequests/types';
import { OffersState } from 'src/ducks/specificOffers/types';
import { getPostWithOffersAndTimelineItems } from 'src/ducks/timeline/functions';
import { firestore as firestore2 } from 'src/firebase';
import { Post } from 'src/models/posts';
import { ApplicationPreference } from 'src/models/users';
import {
  MyOfferPostsLocationUrl,
  MyRequestPostsLocationUrl,
} from 'src/modules/myRequests/constants';
import TopPanel from 'src/modules/timeline/components/TopPanel/TopPanel';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';

const PrivatePostsForPostContainer: React.FC<{
  postId: string;
}> = ({ postId: requestId }) => {
  const requestRef = firestore2.collection('requests').doc(requestId);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [request, setRequest] = useState<Post | undefined>(undefined);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );

  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );

  const isCav =
    profileState?.profile?.applicationPreference === ApplicationPreference.cav;

  useEffect(() => {
    document.title = 'Reach4Help: '.concat(t('routeSubtitles._timeline'));
  });

  useEffect(() => {
    dispatch(resetSetRequestState());
  }, [dispatch]);

  useEffect(() => {
    if (requestsState.myRequests.data) {
      const requestTemp: Post | undefined =
        requestsState.myRequests.data[requestId];
      setRequest(requestTemp);
    }
  }, [requestsState, requestId]);

  useEffect(() => {
    if (
      (!requestsState.setAction.loading && requestsState.setAction.success) ||
      (!offersState.setAction.loading && offersState.setAction.success)
    ) {
      dispatch(resetSetRequestState());
      // TODO: (es) change below when we replace use of ApplicatonPreference
      if (isCav) {
        history.replace(MyOfferPostsLocationUrl);
      } else {
        history.replace(MyRequestPostsLocationUrl);
      }
    }
  }, [
    requestsState.setAction,
    offersState.setAction,
    dispatch,
    // shouldRedirectToFinished,
    // shouldRedirectToArchived,
    history,
    isCav,
  ]);

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      profileState.userRef
    ) {
      if (!requestsState.myRequests.data && !requestsState.myRequests.loading) {
        dispatch(getPostWithOffersAndTimelineItems(requestRef));
      }
    }
  }, [dispatch, profileState, history, requestRef, requestsState]);

  // TODO: (es) what? reimplement Figure out what this does
  // useEffect(() => {
  // if (
  //   profileState.profile &&
  //   profileState.profile.applicationPreference &&
  //   profileState.userRef
  // ) {
  //   if (request && request.status === RequestStatus.ongoing && accepted) {
  //     history.replace(TimelineViewLocation.toUrl({ requestId }));
  //   }
  //   if (request && request.offers) {
  //     let shouldRedirect = true;
  //     for (const k in request.offers) {
  //       if (request.offers[k].status === OfferStatus.pending) {
  //         shouldRedirect = false;
  //       }
  //     }
  //     if (shouldRedirect && accepted) {
  //       history.replace(TimelineViewLocation.toUrl({ requestId }));
  //     } else if (
  //       !shouldRedirect &&
  //       !accepted &&
  //       profileState.profile.applicationPreference ===
  //         ApplicationPreference.pin
  //     ) {
  //       history.replace(TimelineOfferPostViewLocation.toUrl({ requestId }));
  //     }
  //   }
  // }
  // }, [accepted, request, requestId, history, profileState, ]);

  if (!(profileState.profile && request)) {
    return <LoadingWrapper />;
  }

  // const handleRequest = ({
  //   status,
  //   pinRating,
  //   cavRating,
  // }: {
  //   status?: PostStatus;
  //   pinRating?: number;
  //   cavRating?: number;
  // }) => {
  //   if (request && (status || pinRating || cavRating)) {
  //     status && (request.status = status);
  //     // TODO: LOGIC TO IDENTIFY IF CREATOR OR PARENT IS BEING RATED
  //     // pinRating &&
  //     //   (request.pinRating = pinRating) &&
  //     //   (request.pinRatedAt = firestore.Timestamp.now());
  //     // cavRating &&
  //     //   (request.cavRating = cavRating) &&
  //     //   (request.cavRatedAt = firestore.Timestamp.now());
  //     // if (request.status === RequestStatus.ongoing && updated.pinRatedAt) {
  //     //   setShouldRedirectToFinished(true);
  //     // }
  //     // if (updated.status === RequestStatus.completed && updated.cavRatedAt) {
  //     //   setShouldRedirectToArchived(true);
  //     // }
  //     // dispatch(
  //     //   updateRequest(updated.toObject() as IRequest, requestId, phoneNumber),
  //     // );
  //   }
  // };

  // const handleOffer = (action: boolean, id: string) => {
  //   const offer = request.offers[id].getOffer();
  //   if (action === true) {
  //     offer.status = OfferStatus.accepted;
  //   }
  //   if (action === false) {
  //     offer.status = OfferStatus.rejected;
  //   }
  //   offer.seenAt = null;
  //   dispatch(setOffer(offer.toObject() as IOffer, id, phoneNumber));
  // };

  const instructions = [
    t('information_modal.TimelineViewContainer.0'),
    t('information_modal.TimelineViewContainer.1'),
    t('information_modal.TimelineViewContainer.2'),
    t('information_modal.TimelineViewContainer.3'),
    t('information_modal.TimelineViewContainer.4'),
    t('information_modal.TimelineViewContainer.5'),
    t('information_modal.TimelineViewContainer.6'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.TimelineViewContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <TopPanel
        request={request}
        goBack={() => {
          dispatch(resetSetRequestState());
          setTimeout(() => {
            history.goBack();
          }, 100);
        }}
        user={
          request.userSnapshot
          // TODO: (es) Figure out what this does
          // profileState.profile.applicationPreference ===
          //   ApplicationPreference.cav
          //   ? request.parentSnapshot?.userSnapshot
          //   : request.userSnapshot
          //     ? request.userSnapshot
          //     : undefined
        }
      />
      {/* {accepted && (
        <OffersList
          loading={false}
          destinationCoords={request.latLng}
          offers={request.offers}
          handleOffer={handleOffer}
        />
      )} */}
      {/* {!accepted && request.timeline && profileState.userRef && (
        <>
          <TimelineList
            items={request.timeline}
            currentUser={profileState.userRef}
          />
        </>
      )} */}
      <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
        {/* <BottomPanel
          request={request}
          currentUser={profileState.profile}
          handleRequest={handleRequest}
          isCav={isCav}
        /> */}
      </div>
      <InformationModal
        title={t('information_modal.TimelineViewContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

export default PrivatePostsForPostContainer;

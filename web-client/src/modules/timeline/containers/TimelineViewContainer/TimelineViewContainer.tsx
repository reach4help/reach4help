/* eslint-disable no-console */
import { firestore } from 'firebase';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getAcceptedRequests,
  getArchivedRequests,
  getFinishedRequests,
  getOngoingRequests,
  getOpenRequests,
  resetSetRequestState,
  setRequest as updateRequest,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { IOffer, OfferStatus } from 'src/models/offers';
import { IRequest, RequestStatus } from 'src/models/requests';
import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
import { ApplicationPreference } from 'src/models/users';
import { ArchivedRequestsLocation } from 'src/modules/requests/pages/routes/ArchivedRequestsRoute/constants';
import { FinishedRequestsLocation } from 'src/modules/requests/pages/routes/FinishedRequestsRoute/constants';

import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../../components/Modals/OneTimeModal';
import BottomPanel from '../../components/BottomPanel/BottomPanel';
import OffersList from '../../components/OffersList/OffersList';
import TimelineList from '../../components/TimelineList/TimelineList';
import TopPanel from '../../components/TopPanel/TopPanel';
import { TimelineAcceptedViewLocation } from '../../pages/routes/TimelineAcceptedViewRoute/constants';
import { TimelineViewLocation } from '../../pages/routes/TimelineViewRoute/constants';

const TimelineViewContainer: React.FC<TimelineViewContainerProps> = ({
  requestId,
  accepted,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [request, setRequest] = useState<
    RequestWithOffersAndTimeline | undefined
  >(undefined);

  const [shouldRedirectToFinished, setShouldRedirectToFinished] = useState<
    boolean
  >(false);

  const [shouldRedirectToArchived, setShouldRedirectToArchived] = useState<
    boolean
  >(false);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );

  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );

  useEffect(() => {
    document.title = 'Reach4Help: '.concat(t('routeSubtitles._timeline'));
  });

  useEffect(() => {
    dispatch(resetSetRequestState());
  }, [dispatch]);

  useEffect(() => {
    let requestTemp: RequestWithOffersAndTimeline | undefined =
      requestsState.syncOpenRequestsState.data &&
      requestsState.syncOpenRequestsState.data[requestId]
        ? requestsState.syncOpenRequestsState.data[requestId]
        : undefined;
    requestTemp =
      requestTemp ||
      (requestsState.syncAcceptedRequestsState.data &&
      requestsState.syncAcceptedRequestsState.data[requestId]
        ? requestsState.syncAcceptedRequestsState.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.syncOngoingRequestsState.data &&
      requestsState.syncOngoingRequestsState.data[requestId]
        ? requestsState.syncOngoingRequestsState.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.syncArchivedRequestsState.data &&
      requestsState.syncArchivedRequestsState.data[requestId]
        ? requestsState.syncArchivedRequestsState.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.syncFinishedRequestsState.data &&
      requestsState.syncFinishedRequestsState.data[requestId]
        ? requestsState.syncFinishedRequestsState.data[requestId]
        : undefined);
    setRequest(requestTemp);
  }, [requestsState, requestId]);

  useEffect(() => {
    if (
      (!requestsState.setAction.loading && requestsState.setAction.success) ||
      (!offersState.setAction.loading && offersState.setAction.success)
    ) {
      dispatch(resetSetRequestState());
      if (shouldRedirectToFinished) {
        history.push(FinishedRequestsLocation.path);
      }
      if (shouldRedirectToArchived) {
        history.push(ArchivedRequestsLocation.path);
      }
    }
  }, [
    requestsState.setAction,
    offersState.setAction,
    dispatch,
    shouldRedirectToFinished,
    shouldRedirectToArchived,
    history,
  ]);

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      profileState.userRef
    ) {
      if (
        accepted &&
        profileState.profile.applicationPreference === ApplicationPreference.cav
      ) {
        history.replace(TimelineViewLocation.toUrl({ requestId }));
      } else {
        if (
          !requestsState.syncOpenRequestsState.data &&
          !requestsState.syncOngoingRequestsState.loading
        ) {
          dispatch(
            getOpenRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
              lat: profileState.privilegedInformation?.address.coords.latitude,
              lng: profileState.privilegedInformation?.address.coords.longitude,
            }),
          );
        }
        if (
          !requestsState.syncAcceptedRequestsState.data &&
          !requestsState.syncAcceptedRequestsState.loading
        ) {
          dispatch(
            getAcceptedRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
            }),
          );
        }
        if (
          !requestsState.syncOngoingRequestsState.data &&
          !requestsState.syncOngoingRequestsState.loading
        ) {
          dispatch(
            getOngoingRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
            }),
          );
        }
        if (
          !requestsState.syncFinishedRequestsState.data &&
          !requestsState.syncFinishedRequestsState.loading
        ) {
          dispatch(
            getFinishedRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
            }),
          );
        }
        if (
          !requestsState.syncArchivedRequestsState.data &&
          !requestsState.syncArchivedRequestsState.loading
        ) {
          dispatch(
            getArchivedRequests({
              userRef: profileState.userRef,
              userType: profileState.profile.applicationPreference,
            }),
          );
        }
      }
    }
  }, [dispatch, profileState, history, requestId, accepted, requestsState]);

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      profileState.userRef
    ) {
      if (request && request.status === RequestStatus.ongoing && accepted) {
        history.replace(TimelineViewLocation.toUrl({ requestId }));
      }
      if (request && request.offers) {
        let shouldRedirect = true;
        for (const k in request.offers) {
          if (request.offers[k].status === OfferStatus.pending) {
            shouldRedirect = false;
          }
        }
        if (shouldRedirect && accepted) {
          history.replace(TimelineViewLocation.toUrl({ requestId }));
        } else if (
          !shouldRedirect &&
          !accepted &&
          profileState.profile.applicationPreference ===
            ApplicationPreference.pin
        ) {
          history.replace(TimelineAcceptedViewLocation.toUrl({ requestId }));
        }
      }
    }
  }, [accepted, request, requestId, history, profileState]);

  if (!(profileState.profile && request)) {
    return <LoadingWrapper />;
  }

  const handleRequest = ({
    status,
    pinRating,
    cavRating,
  }: {
    status?: RequestStatus;
    pinRating?: number;
    cavRating?: number;
  }) => {
    if (request && (status || pinRating || cavRating)) {
      const updated = request.getRequest();
      status && (updated.status = status);
      pinRating &&
        (updated.pinRating = pinRating) &&
        (updated.pinRatedAt = firestore.Timestamp.now());
      cavRating &&
        (updated.cavRating = cavRating) &&
        (updated.cavRatedAt = firestore.Timestamp.now());
      if (updated.status === RequestStatus.ongoing && updated.pinRatedAt) {
        setShouldRedirectToFinished(true);
      }
      if (updated.status === RequestStatus.completed && updated.cavRatedAt) {
        setShouldRedirectToArchived(true);
      }
      dispatch(updateRequest(updated.toObject() as IRequest, requestId));
    }
  };

  const handleOffer = (action: boolean, id: string) => {
    console.log('offers: ', request.offers);
    console.log('received id: ', id);
    console.log('requestWithOffer: ', request);
    console.log('request: ', request.getRequest());
    const offer = request.offers[id].getOffer();
    console.log('chosen offer: ', offer);
    if (action === true) {
      offer.status = OfferStatus.accepted;
    }
    if (action === false) {
      offer.status = OfferStatus.rejected;
    }
    offer.seenAt = null;
    dispatch(setOffer(offer.toObject() as IOffer, id));
  };

  const isCav =
    profileState.profile.applicationPreference === ApplicationPreference.cav;

  const instructions = [
    `${t('information_modal.TimelineViewContainer.0')}.`,
    `${t('information_modal.TimelineViewContainer.1')}.`,
    `${t('information_modal.TimelineViewContainer.2')}.`,
    `${t('information_modal.TimelineViewContainer.3')}.`,
    `${t('information_modal.TimelineViewContainer.4')}.`,
    `${t('information_modal.TimelineViewContainer.5')}.`,
    `${t('information_modal.TimelineViewContainer.6')}.`,
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
          profileState.profile.applicationPreference ===
          ApplicationPreference.cav
            ? request.pinUserSnapshot
            : request.cavUserSnapshot
            ? request.cavUserSnapshot
            : undefined
        }
      />
      {accepted && (
        <OffersList
          loading={false}
          destinationCoords={request.latLng}
          offers={request.offers}
          handleOffer={handleOffer}
        />
      )}
      {!accepted && request.timeline && profileState.userRef && (
        <>
          <TimelineList
            items={request.timeline}
            currentUser={profileState.userRef}
          />
        </>
      )}
      <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <BottomPanel
          request={request}
          currentUser={profileState.profile}
          handleRequest={handleRequest}
          isCav={isCav}
        />
      </div>
      <InformationModal
        title={t('information_modal.TimelineViewContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

interface TimelineViewContainerProps {
  requestId: string;
  accepted?: boolean;
}

export default TimelineViewContainer;

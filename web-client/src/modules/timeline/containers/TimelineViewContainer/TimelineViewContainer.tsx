/* eslint-disable no-console */
import { firestore } from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
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

import BottomPanel from '../../components/BottomPanel/BottomPanel';
import OffersList from '../../components/OffersList/OffersList';
import TimelineList from '../../components/TimelineList/TimelineList';
import TopPanel from '../../components/TopPanel/TopPanel';
import { TimelineViewLocation } from '../../pages/routes/TimelineViewRoute/constants';

const TimelineViewContainer: React.FC<TimelineViewContainerProps> = ({
  requestId,
  accepted,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [request, setRequest] = useState<
    RequestWithOffersAndTimeline | undefined
  >(undefined);

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
    let requestTemp: RequestWithOffersAndTimeline | undefined = requestsState
      .syncOpenRequestsState.data
      ? requestsState.syncOpenRequestsState.data[requestId]
      : undefined;
    requestTemp =
      requestTemp ||
      (requestsState.syncAcceptedRequestsState.data
        ? requestsState.syncAcceptedRequestsState.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.syncOngoingRequestsState.data
        ? requestsState.syncOngoingRequestsState.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.syncArchivedRequestsState.data
        ? requestsState.syncArchivedRequestsState.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.syncFinishedRequestsState.data
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
    }
  }, [requestsState.setAction, offersState.setAction, dispatch]);

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
        history.push(TimelineViewLocation.toUrl({ requestId }));
      } else {
        if (!requestsState.syncOpenRequestsState.data) {
          dispatch(
            getOpenRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
              lat: profileState.privilegedInformation?.address.coords.latitude,
              lng: profileState.privilegedInformation?.address.coords.longitude,
            }),
          );
        }
        if (!requestsState.syncAcceptedRequestsState.data) {
          dispatch(
            getAcceptedRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
            }),
          );
        }
        if (!requestsState.syncOngoingRequestsState.data) {
          dispatch(
            getOngoingRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
            }),
          );
        }
        if (!requestsState.syncFinishedRequestsState.data) {
          dispatch(
            getFinishedRequests({
              userType: profileState.profile.applicationPreference,
              userRef: profileState.userRef,
            }),
          );
        }
        if (!requestsState.syncArchivedRequestsState.data) {
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
    if (request && request.status === RequestStatus.ongoing && accepted) {
      history.push(TimelineViewLocation.toUrl({ requestId }));
    }
  }, [accepted, request, requestId, history]);

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
      const updated = request;
      status && (updated.status = status);
      pinRating &&
        (updated.pinRating = pinRating) &&
        (updated.pinRatedAt = firestore.Timestamp.now());
      cavRating &&
        (updated.cavRating = cavRating) &&
        (updated.cavRatedAt = firestore.Timestamp.now());
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
    dispatch(setOffer(offer.toObject() as IOffer, id));
  };

  const isCav =
    profileState.profile.applicationPreference === ApplicationPreference.cav;

  return (
    <>
      <TopPanel
        request={request}
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
    </>
  );
};

interface TimelineViewContainerProps {
  requestId: string;
  accepted?: boolean;
}

export default TimelineViewContainer;

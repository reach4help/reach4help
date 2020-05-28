/* eslint-disable no-console */
import { firestore } from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
import { observeOffers, setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import {
  observeNonOpenRequests,
  observeOpenRequests,
  setRequest as updateRequest,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { observeTimeline } from 'src/ducks/timeline/actions';
import { TimelineState } from 'src/ducks/timeline/types';
import { IOffer, Offer, OfferStatus } from 'src/models/offers';
import { IRequest, Request, RequestStatus } from 'src/models/requests';
import { TimelineItem } from 'src/models/requests/timeline';
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

  const [request, setRequest] = useState<Request | undefined>(undefined);
  const [offersForRequest, setOffersForRequest] = useState<
    Record<string, Offer>
  >({});
  const [timelineObjects, setTimelineObjects] = useState<TimelineItem[]>([]);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );

  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );

  const timelineState = useSelector(
    ({ timeline }: { timeline: TimelineState }) => timeline,
  );

  useEffect(() => {
    let requestTemp: Request | undefined = requestsState.openRequests.data
      ? requestsState.openRequests.data[requestId]
      : undefined;
    requestTemp =
      requestTemp ||
      (requestsState.ongoingRequests.data
        ? requestsState.ongoingRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.completedRequests.data
        ? requestsState.completedRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.cancelledRequests.data
        ? requestsState.cancelledRequests.data[requestId]
        : undefined);
    requestTemp =
      requestTemp ||
      (requestsState.removedRequests.data
        ? requestsState.removedRequests.data[requestId]
        : undefined);
    setRequest(requestTemp);
  }, [requestsState, requestId]);

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
        const unsubscribeFromOpen = observeOpenRequests(dispatch, {
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
        });

        const unsubscribeFromOngoing = observeNonOpenRequests(dispatch, {
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
          requestStatus: RequestStatus.ongoing,
        });

        const unsubscribeFromCompleted = observeNonOpenRequests(dispatch, {
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
          requestStatus: RequestStatus.completed,
        });

        const unsubscribeFromCancelled = observeNonOpenRequests(dispatch, {
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
          requestStatus: RequestStatus.cancelled,
        });

        const unsubscribeFromRemoved = observeNonOpenRequests(dispatch, {
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
          requestStatus: RequestStatus.removed,
        });

        const unsubscribeFromOffers = observeOffers(dispatch, {
          userRef: profileState.userRef,
          userType: profileState.profile.applicationPreference,
        });

        const unsubscribeFromTimeline = observeTimeline(dispatch, {
          requestId,
        });

        return () => {
          unsubscribeFromOpen();
          unsubscribeFromOngoing();
          unsubscribeFromCompleted();
          unsubscribeFromCancelled();
          unsubscribeFromRemoved();
          unsubscribeFromOffers();
          unsubscribeFromTimeline();
        };
      }
    }
  }, [dispatch, profileState, history, requestId, accepted]);

  useEffect(() => {
    if (accepted && requestId && offersState.data) {
      const internalOffers: Record<string, Offer> = {};
      for (const key in offersState.data) {
        if (offersState.data[key].requestRef.id === requestId) {
          internalOffers[key] = offersState.data[key];
        }
      }
      setOffersForRequest(internalOffers);
    }
  }, [offersState, accepted, requestId, setOffersForRequest]);

  useEffect(() => {
    if (request && request.status === RequestStatus.ongoing && accepted) {
      history.push(TimelineViewLocation.toUrl({ requestId }));
    }
  }, [accepted, request, requestId, history]);

  useEffect(() => {
    if (timelineState.data) {
      const innerTimelineObjects = timelineState.data
        .slice()
        .sort(
          (a, b) =>
            a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime(),
        );
      setTimelineObjects(innerTimelineObjects);
    }
  }, [timelineState.data]);

  if (
    !(
      profileState.profile &&
      request &&
      !(
        (!accepted && timelineState.loading) ||
        (accepted && offersState.loading)
      )
    )
  ) {
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
    const offer = offersForRequest[id];
    if (action === true) {
      offer.status = OfferStatus.accepted;
    }
    if (action === false) {
      offer.status = OfferStatus.rejected;
    }
    dispatch(setOffer(offer.toObject() as IOffer, id));
  };

  /*
    TODO: 
      Once backend changes for profile snapshot is done, instead of offers={MockOfferList},
      The OffersList must take the offers from the request itself
  */
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
          loading={offersState.loading}
          offers={offersForRequest}
          handleOffer={handleOffer}
        />
      )}
      {!accepted && timelineState.data && profileState.userRef && (
        <>
          <TimelineList
            items={timelineObjects}
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

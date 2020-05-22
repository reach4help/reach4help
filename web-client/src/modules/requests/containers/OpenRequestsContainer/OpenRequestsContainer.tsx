import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { observeOffers } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import { observeOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { Offer, OfferStatus } from 'src/models/offers';
import { Request } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';

import Header from '../../components/Header/Header';
import RequestItem from '../../components/RequestItem/RequestItem';
import RequestList from '../../components/RequestList/RequestList';
import { AcceptedRequestsLocation } from '../../pages/routes/AcceptedRequestsRoute/constants';
import { OpenRequestsLocation } from '../../pages/routes/OpenRequestsRoute/constants';

const OpenRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [pendingRequests, setPendingRequests] = useState<
    Record<string, Request>
  >({});
  const [pendingOffers, setPendingOffers] = useState<Record<string, Offer[]>>(
    {},
  );
  const [cavDeclinedOffers, setCavDeclinedOffers] = useState<
    Record<string, Offer[]>
  >({});
  const openRequests = useSelector(
    ({ requests }: { requests: RequestState }) => requests.openRequests,
  );
  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.profile && profileState.profile.applicationPreference) {
      const openRequestsSubscription = observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
      const offersStateSubscription = observeOffers(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
      return () => {
        openRequestsSubscription();
        offersStateSubscription();
      };
    }
  }, [profileState, dispatch]);

  useEffect(() => {
    if (openRequests.data && offersState.data) {
      if (
        profileState.profile?.applicationPreference ===
        ApplicationPreference.cav
      ) {
        const internalPendingRequests: Record<string, Request> = {};
        for (const key in offersState.data) {
          if (
            offersState.data[key] &&
            openRequests.data[offersState.data[key].requestRef.id]
          ) {
            internalPendingRequests[offersState.data[key].requestRef.id] =
              openRequests.data[offersState.data[key].requestRef.id];
          }
        }
        setPendingRequests(internalPendingRequests);
      } else if (
        profileState.profile?.applicationPreference ===
          ApplicationPreference.pin &&
        location.pathname === AcceptedRequestsLocation.path
      ) {
        const internalAcceptedRequests: Record<string, Request> = {};
        const internalPendingOffers: Record<string, Offer[]> = {};
        for (const key in offersState.data) {
          if (
            offersState.data[key] &&
            openRequests.data[offersState.data[key].requestRef.id] &&
            offersState.data[key].status === OfferStatus.pending
          ) {
            internalAcceptedRequests[offersState.data[key].requestRef.id] =
              openRequests.data[offersState.data[key].requestRef.id];
            if (offersState.data[key].requestRef.id in internalPendingOffers) {
              internalPendingOffers[offersState.data[key].requestRef.id].push(
                offersState.data[key],
              );
            } else {
              internalPendingOffers[offersState.data[key].requestRef.id] = [
                offersState.data[key],
              ];
            }
          }
        }
        setPendingRequests(internalAcceptedRequests);
        setPendingOffers(internalPendingOffers);
      } else {
        const internalPendingRequests: Record<string, Request> = {
          ...openRequests.data,
        };
        const internalCavDeclinedOffers: Record<string, Offer[]> = {};
        for (const key in offersState.data) {
          if (offersState.data[key]) {
            if (internalPendingRequests[offersState.data[key].requestRef.id]) {
              if (offersState.data[key].status !== OfferStatus.cavDeclined) {
                delete internalPendingRequests[
                  offersState.data[key].requestRef.id
                ];
              } else if (
                offersState.data[key].requestRef.id in internalCavDeclinedOffers
              ) {
                internalCavDeclinedOffers[
                  offersState.data[key].requestRef.id
                ].push(offersState.data[key]);
              } else {
                internalCavDeclinedOffers[
                  offersState.data[key].requestRef.id
                ] = [offersState.data[key]];
              }
            }
          }
        }
        setPendingRequests(internalPendingRequests);
        setCavDeclinedOffers(internalCavDeclinedOffers);
      }
    }
  }, [offersState, openRequests, profileState.profile, location]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  const toCloseRequest: Function = id => `Fill logic: Remove request ${id}`;

  return (
    <>
      <Header
        requestsType={
          location.pathname === AcceptedRequestsLocation.path
            ? 'Accepted'
            : 'Open'
        }
        numRequests={Object.keys(pendingRequests || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests={location.pathname === AcceptedRequestsLocation.path}
      />
      <RequestList
        requests={pendingRequests}
        loading={
          openRequests &&
          openRequests.loading &&
          offersState &&
          offersState.loading
        }
        handleRequest={handleRequest}
        isCavAndOpenRequest={false}
        RequestItem={RequestItem}
        pendingOffersGiven={pendingOffers}
        cavDeclinedOffersGiven={cavDeclinedOffers}
        hideUserPics={
          location.pathname === OpenRequestsLocation.path &&
          profileState.profile?.applicationPreference ===
            ApplicationPreference.pin
        }
        toCloseRequest={toCloseRequest}
        isPin={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.pin
        }
      />
    </>
  );
};

OpenRequestsContainer.propTypes = {};

export default OpenRequestsContainer;

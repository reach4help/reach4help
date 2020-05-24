import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

const OpenRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pendingRequests, setPendingRequests] = useState<
    Record<string, Request>
  >({});
  const [requestOffers, setRequestOffers] = useState<
    Record<string, Record<string, Offer>>
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
      } else {
        const internalPendingRequests: Record<string, Request> = {
          ...openRequests.data,
        };
        const internalRequestOffers: Record<string, Record<string, Offer>> = {};
        for (const key in offersState.data) {
          if (offersState.data[key]) {
            if (internalPendingRequests[offersState.data[key].requestRef.id]) {
              if (offersState.data[key].status !== OfferStatus.cavDeclined) {
                delete internalPendingRequests[
                  offersState.data[key].requestRef.id
                ];
              } else if (
                internalRequestOffers[offersState.data[key].requestRef.id]
              ) {
                internalRequestOffers[offersState.data[key].requestRef.id][
                  key
                ] = offersState.data[key];
              } else {
                internalRequestOffers[offersState.data[key].requestRef.id] = {
                  [key]: offersState.data[key],
                };
              }
            }
          }
        }
        setPendingRequests(internalPendingRequests);
        setRequestOffers(internalRequestOffers);
      }
    }
  }, [offersState, openRequests, profileState.profile]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  const toCloseRequest: Function = id => `Fill logic: Remove request ${id}`;

  return (
    <>
      <Header
        requestsType="Open"
        numRequests={Object.keys(pendingRequests || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests={false}
      />
      <RequestList
        requests={pendingRequests}
        offers={requestOffers}
        loading={
          openRequests &&
          openRequests.loading &&
          offersState &&
          offersState.loading
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
    </>
  );
};

OpenRequestsContainer.propTypes = {};

export default OpenRequestsContainer;

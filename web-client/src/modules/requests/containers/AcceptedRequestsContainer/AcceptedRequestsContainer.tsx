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

import AcceptedRequestItem from '../../components/AcceptedRequestItem/AcceptedRequestItem';
import Header from '../../components/Header/Header';
import RequestList from '../../components/RequestList/RequestList';
import { OpenRequestsLocation } from '../../pages/routes/OpenRequestsRoute/constants';

const OpenRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [acceptedRequests, setAcceptedRequests] = useState<
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
      const internalAcceptedRequests: Record<string, Request> = {};
      const internalRequestOffers: Record<string, Record<string, Offer>> = {};
      for (const key in offersState.data) {
        if (
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        ) {
          history.push(OpenRequestsLocation.path);
        } else if (
          offersState.data[key] &&
          openRequests.data[offersState.data[key].requestRef.id] &&
          offersState.data[key].status === OfferStatus.pending
        ) {
          internalAcceptedRequests[offersState.data[key].requestRef.id] =
            openRequests.data[offersState.data[key].requestRef.id];
          if (internalRequestOffers[offersState.data[key].requestRef.id]) {
            internalRequestOffers[offersState.data[key].requestRef.id][key] =
              offersState.data[key];
          } else {
            internalRequestOffers[offersState.data[key].requestRef.id] = {
              [key]: offersState.data[key],
            };
          }
        }
      }
      setAcceptedRequests(internalAcceptedRequests);
      setRequestOffers(internalRequestOffers);
    }
  }, [offersState, openRequests, profileState.profile, location, history]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  return (
    <>
      <Header
        requestsType="Accepted"
        numRequests={Object.keys(acceptedRequests || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
        isAcceptedRequests
      />
      <RequestList
        requests={acceptedRequests}
        loading={
          openRequests &&
          openRequests.loading &&
          offersState &&
          offersState.loading
        }
        offers={requestOffers}
        handleRequest={handleRequest}
        RequestItem={AcceptedRequestItem}
      />
    </>
  );
};

OpenRequestsContainer.propTypes = {};

export default OpenRequestsContainer;

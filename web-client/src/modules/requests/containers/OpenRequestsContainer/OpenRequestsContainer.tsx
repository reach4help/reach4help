import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { observeOffers, setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import { observeOpenRequests } from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { firestore } from 'src/firebase';
import { OfferStatus } from 'src/models/offers';
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
          if (offersState.data[key]) {
            internalPendingRequests[offersState.data[key].requestRef.id] =
              openRequests.data[offersState.data[key].requestRef.id];
          }
        }
        setPendingRequests(internalPendingRequests);
      } else {
        const internalPendingRequests: Record<string, Request> = {
          ...openRequests.data,
        };
        for (const key in offersState.data) {
          if (offersState.data[key]) {
            if (internalPendingRequests[offersState.data[key].requestRef.id]) {
              delete internalPendingRequests[
                offersState.data[key].requestRef.id
              ];
            }
          }
        }
        setPendingRequests(internalPendingRequests);
      }
    }
  }, [offersState, openRequests, profileState.profile]);

  const handleRequest: Function = id =>
    history.push(TimelineViewLocation.toUrl({ requestId: id }));

  // TODO: THIS NEEDS TO BE PUT IN THE FIND REQUESTS MODULE, WHICH IS THE NEW MAP MODULE.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleRequestForAcceptReject: Function = (id, action) => {
    if (
      openRequests.data &&
      profileState.userRef &&
      profileState.profile &&
      profileState.profile.applicationPreference === ApplicationPreference.cav
    ) {
      dispatch(
        setOffer({
          cavUserRef: profileState.userRef,
          pinUserRef: openRequests.data[id].pinUserRef,
          requestRef: firestore.collection('requests').doc(id),
          cavUserSnapshot: profileState.profile,
          message: 'I want to help!',
          status: action ? OfferStatus.pending : OfferStatus.cavDeclined,
        }),
      );
    }
  };

  return (
    <>
      <Header
        requestsType="Open"
        numRequests={Object.keys(pendingRequests || {}).length}
        isCav={
          profileState.profile?.applicationPreference ===
          ApplicationPreference.cav
        }
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
      />
    </>
  );
};

OpenRequestsContainer.propTypes = {};

export default OpenRequestsContainer;

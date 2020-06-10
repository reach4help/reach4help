import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import LoadingWrapper from '../../../../components/LoadingWrapper/LoadingWrapper';
import {
  getCoordsFromProfile,
  getStreetAddressFromProfile,
} from '../../../../components/WebClientMap/utils';
import Map from '../../../../components/WebClientMap/WebClientMap';
import { setOffer } from '../../../../ducks/offers/actions';
import { OffersState } from '../../../../ducks/offers/types';
import { ProfileState } from '../../../../ducks/profile/types';
import {
  getOpenRequests,
  resetSetRequestState,
} from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import { firestore } from '../../../../firebase';
import { OfferStatus } from '../../../../models/offers';
import { ApplicationPreference } from '../../../../models/users';
import RequestItem from '../../components/RequestItem/RequestItem';
import { OpenRequestsLocation } from '../../pages/routes/OpenRequestsRoute/constants';

interface MapRequestProps {
  center: Coords;
  id: string;
}

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const FindRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [expandedRequestId, setExpandedRequestId] = useState<
    string | undefined
  >(undefined);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const [bannerMessage, setBannerMessage] = useState<string | undefined>(
    getStreetAddressFromProfile(profileState),
  );

  const [currentLocation, setCurrentLocation] = useState<Coords>(() =>
    getCoordsFromProfile(profileState),
  );

  const [requestsWithoutOffer, setRequestsWithoutOffer] = useState<
    MapRequestProps[]
  >([]);

  const pendingRequestsWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      requests.syncOpenRequestsState,
  );

  const setRequestState = useSelector(
    ({ requests }: { requests: RequestState }) => requests.setAction,
  );
  const setOfferState = useSelector(
    ({ offers }: { offers: OffersState }) => offers.setAction,
  );

  useEffect(() => {
    if (
      (!setRequestState.loading && setRequestState.success) ||
      (!setOfferState.loading && setOfferState.success)
    ) {
      // because I could observe race conditions in cloud function
      setTimeout(() => {
        dispatch(resetSetRequestState());
        setExpandedRequestId(undefined);
        history.push(OpenRequestsLocation.path);
      }, 1000);
    }
  }, [setRequestState, setOfferState, dispatch, history]);

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      !pendingRequestsWithOffersAndTimeline.data &&
      !pendingRequestsWithOffersAndTimeline.loading
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
  }, [profileState, dispatch, pendingRequestsWithOffersAndTimeline]);

  useEffect(() => {
    if (
      pendingRequestsWithOffersAndTimeline &&
      pendingRequestsWithOffersAndTimeline.data
    ) {
      const requestsData = pendingRequestsWithOffersAndTimeline.data;
      if (requestsData) {
        const transformedRequests: MapRequestProps[] = Object.keys(
          requestsData,
        ).reduce(
          (acc: MapRequestProps[], curr: string) =>
            !requestsData[curr]
              ? acc
              : [
                  ...acc,
                  {
                    id: curr,
                    center: {
                      lat: requestsData[curr].latLng.latitude,
                      lng: requestsData[curr].latLng.longitude,
                    },
                  },
                ],
          [],
        );

        setRequestsWithoutOffer(transformedRequests);
      }
    }
  }, [pendingRequestsWithOffersAndTimeline]);

  const onRequestHandler = (id: string) => {
    setExpandedRequestId(id);
  };

  const handleRequestForAcceptReject = (action?: boolean) => {
    if (
      expandedRequestId &&
      pendingRequestsWithOffersAndTimeline &&
      pendingRequestsWithOffersAndTimeline.data &&
      profileState.userRef &&
      profileState.profile &&
      profileState.profile.applicationPreference === ApplicationPreference.cav
    ) {
      dispatch(
        setOffer({
          cavUserRef: profileState.userRef,
          pinUserRef:
            pendingRequestsWithOffersAndTimeline.data[expandedRequestId]
              .pinUserRef,
          requestRef: firestore.collection('requests').doc(expandedRequestId),
          cavUserSnapshot: profileState.profile,
          requestSnapshot: pendingRequestsWithOffersAndTimeline.data[
            expandedRequestId
          ].getRequest(),
          message: 'I want to help!',
          status: action ? OfferStatus.pending : OfferStatus.cavDeclined,
        }),
      );
    }
  };

  const maybeRequestDetails = () => {
    if (
      expandedRequestId &&
      pendingRequestsWithOffersAndTimeline &&
      pendingRequestsWithOffersAndTimeline.data
    ) {
      const request =
        pendingRequestsWithOffersAndTimeline.data[expandedRequestId];
      return request ? (
        <RequestDetails>
          <RequestItem
            request={request}
            handleRequest={handleRequestForAcceptReject}
            loading={setOfferState.loading}
            isCavAndOpenRequest
          />
        </RequestDetails>
      ) : null;
    }
    return null;
  };

  const setGeocodedLocation = ({ address, latLng }) => {
    setBannerMessage(address);
    setCurrentLocation(latLng);
  };

  if (
    !pendingRequestsWithOffersAndTimeline.data ||
    pendingRequestsWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <Map
        isCav
        destinations={requestsWithoutOffer}
        origin={currentLocation}
        onDestinationClickedHandler={id => onRequestHandler(id)}
        onGeocode={setGeocodedLocation}
        bannerMessage={bannerMessage}
      />
      {maybeRequestDetails()}
    </>
  );
};

FindRequestsContainer.propTypes = {};

export default FindRequestsContainer;

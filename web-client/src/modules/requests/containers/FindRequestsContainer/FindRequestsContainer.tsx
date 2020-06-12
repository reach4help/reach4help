import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  InformationModal,
  makeLocalStorageKey,
} from 'src/components/InformationModal/InformationModal';
import styled from 'styled-components';

import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
import {
  getCoordsFromProfile,
  getStreetAddressFromProfile,
} from 'src/components/WebClientMap/utils';
import Map from 'src/components/WebClientMap/WebClientMap';
import { setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getOpenRequests,
  resetSetRequestState,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { firestore } from 'src/firebase';
import { OfferStatus } from 'src/models/offers';
import { ApplicationPreference } from 'src/models/users';
import RequestItem from 'src/modules/requests/components/RequestItem/RequestItem';
import { OpenRequestsLocation } from 'src/modules/requests/pages/routes/OpenRequestsRoute/constants';

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
  const { t } = useTranslation();
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
          message: t(
            'modules.requests.containers.FindRequestsContainer.want_to_help',
          ),
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

  const instructions = [
    t('information_modal.FindRequestsContainer.0'),
    t('information_modal.FindRequestsContainer.1'),
    t('information_modal.FindRequestsContainer.2'),
    t('information_modal.FindRequestsContainer.3'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.FindRequestsContainer',
    userid: profileState.uid,
  });

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
      <InformationModal
        title={t('information_modal.FindequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

FindRequestsContainer.propTypes = {};

export default FindRequestsContainer;

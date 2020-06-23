import { firestore } from 'firebase';
import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IUser } from 'src/models/users';
import styled from 'styled-components';

import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../../components/InformationModal/InformationModal';
import {
  getCoordsFromProfile,
  getStreetAddressFromProfile,
} from '../../../../components/WebClientMap/utils';
import Map from '../../../../components/WebClientMap/WebClientMap';
import { DEVICE_MIN } from '../../../../constants/mediaQueries';
import { ProfileState } from '../../../../ducks/profile/types';
import {
  resetSetRequestState,
  setRequest,
} from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import NewRequest from '../../../requests/components/NewRequest/NewRequest';
import RequestConfirmation from '../../../requests/components/NewRequest/RequestConfirmation';
import RequestReview, {
  RequestInput,
} from '../../../requests/components/NewRequest/RequestReview';
import { OpenRequestsLocation } from '../../../requests/pages/routes/OpenRequestsRoute/constants';

/* TODO:  integrate with translation if safe */
const DELIVERIES = 'Deliveries';

const NewRequestsContainer: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [requestInfo, setRequestInfo] = useState<RequestInput | undefined>(
    undefined,
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [showReviewPage, setShowReviewPage] = useState<boolean>(false);

  const [showConfirmationPage, setShowConfirmationPage] = useState<boolean>(
    false,
  );

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const newRequestState = useSelector(
    ({ requests }: { requests: RequestState }) => requests.setAction,
  );

  const [mapAddress, setMapAddress] = useState<string>(
    () =>
      getStreetAddressFromProfile(profileState) || 'Address could not be found',
  );
  const [currentLocation, setCurrentLocation] = useState<Coords>(() =>
    getCoordsFromProfile(profileState),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (newRequestState.success) {
      setShowConfirmationPage(true);
    }
  }, [newRequestState, dispatch]);

  const reviewRequestSubmitHandler = request => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.privilegedInformation
    ) {
      const title = request.type === DELIVERIES ? request.type : request.other;

      dispatch(
        setRequest({
          title,
          description: request.description,
          pinUserRef: profileState.userRef,
          streetAddress:
            mapAddress ||
            t('modules.requests.containers.NewRequestsContainer.address_error'),
          pinUserSnapshot: profileState.profile.toObject() as IUser,
          latLng: new firestore.GeoPoint(
            currentLocation.lat,
            currentLocation.lng,
          ),
        }),
      );
      setIsSubmitting(true);
    }
  };

  const newRequestSubmitHandler = (
    type: string,
    body: string,
    address: string,
    other: string,
  ) => {
    /*    const { t } = useTranslation(); */

    setRequestInfo({
      type,
      streetAddress: address,
      description: body,
      other,
    });
    setShowReviewPage(true);
  };

  const [startLocateMe, setStartLocateMe] = useState<boolean>(false);

  const [startGeocode, setStartGeocode] = useState<boolean>(false);
  const setGeocodedLocation = ({ address, latLng }) => {
    setStartGeocode(false);
    setStartLocateMe(false);
    setMapAddress(address);
    setCurrentLocation(latLng);
  };

  const onGoBack = () => setShowReviewPage(false);

  const maybeNewRequest = () => {
    if (!showReviewPage) {
      const request = {
        streetAddress: mapAddress,
        type: requestInfo ? requestInfo.type : DELIVERIES,
        other: requestInfo ? requestInfo.other : '',
        description: requestInfo ? requestInfo.description : '',
      };

      return (
        <RequestDetails>
          <NewRequest
            onSubmit={newRequestSubmitHandler}
            request={request}
            setStreetAddress={setMapAddress}
            setMapAddress={() => setStartGeocode(true)}
            setMyLocation={() => setStartLocateMe(true)}
          />
        </RequestDetails>
      );
    }
  };

  const maybeRequestReview = () => {
    if (showReviewPage && requestInfo) {
      return (
        <RequestDetails>
          <RequestReview
            request={requestInfo}
            saveRequest={() => {
              reviewRequestSubmitHandler(requestInfo);
            }}
            isSubmitting={isSubmitting}
            goBack={onGoBack}
          />
        </RequestDetails>
      );
    }
  };

  const maybeRequestConfirmation = () => {
    if (showConfirmationPage) {
      return (
        <RequestConfirmation
          showModal={showConfirmationPage}
          closeModal={() => {
            setShowConfirmationPage(false);
            // because I could observe race conditions in cloud function
            setTimeout(() => {
              history.push(OpenRequestsLocation.path);
            }, 150);
            dispatch(resetSetRequestState());
          }}
        />
      );
    }
  };

  const instructions = [
    t('information_modal.NewRequestsContainer.0'),
    t('information_modal.NewRequestsContainer.1'),
    t('information_modal.NewRequestsContainer.2'),
    t('information_modal.NewRequestsContainer.3'),
    t('information_modal.NewRequestsContainer.4'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.NewRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
        }}
      >
        <MapContainer>
          <Map
            isCav={false}
            destinations={[]}
            origin={currentLocation}
            onGeocode={setGeocodedLocation}
            address={mapAddress}
            startGeocode={startGeocode}
            startLocateMe={startLocateMe}
          />
        </MapContainer>
        <div style={{ display: 'flex', height: '100%' }}>
          {maybeNewRequest()}
          {maybeRequestReview()}
          {maybeRequestConfirmation()}
        </div>
      </div>
      <InformationModal
        title={t('information_modal.NewRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

const RequestDetails = styled.div`
  width: 100%;
  background: white;
`;

const MapContainer = styled.div`
  // aspect ratio = 16:9
  height: 56.25vw;

  @media ${DEVICE_MIN.laptop} {
    max-height: 400px;
  }
`;

export default NewRequestsContainer;

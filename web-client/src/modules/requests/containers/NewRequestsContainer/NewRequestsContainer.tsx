import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Map from '../../../../components/WebClientMap/WebClientMap';
import { ProfileState } from '../../../../ducks/profile/types';
import { changeModal, setRequest } from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import { IUser } from '../../../../models/users';
import { RoleInfoLocation } from '../../../personalData/pages/routes/RoleInfoRoute/constants';
import NewRequest, { REQUEST_TYPES } from '../../components/NewRequest/NewRequest';
import RequestConfirmation from '../../components/NewRequest/RequestConfirmation';
import RequestReview, { RequestInput } from '../../components/NewRequest/RequestReview';
import { OpenRequestsLocation } from '../../pages/routes/OpenRequestsRoute/constants';

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const NewRequestsContainer: React.FC = () => {
  const history = useHistory();

  const [requestInfo, setRequestInfo] = useState<RequestInput | undefined>(
    undefined,
  );

  const [showReviewPage, setShowReviewPage] = useState<boolean>(
    false,
  );

  const [showConfirmationPage, setShowConfirmationPage] = useState<boolean>(
    false,
  );

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const newRequestState = useSelector(
    ({ requests }: { requests: RequestState }) => requests.setAction,
  );

  useEffect(() => {
    setShowConfirmationPage(newRequestState.success);
  }, [newRequestState]);

  const [mapAddress, setMapAddress] = useState<string>();

  const [streetAddress, setStreetAddress] = useState<string>(() =>
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address &&
    profileState.privilegedInformation.addressFromGoogle.formatted_address
      ? profileState.privilegedInformation.addressFromGoogle.formatted_address
      : 'Address could not be found',
  );
  const [currentLocation, setCurrentLocation] = useState<Coords>(() =>
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address &&
    profileState.privilegedInformation.address.coords
      ? {
          lat: profileState.privilegedInformation.address.coords.latitude,
          lng: profileState.privilegedInformation.address.coords.longitude,
        }
      : {
          lat: 13.4124693,
          lng: 103.8667,
        },
  );

  if (!currentLocation || !currentLocation.lat) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(pos);
      },
      error => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      },
    );
  }

  const dispatch = useDispatch();

  const reviewRequestSubmitHandler = request => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.privilegedInformation
    ) {
      dispatch(
        setRequest({
          title: request.title,
          description: request.description,
          pinUserRef: profileState.userRef,
          streetAddress,
          pinUserSnapshot: profileState.profile.toObject() as IUser,
          latLng: profileState.privilegedInformation.address.coords,
        }),
      );
    }
  };

  const newRequestSubmitHandler = (
    title: string,
    body: string,
    address: string,
  ) => {
    setRequestInfo({
      title,
      streetAddress: address,
      description: body,
    });
    setShowReviewPage(true);
  };

  const setGeocodedLocation = ({ address, latLng }) => {
    setStreetAddress(address);
    setCurrentLocation(latLng);
  };

  const onGoBack = () => setShowReviewPage(false);

  const maybeNewRequest = () => {
    if (!showReviewPage) {
      const request = {
        streetAddress,
        title: requestInfo ? requestInfo.title : 'deliveries',
        description: requestInfo ? requestInfo.description : '',
      };

      return (
        <RequestDetails>
          <NewRequest
            onSubmit={newRequestSubmitHandler}
            onCancel={() => history.push(RoleInfoLocation.path)}
            request={request}
            setStreetAddress={setStreetAddress}
            setMapAddress={setMapAddress}
          />
        </RequestDetails>
      );
    }
  };

  const maybeRequestReview = () => {
    if (showReviewPage && requestInfo) {
      const details: RequestInput = { ...requestInfo };
      details.title = REQUEST_TYPES[requestInfo.title];
      return (
        <RequestDetails>
          <RequestReview
            request={details}
            saveRequest={() => {
              reviewRequestSubmitHandler(requestInfo);
            }}
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
            dispatch(changeModal(false));
            history.push(OpenRequestsLocation.path);
          }}
        />
      );
    }
  };

  return (
    <>
      <Map
        isCav={false}
        destinations={[]}
        origin={currentLocation}
        onGeocode={setGeocodedLocation}
        geocodingAddress={mapAddress}
        height="25vh"
      />

      {maybeNewRequest()}
      {maybeRequestReview()}
      {maybeRequestConfirmation()}
    </>
  );
};

NewRequestsContainer.propTypes = {};

export default NewRequestsContainer;

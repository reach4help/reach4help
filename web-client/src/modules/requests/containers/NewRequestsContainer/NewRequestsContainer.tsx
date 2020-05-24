import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Map, {
  OriginMarkerProps,
} from '../../../../components/WebClientMap/WebClientMap';
import { ProfileState } from '../../../../ducks/profile/types';
import { setRequest } from '../../../../ducks/requests/actions';
import { IUser } from '../../../../models/users';
import NewRequest from '../../components/NewRequest/NewRequest';

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const NewRequestsContainer: React.FC = () => {
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const [mapAddress, setMapAddress] = useState<string>();

  const [streetAddress, setStreetAddress] = useState<string>(() =>
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address &&
    profileState.privilegedInformation.addressFromGoogle.formatted_address
      ? profileState.privilegedInformation.addressFromGoogle.formatted_address
      : 'Address could not be found',
  );
  const [currentLocation, setCurrentLocation] = useState<OriginMarkerProps>(
    () =>
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

  const dispatch = useDispatch();

  const newRequestSubmitHandler = (title: string, body: string) => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.privilegedInformation
    ) {
      dispatch(
        setRequest({
          title,
          description: body,
          pinUserRef: profileState.userRef,
          pinUserSnapshot: profileState.profile.toObject() as IUser,
          latLng: profileState.privilegedInformation.address.coords,
        }),
      );
    }
  };

  const onCancel = () => (
    <RequestDetails>
      <div>Request review component</div>
    </RequestDetails>
  );

  const setGeocodedLocation = ({ streetAddress, latLng }) => {
    setStreetAddress(streetAddress);
    setCurrentLocation(latLng);
  };

  return (
    <>
      <Map
        destinations={[]}
        origin={currentLocation}
        onGeocode={setGeocodedLocation}
        geocodingAddress={mapAddress}
      />
      <RequestDetails>
        <NewRequest
          createRequest={newRequestSubmitHandler}
          onCancel={onCancel}
          streetAddress={streetAddress}
          setStreetAddress={setStreetAddress}
          setMapAddress={setMapAddress}
        />
      </RequestDetails>
    </>
  );
};

NewRequestsContainer.propTypes = {};

export default NewRequestsContainer;

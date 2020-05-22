import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Map from '../../../../components/WebClientMap/WebClientMap';
import { VolunteerMarkerProps } from '../../../../components/WebClientMap/WebClientMarker';
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

  const [currentLocation, setCurrentLocation] = useState<VolunteerMarkerProps>(
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

  const newRequestSubmitHandler = (
    title: string,
    body: string,
  ) => {
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

  const newRequest = () => (
    <RequestDetails>
      <NewRequest
        createRequest={newRequestSubmitHandler}
        onCancel={onCancel}
      />
    </RequestDetails>
  );
  return (
    <>
      <Map
        requests={[]}
        volunteerLocation={currentLocation}
        onRequestHandler={() => 'test'}
      />
      {newRequest()}
    </>
  );
};

NewRequestsContainer.propTypes = {};

export default NewRequestsContainer;

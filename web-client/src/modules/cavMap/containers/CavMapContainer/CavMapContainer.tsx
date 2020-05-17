import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileState } from '../../../../ducks/profile/types';
import { observeOpenRequests } from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import DummyMapComponent, {
  LocationProps,
  MapRequestProps,
} from './DummyMapComponent';
import Map from '../../../../components/WebClientMap/WebClientMap';

const CavMapContainer: React.FC = () => {
  const dispatch = useDispatch();

  /* Using real place as default location. {lat:0,lng:0} is just water */
  let [currentLocation, setCurrentLocation] = useState<LocationProps>({
    lat: 13.4124693,
    lng: 103.8667,
  });
  const [openRequests, setOpenRequests] = useState<MapRequestProps[]>([]);
  let geolocated = false;

  navigator.geolocation.getCurrentPosition(
    position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(pos);
      geolocated = true;
    },
    error => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    },
  );

  const requestsState = useSelector(
    ({ requests }: { requests: RequestState }) => requests,
  );

  useEffect(() => {
    if (requestsState.openRequests && requestsState.openRequests.data) {
      const transformedRequests: MapRequestProps[] = [];
      Object.keys(requestsState.openRequests.data || {}).forEach(
        (requestId: string) => {
          if (requestsState.openRequests.data) {
            const request = requestsState.openRequests.data[requestId];
            const mapRequestDetails = {
              center: {
                lat: request.latLng.latitude,
                lng: request.latLng.longitude,
              },
              id: requestId,
            };
            transformedRequests.push(mapRequestDetails);
          }
        },
      );

      setOpenRequests(transformedRequests);
    }
  }, [requestsState]);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  useEffect(() => {
    if (profileState.profile) {
      return observeOpenRequests(dispatch, {
        userRef: profileState.userRef,
        userType: profileState.profile.applicationPreference,
      });
    }
    if (
      !geolocated &&
      profileState &&
      profileState.privilegedInformation &&
      profileState.privilegedInformation.address &&
      profileState.privilegedInformation.address.coords
    ) {
      currentLocation = {
        lat: profileState.privilegedInformation.address.coords.latitude,
        lng: profileState.privilegedInformation.address.coords.longitude,
      };
    }
  }, [profileState, dispatch]);

  let myRequests = [
    {
      center: {
        lat: 40.6446255,
        lng: -74.0325336,
      },
      id: '5',
    },
  ];
  console.log('open requests', openRequests, 'my requests', myRequests);

  return (
    <>
      <Map
        requests={myRequests}
        volunteerLocation={currentLocation}
        onRequestHandler={() => 'test'}
      />
    </>
  );
};

CavMapContainer.propTypes = {};

export default CavMapContainer;

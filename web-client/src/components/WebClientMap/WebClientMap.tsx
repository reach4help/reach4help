import GoogleMapReact, { Coords } from 'google-map-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import MyLocationIcon from '../../assets/MyLocationIcon.png';
import { DestinationMarker, OriginMarker } from './WebClientMapMarker';
import WebClientMapMessage from './WebClientMapMessage';

const ANGKOR_WAT = {
  lat: 13.4124693,
  lng: 103.8667,
};

const secondsToTimestring = (seconds: number) =>
  moment.duration(seconds, 'seconds').humanize();

const metersToKm = (meters: number) => `${(meters / 1000).toFixed(1)}km`;

const metersToImperial = (meters: number) =>
  `${(meters * 0.000621371).toFixed(1)}mi`;

declare global {
  interface Window {
    GOOGLE_MAPS_API_KEY?: string;
  }
}

/**
 * The default API Key is obtained from the env variable REACT_APP_GMAPS_API_KEY
 * The one provided in the repo is what's used on the live site,
 * and is restricted to map.reach4help.org
 *
 * To use your own key,
 * set the environment variable `REACT_APP_GMAPS_API_KEY` to your key.
 * or set the global window variable `GOOGLE_MAPS_API_KEY`
 */
const PUBLIC_API_KEY = process.env.REACT_APP_GMAPS_API_KEY;

const apiKey = window.GOOGLE_MAPS_API_KEY
  ? window.GOOGLE_MAPS_API_KEY
  : PUBLIC_API_KEY;

const createMapOptions = maps => ({
  zoomControlOptions: {
    position: maps.ControlPosition.RIGHT_CENTER,
    style: maps.ZoomControlStyle.SMALL,
  },
  mapTypeControlOptions: {
    position: maps.ControlPosition.TOP_RIGHT,
  },
  mapTypeControl: true,
});

export const getCoordsFromProfile = profileState => {
  if (
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address &&
    profileState.privilegedInformation.address.coords
  ) {
    return {
      lat: profileState.privilegedInformation.address.coords.latitude,
      lng: profileState.privilegedInformation.address.coords.longitude,
    };
  }
  return {
    lat: ANGKOR_WAT.lat,
    lng: ANGKOR_WAT.lng,
  };
};

export const getStreetAddressFromProfile = profileState => {
  if (
    profileState &&
    profileState.privilegedInformation &&
    profileState.privilegedInformation.address
  ) {
    const { address } = profileState.privilegedInformation;
    const { address1, address2, postalCode, city, state, country } = address;
    const undefinedSafe = value => value || '';
    const formattedAddress = `${undefinedSafe(address1)} ${undefinedSafe(
      address2,
    )} ${undefinedSafe(city)} ${undefinedSafe(state)} ${undefinedSafe(
      postalCode,
    )} ${undefinedSafe(country)}`;

    return formattedAddress;
  }
};
const WebClientMap: React.FC<MapProps> = ({
  destinations,
  origin = { lat: 0, lng: 0 },
  onDestinationClickedHandler,
  address,
  onGeocode,
  zoom = 11,
  height = '100%',
  isCav = true,
  bannerMessage = '',
  startGeocode,
  startLocateMe,
}) => {
  const geocodeCallback = (result, status) => {
    if (status === 'OK' && result && result.length) {
      if (onGeocode) {
        const lat = result[0].geometry.location.lat();
        const lng = result[0].geometry.location.lng();
        onGeocode({
          address: result[0].formatted_address,
          latLng: { lat, lng },
        });
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Unable to geocode');
    }
  };

  const [mapMessage, setMapMessage] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  useEffect(() => {
    setMapMessage(bannerMessage);
  }, [bannerMessage]);

  // google services
  const [DirectionsRenderer, setDirectionsRenderer] = useState<any | undefined>(
    undefined,
  );
  const [DirectionsService, setDirectionsService] = useState<any | undefined>(
    undefined,
  );
  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);

  const initGoogleMapServices = ({ map, maps }) => {
    if (map && maps) {
      if (typeof DirectionsRenderer === 'undefined') {
        const directionsRenderer = new maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        setDirectionsRenderer(directionsRenderer);
      }
      if (typeof DirectionsService === 'undefined') {
        setDirectionsService(new maps.DirectionsService());
      }
      if (typeof Geocoder === 'undefined') {
        setGeocoder(new maps.Geocoder());
      }
    }
  };
  const doGeocode = ({ center, streetAddress }) => {
    if (Geocoder) {
      /* do street address first */
      if (streetAddress) {
        Geocoder.geocode({ address: streetAddress }, geocodeCallback);
      } else if (center) {
        Geocoder.geocode({ location: center }, geocodeCallback);
      }
    }
  };

  useEffect(() => {
    if (startGeocode) {
      doGeocode({ streetAddress: address, center: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startGeocode, Geocoder, address, origin]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos: Coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        doGeocode({ center: pos, streetAddress: '' });
      },
      error => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      },
    );
  };

  useEffect(() => {
    if (startLocateMe) {
      getCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLocateMe, Geocoder]);

  const getDirections = destination => {
    DirectionsService.route(
      { origin, destination: destination.center, travelMode: 'DRIVING' },
      (result, status) => {
        if (status === 'OK') {
          DirectionsRenderer.setDirections(result);
          let distance = 0;
          let duration = 0;
          result.routes[0].legs.forEach(leg => {
            distance += leg.distance.value;
            duration += leg.duration.value;
          });
          setMapMessage(
            `${secondsToTimestring(duration)} (${metersToKm(
              distance,
            )}/${metersToImperial(distance)})`,
          );
        } else {
          // eslint-disable-next-line no-console
          console.error('DISTANCE SERVICE ERROR:', status, result);
        }
      },
    );
  };

  const destinationClickedHandler = destination => {
    setSelectedDestination(destination.id);
    if (DirectionsService) {
      getDirections(destination);
    }
    if (onDestinationClickedHandler) {
      onDestinationClickedHandler(destination.id);
    }
  };

  if (!apiKey) {
    return <>Could not obtain Google Maps API key</>;
  }
  const centerMarkerProps = { ...origin, isCav };
  /*
  const fakeDestinations = [
    {
      id: '4',
      center: {
        lat: origin.lat ? origin.lat * 1.001 : 0,
        lng: origin.lng ? origin.lng / 1.001 : 0,
      },
    },
  ];
*/
  const LocateMeContainer = () => (
    <div
      onClick={() => getCurrentLocation()}
      style={{
        backgroundColor: 'rgb(275, 155, 54)',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}
    >
      <img alt="My location" src={MyLocationIcon} />
      <img alt="My location" src={MyLocationIcon} />
      <img alt="My location" src={MyLocationIcon} />
    </div>
  );

  return (
    <>
      <div style={{ height, width: '100%' }}>
        {mapMessage && <WebClientMapMessage message={mapMessage} />}
        {isCav && <LocateMeContainer />}
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: apiKey }}
          options={createMapOptions}
          center={origin}
          defaultZoom={zoom}
          onGoogleApiLoaded={initGoogleMapServices}
        >
          <OriginMarker {...centerMarkerProps} />
          {destinations.map(r => (
            <DestinationMarker
              key={r.id}
              selected={r.id === selectedDestination}
              lat={r.center.lat}
              lng={r.center.lng}
              onClick={() => destinationClickedHandler(r)}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

interface MapProps {
  destinations: {
    center: {
      lat: number;
      lng: number;
    };
    id: string;
  }[];
  origin?: {
    lat: number;
    lng: number;
  };
  address?: string;
  onGeocode?: ({ address: string, latLng: Coords }) => void;
  onDestinationClickedHandler?: (id: string) => void;
  zoom?: number;
  height?: string;
  isCav?: boolean;
  bannerMessage?: string;
  startGeocode?: boolean;
  startLocateMe?: boolean;
}

export default WebClientMap;

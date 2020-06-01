import GoogleMapReact, { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';

import apiKey from './apiKey';
import MyLocationIcon from './assets/MyLocationIcon.png';
import { metersToImperial, metersToKm, secondsToTimestring } from './utils';
import { DestinationMarker, OriginMarker } from './WebClientMapMarker';
import WebClientMapMessage from './WebClientMapMessage';

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

const WebClientMap: React.FC<MapProps> = ({
  destinations,
  origin = { lat: 0, lng: 0 },
  onDestinationClickedHandler,
  address,
  onGeocode,
  zoom = 11,
  isCav = true,
  bannerMessage = '',
  startGeocode,
  startLocateMe,
}) => {
  /* banner message */
  const [googleMap, setGoogleMap] = useState<any>(null);
  const [mapMessage, setMapMessage] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  useEffect(() => {
    setMapMessage(bannerMessage);
  }, [bannerMessage]);

  /* google services */

  const [DirectionsRenderer, setDirectionsRenderer] = useState<any | undefined>(
    undefined,
  );
  const [DirectionsService, setDirectionsService] = useState<any | undefined>(
    undefined,
  );
  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);

  const initGoogleMapServices = ({ map, maps }) => {
    if (map && maps) {
      googleMap || setGoogleMap(map);
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

  /* geocode */
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

  /* get current location */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos: Coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        doGeocode({ center: pos, streetAddress: '' });
        if (googleMap.getCenter() !== pos) {
          googleMap.panTo(pos);
        }
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

  /* Directions service */
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
      <div style={{ height: '100%', width: '100%' }}>
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
  isCav?: boolean;
  bannerMessage?: string;
  startGeocode?: boolean;
  startLocateMe?: boolean;
}

export default WebClientMap;

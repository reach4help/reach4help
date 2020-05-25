import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { DestinationMarker, OriginMarker } from './WebClientMapMarker';
import WebClientMapMessage from './WebClientMapMessage';

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

const WebClientMap: React.FC<MapProps> = ({
  destinations,
  origin = { lat: 0, lng: 0 },
  onDestinationClickedHandler,
  geocodingAddress,
  onGeocode,
  zoom = 11,
  height = '100%',
  isCav = true,
  bannerMessage = '',
}) => {
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
  };

  useEffect(() => {
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
        console.error('Unable to geocode');
      }
    };

    if (Geocoder) {
      if (geocodingAddress) {
        Geocoder.geocode({ address: geocodingAddress }, geocodeCallback);
      } else {
        Geocoder.geocode({ location: origin }, geocodeCallback);
      }
    }
  }, [Geocoder, geocodingAddress]);

  const secondsToTimestring = (seconds: number) =>
    moment.duration(seconds, 'seconds').humanize();

  const metersToKm = (meters: number) => `${(meters / 1000).toFixed(1)}km`;

  const metersToImperial = (meters: number) =>
    `${(meters * 0.000621371).toFixed(1)}mi`;

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
    const fakeDestination = [
    {
      id: '4',
      center: {
        lat: origin.lat ? origin.lat * 1.001 : 0,
        lng: origin.lng ? origin.lng / 1.001 : 0,
      },
    },
  ];
*/
  return (
    <>
      <div style={{ height: height, width: '100%' }}>
        {mapMessage && <WebClientMapMessage message={mapMessage} />}
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
  geocodingAddress?: string;
  onGeocode?: ({ address: string, latLng: Coords }) => void;
  onDestinationClickedHandler?: (id: string) => void;
  zoom?: number;
  height?: string;
  isCav?: boolean;
  bannerMessage?: string;
}

export default WebClientMap;

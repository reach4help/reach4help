import GoogleMapReact, { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import apiKey from './apiKey';
import CustomMapControlPortal from './CustomMapControlPortal';
import MyLocationControl from './MyLocationControl';
import { metersToImperial, metersToKm, secondsToTimestring } from './utils';
import { DestinationMarker, SmallOrangeMarker } from './WebClientMapMarker';
import WebClientMapMessage from './WebClientMapMessage';

const createMapOptions = maps => ({
  zoomControlOptions: {
    position: maps.ControlPosition.TOP_RIGHT,
    style: maps.ZoomControlStyle.SMALL,
  },
  mapTypeControlOptions: {
    position: maps.ControlPosition.TOP_LEFT,
  },
  mapTypeControl: true,
});

const WebClientMap: React.FC<MapProps> = ({
  origin = { lat: 0, lng: 0 },
  destinations,
  onDestinationClickedHandler,
  address,
  onGeocode,
  startGeocode,
  startLocateMe,
  bannerMessage = '',
  zoom = 11,
  isCav = true,
  forceRerender = false,
  height,
  canRelocate = true,
}) => {
  const { t } = useTranslation();

  /* banner message */
  const [mapMessage, setMapMessage] = useState<string>('');

  useEffect(() => {
    setMapMessage(bannerMessage);
  }, [bannerMessage]);

  /* google services */
  const [googleMap, setGoogleMap] = useState<any>(null);
  const [googleMapS, setGoogleMapS] = useState<any>(null);

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
      googleMapS || setGoogleMapS(maps);
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

  useEffect(() => {
    if (forceRerender && googleMapS && googleMap) {
      googleMapS.event.trigger(googleMap, 'resize');
    }
  }, [forceRerender, googleMap, googleMapS]);

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
      console.error(t('components.web_client_map.geocode_error'));
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

  /* locate me */
  const locateMe = () => {
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
      locateMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLocateMe, Geocoder]);

  /* Directions, Origin, Destination, Paths */

  const [selectedDestination, setSelectedDestination] = useState<string>('');

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
          console.error(
            t('components.web_client_map.distance_error'),
            status,
            result,
          );
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

  return !apiKey ? (
    <>{t('components_web_client_map.api_error')} Google Maps API key</>
  ) : (
    <MapWrapper isCav={isCav} height={height}>
      {mapMessage && <WebClientMapMessage message={mapMessage} />}
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: apiKey }}
        options={createMapOptions}
        center={origin}
        defaultZoom={zoom}
        onGoogleApiLoaded={initGoogleMapServices}
      >
        {canRelocate && (
          <CustomMapControlPortal
            map={googleMap || null}
            controlPosition={googleMapS?.ControlPosition.LEFT_TOP}
          >
            <MyLocationControl onClick={locateMe} />
          </CustomMapControlPortal>
        )}
        <SmallOrangeMarker lat={origin.lat} lng={origin.lng} />
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
    </MapWrapper>
  );
};

/* TODO:  find better css solution.
Because the FindRequest map (CAV map) appears within a tab, 
we have to make room for tab buttons
We are currently adjusting the top css but there is probably a better solution.
*/
const MapWrapper = styled.div<{ isCav?: boolean; height?: string }>`
  left: 0;
  height: ${props => (props.height ? props.height : '100%')};
  width: 100%;
  position: absolute;
`;

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
  forceRerender?: boolean;
  height?: string;
  canRelocate?: boolean;
}
export default WebClientMap;

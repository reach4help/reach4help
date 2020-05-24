import GoogleMapReact, { Coords } from 'google-map-react';
import React, { useState, useEffect } from 'react';
import LargeOrangeMarkerIcon from '../../assets/map-marker-orange-lg.png';
import SmallOrangeMarkerIcon from '../../assets/map-marker-orange-sm.png';
import LargePurpleMarkerIcon from '../../assets/map-marker-purple-lg.png';

export const OriginMarker: React.FC<OriginMarkerProps> = props => {
  return (
    <div>
      <img
        src={props.isCav ? LargePurpleMarkerIcon : LargeOrangeMarkerIcon}
        alt="My location"
      />
    </div>
  );
};

export const DestinationMarker: React.FC<DestinationMarkerProps> = ({
  key,
  selected,
  onClick,
}) => (
  <div onClick={() => onClick(key)}>
    <img
      src={selected ? LargeOrangeMarkerIcon : SmallOrangeMarkerIcon}
      alt="Destination"
    />
  </div>
);

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
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>(
    'none',
  );

  // google services
  const [DirectionsService, setDirectionsService] = useState<any | undefined>(
    undefined,
  );
  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);
  const initGoogleMapServices = ({ maps }) => {
    if (typeof DirectionsService === 'undefined') {
      setDirectionsService(new maps.DirectionsService());
    }
    if (typeof Geocoder === 'undefined') {
      setGeocoder(new maps.Geocoder());
    }
  };

  useEffect(() => {
    if (!Geocoder) {
      console.log('no geocoder', origin, Geocoder);
    } else if (geocodingAddress) {
      Geocoder.geocode({ address: geocodingAddress }, result => {
        if (result && result.length) {
          if (onGeocode) {
            const lat = result[0].geometry.location.lat();
            const lng = result[0].geometry.location.lng();
            onGeocode({
              address: result[0].formatted_address,
              latLng: { lat, lng },
            });
          }
        }
      });
    }
  }, [Geocoder, geocodingAddress]);

  const destinationClickedHandler = id => {
    setSelectedDestination(id);
    if (onDestinationClickedHandler) {
      onDestinationClickedHandler(id);
    }
  };

  if (!apiKey) {
    return <>Could not obtain Google Maps API key</>;
  }
  let centerMarkerProps = { ...origin, isCav };
  console.log(centerMarkerProps);
  return (
    <>
      <div style={{ height: height, width: '100%' }}>
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
              onClick={() => destinationClickedHandler(r.id)}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

interface OriginMarkerProps extends Coords {
  isCav: boolean;
}

interface DestinationMarkerProps extends Coords {
  onClick: (id: string) => void;
  key: string;
  selected?: boolean;
}

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
}

export default WebClientMap;

/*
  const findDistanceToRequest = id => {
    const req = requests.find(r => r.id === id);
    if (req && req.center) {
      DirectionsService.getDistanceMatrix(
        {
          origins: [volunteerLocation],
          destinations: [req.center],
          travelMode: 'TRANSIT',
        },
        callback,
      );
    }
    function callback(response, status) {
      // response is an array of travel methods
      console.log('distance', response, status);
      debugger;
    }
  };
*/

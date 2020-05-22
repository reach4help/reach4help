import { firestore } from 'firebase';
import GoogleMapReact from 'google-map-react';
import React, { useState, useEffect } from 'react';

import {
  RequestMarker,
  VolunteerMarker,
  VolunteerMarkerProps,
} from './WebClientMarker';

const NO_STREET_ADDRESS = 'No Street Address';

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
  requests,
  volunteerLocation,
  onRequestHandler,
  zoom = 11,
}) => {
  const [selectedRequest, setSelectedRequest] = useState<string>('none');
  const [DirectionsService, setDirectionsService] = useState<any | undefined>(
    undefined,
  );
  const [center, setCenter] = useState<VolunteerMarkerProps>();
  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);
  const [streetAddress, setStreetAddress] = useState<string>(NO_STREET_ADDRESS);
  const [doLocationSearch, setDoLocationSearch] = useState<boolean>(false);

  useEffect(() => {
    function geocodeCallback(result) {
      if (result && result.length) {
        console.log(
          'street address',
          result[0].geometry.location,
          result[0].geometry.location.lat(),
          result[0].geometry.location.lng(),
          result[0].formatted_address,
        );
        //        debugger;
        //        setCenter(result[0].geometry.location);
        setStreetAddress(result[0].formatted_address);
        setDoLocationSearch(false);
      }
    }
    if (!Geocoder) {
      console.log('no geocoder', volunteerLocation, Geocoder);
    } else {
      if (streetAddress === NO_STREET_ADDRESS) {
        Geocoder.geocode({ location: volunteerLocation }, geocodeCallback);
      } else {
        Geocoder.geocode({ address: streetAddress }, geocodeCallback);
      }
    }
  }, [Geocoder, doLocationSearch]);

  const initGoogleMapServices = ({ maps }) => {
    if (typeof DirectionsService === 'undefined') {
      setDirectionsService(new maps.DirectionsService());
    }
    if (typeof Geocoder === 'undefined') {
      setGeocoder(new maps.Geocoder());
    }
  };
  const requestClickedHandler = id => {
    setSelectedRequest(id);
    onRequestHandler(id);
    //  findDistanceToRequest(id);
  };

  if (!apiKey) {
    return <>Couldnt obtain API KEY</>;
  }

  if (volunteerLocation && !isNaN(volunteerLocation.lat)) {
    console.log('oooooo center', center);
    //setCenter(volunteerLocation);
  }
  console.log(
    'center',
    center,
    volunteerLocation,
    !isNaN(volunteerLocation.lat),
  );
  return (
    <>
      <div
        style={{
          opacity: 1,
          border: '1px solid black',
          backgroundColor: 'white',
        }}
      >
        <div>
          {' '}
          Current Address
          <input
            onChange={e => {
              setStreetAddress(e.target.value);
            }}
            value={streetAddress}
          />
          <div
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={() => {
              setDoLocationSearch(true);
            }}
          >
            Search Again
          </div>
          <div
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={() => alert(`submitted ${streetAddress}`)}
          >
            Submit Address
          </div>
        </div>
      </div>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: apiKey }}
          options={createMapOptions}
          center={volunteerLocation}
          defaultZoom={zoom}
          onGoogleApiLoaded={initGoogleMapServices}
        >
          <VolunteerMarker {...volunteerLocation} />
          {requests.map(r => (
            <RequestMarker
              key={r.id}
              selected={r.id === selectedRequest}
              lat={r.center.lat}
              lng={r.center.lng}
              onClick={() => requestClickedHandler(r.id)}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

interface MapProps {
  requests: {
    center: {
      lat: number;
      lng: number;
    };
    id: string;
  }[];
  volunteerLocation: {
    lat: number;
    lng: number;
  };
  onRequestHandler: (id: string) => void;
  zoom?: number;
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

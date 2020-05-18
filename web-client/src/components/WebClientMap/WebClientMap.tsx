import GoogleMapReact from 'google-map-react';
import React from 'react';

import { RequestMarker, VolunteerMarker } from './WebClientMarker';

declare global {
  interface Window {
    GOOGLE_MAPS_API_KEY?: string;
  }
}

/**
 * This API key is what's used on the live site,
 * and is restricted to map.reach4help.org
 *
 * To use your own key,
 * set the environment variable `REACT_APP_GOOGLE_MAPS_API_KEY` to the key.
 */
const PUBLIC_API_KEY = 'AIzaSyC9MNxwBw6ZAOqrSVDPZFiaYhFmuRwtobc';

const apiKey =
  window.GOOGLE_MAPS_API_KEY &&
  window.GOOGLE_MAPS_API_KEY !== '%REACT_APP_GOOGLE_MAPS_API_KEY%'
    ? window.GOOGLE_MAPS_API_KEY
    : PUBLIC_API_KEY;

const WebClientMap: React.FC<MapProps> = ({
  requests,
  volunteerLocation,
  onRequestHandler,
  zoom = 11,
}) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={volunteerLocation}
      defaultZoom={zoom}
    >
      <VolunteerMarker {...volunteerLocation} />
      {requests.map(r => (
        <RequestMarker
          key={r.id}
          lat={r.center.lat}
          lng={r.center.lng}
          onClick={() => onRequestHandler(r.id)}
        />
      ))}
    </GoogleMapReact>
  </div>
);

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

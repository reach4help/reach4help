import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';

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

  const requestClickedHandler = id => {
    setSelectedRequest(id);
    onRequestHandler(id);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        options={createMapOptions}
        defaultCenter={volunteerLocation}
        defaultZoom={zoom}
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

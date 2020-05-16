import React from 'react';

export interface MapRequestProps {
  center: LocationProps;
  id: string;
}

export interface LocationProps {
  lat: number;
  lng: number;
}

interface DummyMapComponentProps {
  requests: MapRequestProps[];
  currentLocation: LocationProps;
  onRequestHandler: Function;
}

const DummyMapComponent: React.FC<DummyMapComponentProps> = (
  {
    requests,
    currentLocation,
    onRequestHandler,
  },
) => (
  <div>
    Map component placeholder
  </div>
);

DummyMapComponent.propTypes = {};

export default DummyMapComponent;

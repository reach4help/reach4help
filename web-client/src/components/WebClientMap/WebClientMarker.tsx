import React from 'react';
import RequestMarkerIcon from './assets/RequestMarker.svg';
import VolunteerMarkerIcon from './assets/VolunteerMarker.svg';

export const VolunteerMarker: React.FC<VolunteerMarkerProps> = ({
  lat,
  lng,
}) => <img src={VolunteerMarkerIcon} />;
export const RequestMarker: React.FC<RequestMarkerProps> = ({ lat, lng }) => (
  <div>
    <img src={RequestMarkerIcon} />
  </div>
);

interface VolunteerMarkerProps {
  lat: number;
  lng: number;
}

interface RequestMarkerProps extends VolunteerMarkerProps {
  onClick: (id: string) => void;
}

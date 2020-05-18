import React from 'react';

import RequestMarkerIcon from '../../assets/request-marker.png';
import VolunteerMarkerIcon from '../../assets/volunteer-marker.png';

export const VolunteerMarker: React.FC<VolunteerMarkerProps> = () => (
  <img src={VolunteerMarkerIcon} alt="Volunteer location" />
);
export const RequestMarker: React.FC<RequestMarkerProps> = ({
  key,
  onClick,
}) => (
  <div onClick={() => onClick(key)}>
    <img src={RequestMarkerIcon} alt="requests" />
  </div>
);

export interface VolunteerMarkerProps {
  lat: number;
  lng: number;
}

interface RequestMarkerProps extends VolunteerMarkerProps {
  onClick: (id: string) => void;
  key: string;
}

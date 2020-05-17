import React from 'react';
import RequestMarkerIcon from '../../assets/request-marker.png';
import VolunteerMarkerIcon from '../../assets/volunteer-marker.png';

export const VolunteerMarker: React.FC<VolunteerMarkerProps> = ({
  lat,
  lng,
}) => <img src={VolunteerMarkerIcon}/>;
export const RequestMarker: React.FC<RequestMarkerProps> = (
  { 
    key,
    lat,
    lng,
    onClick 
  }
  ) => (
  <div>
    <img src={RequestMarkerIcon} onClick={() => onClick(key)}/>
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

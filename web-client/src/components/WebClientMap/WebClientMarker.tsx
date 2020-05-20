import React from 'react';

import LargeRequestMarkerIcon from '../../assets/request-marker-lg.png';
import SmallRequestMarkerIcon from '../../assets/request-marker-sm.png';
import VolunteerMarkerIcon from '../../assets/volunteer-marker.png';

export const VolunteerMarker: React.FC<VolunteerMarkerProps> = () => (
  <div>
    <img src={VolunteerMarkerIcon} alt="My location" />
  </div>
);
export const RequestMarker: React.FC<RequestMarkerProps> = ({
  key,
  onClick,
  selected,
}) => (
  <div onClick={() => onClick(key)}>
    <img
      src={selected ? LargeRequestMarkerIcon : SmallRequestMarkerIcon}
      alt="Request location"
    />
  </div>
);

export interface VolunteerMarkerProps {
  lat: number;
  lng: number;
}

interface RequestMarkerProps extends VolunteerMarkerProps {
  onClick: (id: string) => void;
  key: string;
  selected?: boolean;
}

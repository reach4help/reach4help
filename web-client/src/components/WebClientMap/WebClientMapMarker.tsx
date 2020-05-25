import { Coords } from 'google-map-react';
import React from 'react';

import LargeOrangeMarkerIcon from '../../assets/map-marker-orange-lg.png';
import SmallOrangeMarkerIcon from '../../assets/map-marker-orange-sm.png';
import LargePurpleMarkerIcon from '../../assets/map-marker-purple-lg.png';

export const OriginMarker: React.FC<OriginMarkerProps> = props => (
  <div>
    <img
      src={props.isCav ? LargePurpleMarkerIcon : LargeOrangeMarkerIcon}
      alt="My location"
    />
  </div>
);

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

interface OriginMarkerProps extends Coords {
  isCav: boolean;
}

interface DestinationMarkerProps extends Coords {
  onClick: (id: string) => void;
  key: string;
  selected?: boolean;
}

import { Coords } from 'google-map-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LargeOrangeMarkerIcon from './assets/map-marker-orange-lg.png';
import SmallOrangeMarkerIcon from './assets/map-marker-orange-sm.png';
import LargePurpleMarkerIcon from './assets/map-marker-purple-lg.png';

export const OriginMarker: React.FC<OriginMarkerProps> = ({ isCav }) => {
  const { t } = useTranslation();
  return (
    <div>
      <img
        src={isCav ? LargePurpleMarkerIcon : LargeOrangeMarkerIcon}
        alt={t('components.web_client_map.a11y_my_location')}
      />
    </div>
  );
};

export const DestinationMarker: React.FC<DestinationMarkerProps> = ({
  key,
  selected,
  onClick,
}) => {
  const { t } = useTranslation();
  oreturn(
    <div onClick={() => onClick(key)}>
      <img
        src={selected ? LargeOrangeMarkerIcon : SmallOrangeMarkerIcon}
        alt={t('components.web_client_map.a11y_my_location')}
      />
    </div>,
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

import { Coords } from 'google-map-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LargeOrangeMarkerIcon from 'src/components/WebClientMap/assets/map-marker-orange-lg.png';
import SmallOrangeMarkerIcon from 'src/components/WebClientMap/assets/map-marker-orange-sm.png';
// TODO: (es) Use thissomewhere? import LargePurpleMarkerIcon from 'src/components/WebClientMap/assets/map-marker-purple-lg.png';

export const OriginMarker: React.FC<OriginMarkerProps> = () => {
  const { t } = useTranslation();
  return (
    <div style={{ transform: 'translate(-50%, -100%)' }}>
      <img
        src={LargeOrangeMarkerIcon}
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
  return (
    <div
      onClick={() => onClick(key)}
      style={{ transform: 'translate(-50%, -100%)' }}
    >
      <img
        src={selected ? LargeOrangeMarkerIcon : SmallOrangeMarkerIcon}
        alt={t('components.web_client_map.a11y_my_location')}
      />
    </div>
  );
};

export const SmallOrangeMarker: React.FC<MarkerProps> = () => {
  const { t } = useTranslation();
  return (
    <div style={{ transform: 'translate(-50%, -100%)' }}>
      <img
        src={SmallOrangeMarkerIcon}
        alt={t('components.web_client_map.a11y_my_location')}
      />
    </div>
  );
};

type MarkerProps = Coords;

// TODO: remove?  was previously used for isCav
interface OriginMarkerProps extends Coords {
  dummy?: boolean;
}

interface DestinationMarkerProps extends Coords {
  onClick: (id: string) => void;
  key: string;
  selected?: boolean;
}

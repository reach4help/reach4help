import React from 'react';
import { useTranslation } from 'react-i18next';

import MyLocationIcon from './assets/MyLocationIcon.png';

const LocateMeComponent = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        borderRadius: '17%',
        border: '1px black dotted',
        marginLeft: '15px',
        padding: '7px',
        backgroundColor: 'white',
      }}
    >
      <img
        alt={t('components.web_client_map.a11y_my_location')}
        src={MyLocationIcon}
      />
    </div>
  );
};

const MyLocationControl = ({ onClick }: MyLocationControlProps) => (
  <div onClick={onClick}>
    <LocateMeComponent />
  </div>
);

interface MyLocationControlProps {
  onClick?: () => void;
}

export default MyLocationControl;

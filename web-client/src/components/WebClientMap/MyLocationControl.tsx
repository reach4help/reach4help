/* TODO
useRef instead of useState 
https://github.com/google-map-react/google-map-react/issues/687
*/

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import MyLocationIcon from './assets/MyLocationIcon.png';

/* TODO: Get ControlPosition directly from GoogleMaps */
const TOP_LEFT = 5;

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

const MyLocationControl: React.FC<MyLocationControlProps> = ({
  controlPosition = TOP_LEFT,
  map,
  onClick,
}) => {
  const [renderedOnce, setRenderedOnce] = useState<boolean>(false);
  const [element, setElement] = useState<any>(null);

  if (!map) {
    return null;
  }
  return (
    <div
      onClick={onClick}
      ref={el => {
        if (!renderedOnce) {
          setElement(el);
          map.controls[controlPosition].push(el);
        } else if (el && element && el !== element) {
          element.innerHTML = '';
          [].slice
            .call(el.childNodes)
            .forEach(child => element.appendChild(child));
        }
        setRenderedOnce(true);
      }}
    >
      <LocateMeComponent />
    </div>
  );
};

interface MyLocationControlProps {
  map: any | null;
  controlPosition?: number;
  onClick?: () => void;
}

export default MyLocationControl;

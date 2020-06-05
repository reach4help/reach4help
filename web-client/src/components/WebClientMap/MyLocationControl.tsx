/* 
https://github.com/google-map-react/google-map-react/issues/687
*/

import React, { useState } from 'react';

const MapControl: React.FC<MapControlProps> = ({
  children,
  controlPosition = 4,
  map,
}) => {
  const [renderedOnce, setRenderedOnce] = useState<boolean>(false);
  const [element, setElement] = useState<any>(null);

  if (!map) {
    return null;
  }
  return (
    <div
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
      {children}
    </div>
  );
};

interface MapControlProps {
  children: any | null;
  map: any | null;
  controlPosition?: number;
}

export default MapControl;

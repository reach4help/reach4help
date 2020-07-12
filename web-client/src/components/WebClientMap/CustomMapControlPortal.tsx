import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const CustomMapControlPortal = ({
  map,
  controlPosition,
  children,
}: CustomMapControlPortalProps) => {
  const controlDiv = document.createElement('div');

  useEffect(() => {
    if (map && controlPosition) {
      const controls = map.controls[controlPosition];
      const index = controls.length;
      controls.push(controlDiv);
      return () => {
        controls.removeAt(index);
      };
    }
  }, [controlDiv, controlPosition, map]);

  return createPortal(<div>{children}</div>, controlDiv);
};

interface CustomMapControlPortalProps {
  map: any | null;
  controlPosition?: number;
  children: ReactNode;
}

export default CustomMapControlPortal;

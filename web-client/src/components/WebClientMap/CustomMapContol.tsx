import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const CustomMapControl = ({ map, controlPosition, children }: Props) => {
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

interface Props {
  map: any | null;
  controlPosition?: number;
  children: ReactNode;
}

export default CustomMapControl;

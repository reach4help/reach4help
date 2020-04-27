import React from 'react';
import Location from 'react-app-location';

export interface MenuItem {
  // TODO (remove id): ask help to find a better way to keep track of ids
  id: string;
  icon?: React.ReactNode;
  title: string;
  children?: Array<MenuItem>;
  location?: Location;
}

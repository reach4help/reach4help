import Location from 'react-app-location';

export interface MenuItem {
  // TODO (remove id): ask help to find a better way to keep track of ids
  id: string;
  title: string;
  children?: Array<MenuItem>;
  location?: Location;
}

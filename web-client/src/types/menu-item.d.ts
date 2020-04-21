import Location from 'react-app-location';

export interface MenuItem {
  title: string;
  children?: Array<MenuItem>;
  location?: Location;
}

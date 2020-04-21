import Location from 'react-app-location';
import { Module } from 'src/types/module';

import { MenuItem } from '../../types/menu-item';
import ContentPage from './pages/ContentPage';
import { NewRequestLocation } from './pages/routes/NewRequestRoute/constants';

// TODO remove mock locations
const FooLocation = new Location('/requests/foo');
const BarLocation = new Location('/requests/bar');
const BazLocation = new Location('/requests/baz');

export const menuLinks: Array<MenuItem> = [
  {
    title: 'Create a new Request',
    location: NewRequestLocation,
  },
  {
    title: 'Find Requests',
    children: [
      {
        title: 'Open',
        location: FooLocation,
      },
      {
        title: 'Archived',
        children: [
          {
            title: 'Rejected',
            location: BarLocation,
          },
          {
            title: 'Canceled',
            location: BazLocation,
          },
          {
            title: 'Closed',
            location: FooLocation,
          },
          {
            title: 'Completed',
            location: BarLocation,
          },
        ],
      },
    ],
  },
  {
    title: 'Yet Another Menu Link',
    children: [
      {
        title: 'Open',
        location: FooLocation,
      },
      {
        title: 'Archived',
        children: [
          {
            title: 'Rejected',
            location: BarLocation,
          },
          {
            title: 'Canceled',
            location: BazLocation,
          },
          {
            title: 'Closed',
            location: FooLocation,
          },
          {
            title: 'Completed',
            location: BarLocation,
          },
        ],
      },
    ],
  },
];

const requestModule: Module = {
  path: '/requests',
  component: ContentPage,
  protected: true,
  layout: 'dashboard',
  menuLinks,
};
export default requestModule;

import { uniqueId } from 'lodash';
import Location from 'react-app-location';
import { Module } from 'src/types/module';

import { MenuItem } from '../../types/menu-item';
import ContentPage from './pages/ContentPage';
import { NewRequestLocation } from './pages/routes/NewRequestRoute/constants';

// TODO remove mock locations
const FooLocation = new Location('/requests/foo');
const BarLocation = new Location('/requests/bar');
const BazLocation = new Location('/requests/baz');

// TODO (remove link id): ask help to find a better way to keep track of ids
export const menuLinks: Array<MenuItem> = [
  {
    id: uniqueId(),
    title: 'Create a new Request',
    location: NewRequestLocation,
  },
  {
    id: uniqueId(),
    title: 'Find Requests',
    children: [
      {
        id: uniqueId(),
        title: 'Open',
        location: FooLocation,
      },
      {
        id: uniqueId(),
        title: 'Archived',
        children: [
          {
            id: uniqueId(),
            title: 'Rejected',
            location: BarLocation,
          },
          {
            id: uniqueId(),
            title: 'Canceled',
            location: BazLocation,
          },
          {
            id: uniqueId(),
            title: 'Closed',
            location: FooLocation,
          },
          {
            id: uniqueId(),
            title: 'Completed',
            location: BarLocation,
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Yet Another Menu Link',
    children: [
      {
        id: uniqueId(),
        title: 'Open',
        location: FooLocation,
      },
      {
        id: uniqueId(),
        title: 'Archived',
        children: [
          {
            id: uniqueId(),
            title: 'Rejected',
            location: BarLocation,
          },
          {
            id: uniqueId(),
            title: 'Canceled',
            location: BazLocation,
          },
          {
            id: uniqueId(),
            title: 'Closed',
            location: FooLocation,
          },
          {
            id: uniqueId(),
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

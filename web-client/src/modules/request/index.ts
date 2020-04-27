import {
  ContainerOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import { uniqueId } from 'lodash';
import React from 'react';
import Location from 'react-app-location';
import { Module } from 'src/types/module';

import { MenuItem } from '../../types/menu-item';
import ContentPage from './pages/ContentPage';
import { NewRequestLocation } from './pages/routes/NewRequestRoute/constants';

// TODO (remove link id): ask help to find a better way to keep track of ids
export const menuItems: Array<MenuItem> = [
  {
    id: uniqueId(),
    icon: React.createElement(FileAddOutlined),
    title: 'Create a new Request',
    location: NewRequestLocation,
  },
  {
    id: uniqueId(),
    title: 'Find Requests',
    children: [
      {
        id: uniqueId(),
        icon: React.createElement(FileSearchOutlined),
        title: 'Open',
        location: new Location('/requests/open'),
      },
      {
        id: uniqueId(),
        icon: React.createElement(FileDoneOutlined),
        title: 'Accepted',
        location: new Location('/requests/accepted'),
      },
      {
        id: uniqueId(),
        icon: React.createElement(FileSyncOutlined),
        title: 'Ongoing',
        location: new Location('/requests/ongoing'),
      },
      {
        id: uniqueId(),
        icon: React.createElement(FileProtectOutlined),
        title: 'Finished',
        location: new Location('/requests/finished'),
      },
      {
        id: uniqueId(),
        icon: React.createElement(ContainerOutlined),
        title: 'Archived',
        children: [
          {
            id: uniqueId(),
            title: 'Rejected',
            location: new Location('/requests/archived?open'),
          },
          {
            id: uniqueId(),
            title: 'Canceled',
            location: new Location('/requests/archived?canceled'),
          },
          {
            id: uniqueId(),
            title: 'Closed',
            location: new Location('/requests/archived?closed'),
          },
          {
            id: uniqueId(),
            title: 'Completed',
            location: new Location('/requests/archived?completed'),
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
  menuItems,
};
export default requestModule;

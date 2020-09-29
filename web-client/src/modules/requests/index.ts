/* TODO:  Not a React file */

import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
import { MenuItem, Module } from 'src/types/module';

import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  OpenRequestsLocation,
} from './constants';
import RequestsRoutingPage from './containers/RequestsRoutingPage';

export const menuLinks: Array<MenuItem> = [
  {
    id: '1',
    title: 'Find Requests',
    children: [
      {
        id: '2',
        title: 'Open',
        location: OpenRequestsLocation,
      },
      {
        id: '3',
        title: 'Accepted',
        location: AcceptedRequestsLocation,
      },
    ],
  },
];

const requestsModule: Module = {
  path: '/requests',
  partiallyProtected: true,
  layout: 'dashboard',
  dynamicMenuLinks: (profileState?: ProfileState) => {
    if (
      profileState?.profile?.applicationPreference === ApplicationPreference.cav
    ) {
      return [
        {
          id: '1',
          title: 'Find Requests',
          location: FindRequestsLocation,
        },
        {
          id: '2',
          title: 'Open',
          location: OpenRequestsLocation,
        },
      ] as MenuItem[];
    }
    return [
      {
        id: '1',
        title: 'My Requests',
        children: [
          {
            id: '2',
            title: 'Open',
            location: OpenRequestsLocation,
          },
          {
            id: '3',
            title: 'Accepted',
            location: AcceptedRequestsLocation,
          },
        ],
      },
    ] as MenuItem[];
  },
  component: RequestsRoutingPage,
};
export default requestsModule;

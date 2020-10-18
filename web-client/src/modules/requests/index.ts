/* TODO:  Not a React file */

import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
import { Module } from 'src/types/module';

import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  OpenRequestsLocation,
  postUrlRoot,
} from './constants';
import Routes from './routes';

const requestsModule: Module = {
  path: `${postUrlRoot}`,
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
  component: Routes,
};
export default requestsModule;

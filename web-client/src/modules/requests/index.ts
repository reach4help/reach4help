import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
import { MenuItem, Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';
import { AcceptedRequestsLocation } from './pages/routes/AcceptedRequestsRoute/constants';
import { ArchivedRequestsLocation } from './pages/routes/ArchivedRequestsRoute/constants';
import { FindRequestsLocation } from './pages/routes/FindRequestsRoute/constants';
import { FinishedRequestsLocation } from './pages/routes/FinishedRequestsRoute/constants';
import { OngoingRequestsLocation } from './pages/routes/OngoingRequestsRoute/constants';
import { OpenRequestsLocation } from './pages/routes/OpenRequestsRoute/constants';

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
      {
        id: '4',
        title: 'Ongoing',
        location: OngoingRequestsLocation,
      },
      {
        id: '5',
        title: 'Finished',
        location: FinishedRequestsLocation,
      },
      {
        id: '6',
        title: 'Archived',
        location: ArchivedRequestsLocation,
      },
    ],
  },
];

const requestsModule: Module = {
  path: '/requests',
  layout: 'dashboard',
  protected: true,
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
        {
          id: '3',
          title: 'Ongoing',
          location: OngoingRequestsLocation,
        },
        {
          id: '4',
          title: 'Finished',
          location: FinishedRequestsLocation,
        },
        {
          id: '5',
          title: 'Archived',
          location: ArchivedRequestsLocation,
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
          {
            id: '4',
            title: 'Ongoing',
            location: OngoingRequestsLocation,
          },
          {
            id: '5',
            title: 'Finished',
            location: FinishedRequestsLocation,
          },
          {
            id: '6',
            title: 'Archived',
            location: ArchivedRequestsLocation,
          },
        ],
      },
    ] as MenuItem[];
  },
  component: ContentPage,
};
export default requestsModule;

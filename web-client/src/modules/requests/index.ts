import { MenuItem, Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';
import { ArchivedRequestsLocation } from './pages/routes/ArchivedRequestsRoute/constants';
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
        title: 'Ongoing',
        location: OngoingRequestsLocation,
      },
      {
        id: '4',
        title: 'Completed',
        location: FinishedRequestsLocation,
      },
      {
        id: '5',
        title: 'Closed',
        location: ArchivedRequestsLocation,
      },
    ],
  },
];

const requestsModule: Module = {
  path: '/requests',
  layout: 'dashboard',
  menuItems: menuLinks,
  protected: true,
  component: ContentPage,
};
export default requestsModule;

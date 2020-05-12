import { MenuItem, Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';
import { CompletedRequestsLocation } from './pages/routes/CompletedRequestsRoute/constants';
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
        location: OngoingRequestsLocation,
      },
      {
        id: '4',
        title: 'Completed',
        location: CompletedRequestsLocation,
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

import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const requestsModule: Module = {
  path: '/create',
  component: ContentPage,
  partiallyProtected: true,
};

export default requestsModule;

import { Module } from 'src/types/module';

import Routes from './routes';

const requestsModule: Module = {
  path: '/create',
  component: Routes,
  partiallyProtected: true,
};

export default requestsModule;

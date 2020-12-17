import { Module } from 'src/types/module';

import { RootUrl } from './constants';
import Routes from './routes';

const requestsModule: Module = {
  path: `${RootUrl}`,
  partiallyProtected: true,
  layout: 'dashboard',
  component: Routes,
};
export default requestsModule;

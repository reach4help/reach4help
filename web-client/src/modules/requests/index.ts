/* TODO: (es) why is this comment here? Not a React file */

import { Module } from 'src/types/module';

import { postUrlRoot } from './constants';
import Routes from './routes';

const requestsModule: Module = {
  path: `${postUrlRoot}`,
  partiallyProtected: true,
  layout: 'dashboard',
  component: Routes,
};
export default requestsModule;

import { Module } from 'src/types/module';

import Routes from './routes';

const requestModule: Module = {
  path: '/timeline',
  protected: true,
  component: Routes,
};
export default requestModule;

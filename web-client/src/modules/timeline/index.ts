import { Module } from 'src/types/module';

import Routes from './routes';

const timelineModule: Module = {
  path: '/timeline',
  protected: true,
  component: Routes,
};

export default timelineModule;

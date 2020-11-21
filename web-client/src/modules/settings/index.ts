import { Module } from 'src/types/module';

import Routes from './routes';

const settingsModule: Module = {
  path: '/settings',
  protected: true,
  component: Routes,
};
export default settingsModule;

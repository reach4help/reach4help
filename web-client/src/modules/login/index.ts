import { Module } from 'src/types/module';

import Routes from './routes';

const loginModule: Module = {
  path: '/login',
  component: Routes,
};
export default loginModule;

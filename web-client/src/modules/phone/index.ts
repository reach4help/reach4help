import { Module } from 'src/types/module';

import Routes from './routes';

const phoneModule: Module = {
  path: '/phone',
  component: Routes,
};
export default phoneModule;

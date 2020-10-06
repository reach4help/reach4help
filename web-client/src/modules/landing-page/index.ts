import { Module } from 'src/types/module';

import Routes from './routes';

const moduleDef: Module = {
  path: '/',
  component: Routes,
};

export default moduleDef;

import { Module } from 'src/types/module';

import { urlPrefix } from './constants';
import Routes from './routes';

const moduleDef: Module = {
  path: urlPrefix,
  component: Routes,
};

export default moduleDef;

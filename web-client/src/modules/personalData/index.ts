import { Module } from 'src/types/module';

import Routes from './routes';

const personalDataModule: Module = {
  path: '/personal-data',
  component: Routes,
};
export default personalDataModule;

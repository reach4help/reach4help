import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const personalDataModule: Module = {
  path: '/personal-data',
  component: ContentPage,
};
export default personalDataModule;

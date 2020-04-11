import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const personalDataModule: Module = {
  path: '/personal-data',
  component: ContentPage,
  protected: true,
};
export default personalDataModule;

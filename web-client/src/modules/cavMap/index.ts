import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const cavMapModule: Module = {
  path: '/cav-map',
  layout: 'dashboard',
  protected: true,
  component: ContentPage,
};

export default cavMapModule;

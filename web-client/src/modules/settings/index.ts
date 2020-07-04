import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const settingsModule: Module = {
  path: '/settings',
  protected: true,
  component: ContentPage,
};
export default settingsModule;

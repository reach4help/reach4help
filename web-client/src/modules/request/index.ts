import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const requestModule: Module = {
  path: '/requests',
  component: ContentPage,
  protected: false,
};
export default requestModule;

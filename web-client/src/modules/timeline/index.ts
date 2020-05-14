import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const requestModule: Module = {
  path: '/timeline',
  layout: 'dashboard',
  protected: true,
  component: ContentPage,
};
export default requestModule;

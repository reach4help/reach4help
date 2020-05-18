import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const requestModule: Module = {
  path: '/timeline',
  protected: true,
  component: ContentPage,
};
export default requestModule;

import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const requestModule: Module = {
  path: '/timeline',
  component: ContentPage,
};
export default requestModule;

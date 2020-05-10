import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const requestModule: Module = {
  path: '/requests/view',
  component: ContentPage,
};
export default requestModule;

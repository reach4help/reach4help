import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const loginModule: Module = {
  path: '/login',
  component: ContentPage,
};
export default loginModule;

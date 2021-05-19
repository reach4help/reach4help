import { Module } from 'src/types/module';

import ContentPage from './pages/ContentPage';

const phoneModule: Module = {
  path: '/phone',
  component: ContentPage,
};
export default phoneModule;

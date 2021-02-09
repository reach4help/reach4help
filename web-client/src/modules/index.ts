import { Module } from 'src/types/module';

import Create from './create';
import Posts from './GeneralPosts';
import LandingPage from './landing-page';
import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';
import Settings from './settings';
import Timeline from './timeline';

const modules: Record<string, Module> = {
  Create,
  LandingPage,
  Login,
  Phone,
  PersonalData,
  Posts, // TODO: (es) More refactoring
  Settings,
  Timeline,
};

export default modules;

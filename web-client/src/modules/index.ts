import { Module } from 'src/types/module';

import Create from './create';
import LandingPage from './landing-page';
import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';
import Requests from './requests';
import Settings from './settings';
import Timeline from './timeline';

const modules: Record<string, Module> = {
  Create,
  LandingPage,
  Login,
  Phone,
  PersonalData,
  Requests,
  Settings,
  Timeline,
};

export default modules;

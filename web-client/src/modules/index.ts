import { Module } from 'src/types/module';

import Create from './create';
import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';
import Requests from './requests';
import Settings from './settings';
import Timeline from './timeline';

const modules: Record<string, Module> = {
  Login,
  Phone,
  PersonalData,
  Requests,
  Timeline,
  Settings,
  Create,
};

export default modules;

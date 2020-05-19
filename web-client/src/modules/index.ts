import { Module } from 'src/types/module';

import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';
import Requests from './requests';
import Timeline from './timeline';

const modules: Record<string, Module> = {
  Login,
  Phone,
  PersonalData,
  Requests,
  Timeline,
};

export default modules;

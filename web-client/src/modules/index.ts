import { Module } from 'src/types/module';

import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';
import Requests from './requests';

const modules: Record<string, Module> = {
  Login,
  Phone,
  PersonalData,
  Requests,
};

export default modules;

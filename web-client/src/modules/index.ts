import { Module } from 'src/types/module';

import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';

const modules: Record<string, Module> = {
  Login,
  Phone,
  PersonalData,
};

export default modules;

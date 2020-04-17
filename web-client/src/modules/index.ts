import { Module } from 'src/types/module';

import Login from './login';
import PersonalData from './personalData';
import Phone from './phone';
import Request from './request';

const modules: Record<string, Module> = {
  Login,
  Phone,
  Request,
  PersonalData,
};

export default modules;

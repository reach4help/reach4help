import { Module } from 'src/types/module';

import Login from './login';
import Phone from './phone';
import Request from './request';

const modules: Record<string, Module> = {
  Login,
  Phone,
  Request,
};

export default modules;

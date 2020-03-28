import { Connection } from 'typeorm';
import { ADDRESS_REPOSITORY, DATABASE_CONNECTION } from '../constants';
import { Address } from './entities/address.entity';

export const addressProvider = [
  {
    provide: ADDRESS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Address),
    inject: [DATABASE_CONNECTION],
  },
];

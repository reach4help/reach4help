import { Connection } from 'typeorm';
import { COUNTRY_REPOSITORY, DATABASE_CONNECTION } from '../constants';
import { Country } from './entities/country.entity';

export const countryProvider = [
  {
    provide: COUNTRY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Country),
    inject: [DATABASE_CONNECTION],
  },
];

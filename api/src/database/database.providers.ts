import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/constants';
import config = require('./ormconfig');

const connectionPromise = createConnection(config);

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await connectionPromise,
  },
];

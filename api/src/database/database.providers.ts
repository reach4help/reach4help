import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/constants';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

import * as config from './ormconfig';

const connectionPromise = createConnection(config as ConnectionOptions);

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await connectionPromise,
  },
];

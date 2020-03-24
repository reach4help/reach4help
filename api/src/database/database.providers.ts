import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/constants';

// TODO dedupe with ormconfig.js
// import config = require('./ormconfig.js');
import { parse } from 'pg-connection-string';

let config;
// On heroku we use a connection string
if (process.env.DATABASE_URL) {
  const databaseUrl = process.env.DATABASE_URL;
  const connectionOptions = parse(databaseUrl);
  config = {
    type: 'postgres',
    host: connectionOptions.host,
    port: parseInt(connectionOptions.port, 10),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: false,
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    extra: {
      ssl: connectionOptions.ssl,
    },
  };
} else {
  config = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: false,
  };
}
// end dupe

const connectionPromise = createConnection(config);

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await connectionPromise,
  },
];

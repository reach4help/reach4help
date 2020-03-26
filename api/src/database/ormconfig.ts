import { parse } from 'pg-connection-string';

let tempConfig;
// On heroku we use a connection string
if (process.env.DATABASE_URL) {
  const databaseUrl = process.env.DATABASE_URL;
  const connectionOptions = parse(databaseUrl);

  tempConfig = {
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
    migrations: [
      __dirname + '/../migrations/*{.ts,.js}',
    ],
    extra: {
      ssl: connectionOptions.ssl || false,
    },
  };
} else {
  tempConfig = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [
      __dirname + '/../migrations/*{.ts,.js}',
    ],
    synchronize: false,
  };
}

module.exports = tempConfig;

import { Connection, createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/constants';
import * as PostgresConnectionStringParser from 'pg-connection-string';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


let connectionPromise: Promise<Connection>;

// On heroku we use a connection string
if (process.env.DATABASE_URL) {
  const databaseUrl: string = process.env.DATABASE_URL;
  const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);
  const typeOrmOptions: PostgresConnectionOptions = {
    type: "postgres",
    host: connectionOptions.host,
    port: parseInt(connectionOptions.port, 10),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: true,
    entities: ["target/entity/**/*.js"],
    extra: {
      ssl: connectionOptions.ssl
    }
  };
  connectionPromise = createConnection(typeOrmOptions)
} else {
  connectionPromise = createConnection({
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
  })
}

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await connectionPromise,
  },
];

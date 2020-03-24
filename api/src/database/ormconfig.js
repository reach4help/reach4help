const PostgresConnectionStringParser = require('pg-connection-string');

let config;

// On heroku we use a connection string
if (process.env.DATABASE_URL) {
  const databaseUrl = process.env.DATABASE_URL;
  const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);
  config = {
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
  }
}

module.exports = config;

import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from 'src/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
  },
];

import { Connection } from "typeorm";
import { User } from "./entities/user.entity";
import { USER_REPOSITORY, DATABASE_CONNECTION } from "src/constants";

export const userProviders = [
    {
      provide: USER_REPOSITORY,
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: [DATABASE_CONNECTION],
    },
  ];
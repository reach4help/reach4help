## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

Create a `.env` file in the project root using the `example.env`.

```bash
cp example.env .env
```

Start database and pgadmin container

```bash
# -d to run in background (optional)
docker-compose up -d
```

Start api server (access swagger-ui at [localhost:3001/api](http://localhost:3001/api))

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Run migrations

```bash
yarn typeorm migration:run
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrations [Typeorm CLI Docs](https://typeorm.io/#/using-cli)

```bash
# create a new migration
yarn typeorm migration:generate -n User

# run migrations
yarn typeorm migration:run
```

## Project scaffolding - [Nest CLI Docs](https://docs.nestjs.com/cli/overview)

```bash
nest generate module users

#CREATE src/cats/cats.module.ts
#UPDATE src/app.module.ts


nest generate controller users

#CREATE src/users/users.controller.spec.ts
#CREATE src/users/users.controller.ts
#UPDATE src/users/users.module.ts


nest generate service users

#CREATE src/users/users.service.spec.ts
#CREATE src/users/users.service.ts
#UPDATE src/users/users.module.ts


nest generate class user users/entities

#CREATE src/users/entities/user.spec.ts
#CREATE src/users/entities/user.ts
```

## Database administration - [pgAdmin](https://www.pgadmin.org/)

The tool to check the database is pgadmin. You can use it after run the `docker-compose up` command in your browser [localhost:5050](http://localhost:5050)

PgAdmin Login:

- username: db@reach4help.org
- password: reach4help

Create a new setup using:

- name: reach4help
- host: reach4help_api_db
- port: 5432
- maintenance database: reach4help_api_db
- username: reach4help_api
- password: reach4help

## Delete database volume

If you want to start with a clean database you can delete the database volume using `-v`:

```
# -v to delete database volume
docker-compose down -v
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# setup database and adminer container
docker-compose up 
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

```bash
# run migrations
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
## Starting Hasura/Postgres locally - Mac

If not installed, install docker and hasura.

Each session:

    cd <hasura dir>/
    docker # if this does not work, search for Docker and execute
    docker-compose up

Once you see: "message":"starting API server" the server has started

docker ps # shows what docker services are installed

Optional:

hasura console --admin-secret myadminsecretkey

## Starting Hasura/Postgres locally - Mac

If not installed:

    brew install --cask docker # one time only
    brew install hasura-cli

Each session:

    cd covidhelphub-backend/
    open /Applications/Docker.app
    docker-compose up

Once you see: "message":"starting API server" the server has started

docker ps # shows what docker services are installed

Optional:

hasura console --admin-secret myadminsecretkey

## Staring Hasura/Postgres locally on Windows

- [Download and Install Docker](https://docs.docker.com/docker-for-windows/install/).
- [Download Hasura](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html).
  or run `npm install --global hasura-cli` from the terminal.
- From the terminal CD to `covidhelphub-backend` in `dev-chh` branch and run `docker-compose up`.
- From another terminal CD to `covidhelphub-bacend` and run `hasura console --admin-secret myadminsecretkey`.

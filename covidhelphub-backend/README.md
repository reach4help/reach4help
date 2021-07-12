## Staring Hasura/Postgres locally

If not installed:

    brew install --cask docker # one time only
    brew install hasura-cli

Each session:

    cd <hasura dir>/
    open /Applications/Docker.app
    docker-compose up

Once you see: "message":"starting API server" the server has started

docker ps

Optional:

hasura console --admin-secret myadminsecretkey

## Staring Hasura/Postgres locally on Windows

- [Download and Install Docker](https://docs.docker.com/docker-for-windows/install/).
- [Download Hasura](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html).
  or run `npm install --global hasura-cli` from the terminal.
- From the terminal CD to `hasuraBackend` in `dev-chh` branch and run `docker-compose up`.
- From another terminal CD to `hasuraBackend` and run `hasura console --admin-secret myadminsecretkey`.

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

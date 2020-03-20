# Monorepo for COVID Aid

This is the main repository for the [COVID Aid project](https://covidaid.app/)

## Preparing the repository

We use Yarn workspaces to manage this repository,
so all NPM packages,
for all directories,
can be installed using the following command in the root directory:

```
yarn install
```

## Adding new NPM Packages to the monorepo

To add a new project to the repo,
simply create a new folder and its `package.json` file,
then add it to the `"workspaces"` property in the `package.json` file in the
root of this repository.

At this point running `yarn add` or `yarn install` in any of the sub directories
should update the appropriate `package.json`,
and update the `yarn.lock` in the root of the repo.

## Code of Conduct

We expect everyone to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it.

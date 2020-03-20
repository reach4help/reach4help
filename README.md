# Monorepo for COVID Aid

This is the main repository for the [COVID Aid project](https://covidaid.app/).

People who are at high risk from COVID-19 or are quarantined are unable to leave their houses and obtain necessities like food and medical supplies without putting themselves or others at risk. To mitigate this, many local groups and organizations, big and small, have started initiatives to try and get resources such as food and medicine to these people, and help out with important tasks such as walking dogs.

Unfortunately, a number of these organizations are struggling with certain logistics, such as coordinating their volunteer workforce, prioritizing the most urgent requests, and ensuring that all requests get fulfilled.

COVID Aid is an open project that is completely run by volunteers that aims to address these issues, not only enabling those in need to receive help, but also enabling partner groups and organizations to help more efficiently by mobilizing their volunteers with the help of our own tracking and ticketing system.

We’re part of [Helpful Engineering](https://www.helpfulengineering.org/),
a collective of volunteers who have congregated to come up with solutions in the COVID-19 Coronavirus Pandemic, without any commercial goals.

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

## Get Involved

To get involved, and see the current status of the project,
please check out the [info repository](https://github.com/covidaidapp/info).

## Code of Conduct

We expect everyone to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it.

## Contributors

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END --> 
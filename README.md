# Monorepo for COVID Aid

This is the main repository for the [COVID Aid project](https://covidaid.app/).

People who are at high risk from COVID-19 or are quarantined are unable to leave their houses and obtain necessities like food and medical supplies without putting themselves or others at risk. To mitigate this, many local groups and organizations, big and small, have started initiatives to try and get resources such as food and medicine to these people, and help out with important tasks such as walking dogs.

Unfortunately, a number of these organizations are struggling with certain logistics, such as coordinating their volunteer workforce, prioritizing the most urgent requests, and ensuring that all requests get fulfilled.

COVID Aid is an open project that is completely run by volunteers that aims to address these issues, not only enabling those in need to receive help, but also enabling partner groups and organizations to help more efficiently by mobilizing their volunteers with the help of our own tracking and ticketing system.

We’re part of [Helpful Engineering](https://www.helpfulengineering.org/),
a collective of volunteers who have congregated to come up with solutions in the COVID-19 Coronavirus Pandemic, without any commercial goals.

# Project Status
Right now we’re in the very early stages of project development, but moving very rapidly! We’re currently assembling [teams](https://github.com/covidaidapp/info#project-team), speaking to organizations to assess needs, designing app workflows, and building the initial MVP.

If you’d like to help and join one of our [teams](https://github.com/covidaidapp/info#project-team), please take a look at the [instructions for getting involved](https://github.com/covidaidapp/info#get-involved).

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

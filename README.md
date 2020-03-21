# Monorepo for Reach4Help
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is the main repository for the [Reach4Help](https://reach4help.org/).

People who are at high risk from COVID-19 or are quarantined are unable to leave their houses and obtain necessities like food and medical supplies without putting themselves or others at risk. To mitigate this, many local groups and organizations, big and small, have started initiatives to try and get resources such as food and medicine to these people, and help out with important tasks such as walking dogs.

Unfortunately, a number of these organizations are struggling with certain logistics, such as coordinating their volunteer workforce, prioritizing the most urgent requests, and ensuring that all requests get fulfilled.

Reach4Help is an open project that is completely run by volunteers that aims to address these issues, not only enabling those in need to receive help, but also enabling partner groups and organizations to help more efficiently by mobilizing their volunteers with the help of our own tracking and ticketing system.

We’re part of [Helpful Engineering](https://www.helpfulengineering.org/),
a collective of volunteers who have congregated to come up with solutions in the COVID-19 Coronavirus Pandemic, without any commercial goals.

# Project Status
Right now we’re in the very early stages of project development, but moving very rapidly! We’re currently assembling [teams](https://github.com/covidaidapp/info#project-team), speaking to organizations to assess needs, designing app workflows, and building the initial MVP.

If you’d like to help and join one of our [teams](https://github.com/covidaidapp/info#project-team), please take a look at the [instructions for getting involved](https://github.com/covidaidapp/info#get-involved).

## Preparing the repository

We use `Yarn workspaces` to manage this repository,
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

## Sub Projects

### Site
This is the landing page for the organization. It shows a lot of helpful tips and general information.

### Web client
This is the web client with which our people in need and our volunteers interact with the platform.

More info [here](web-client/README.md)

## Contributing

We have several projects under this monorepo. If you want to contribute please read [CONTRIBUTING](CONTRIBUTING.md)

## Code of Conduct

We expect everyone to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/comoser"><img src="https://avatars2.githubusercontent.com/u/5495320?v=4" width="100px;" alt=""/><br /><sub><b>David Alecrim</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=comoser" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=comoser" title="Documentation">📖</a> <a href="#ideas-comoser" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-comoser" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Acomoser" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-comoser" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
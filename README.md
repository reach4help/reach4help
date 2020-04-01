# Reach4Help

[![Reach4Help site released under the MIT license.](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
  <img src="branding/logo/logo-compat.svg">
</p>

People who are at high risk from COVID-19 or are quarantined are unable to leave their houses and obtain necessities like food and medical supplies without putting themselves or others at risk. To mitigate this, many local groups and organizations, big and small, have started initiatives to try and get resources such as food and medicine to these people, and help out with important tasks such as walking dogs.

Unfortunately, a number of these organizations are struggling with certain logistics, such as coordinating their volunteer workforce, prioritizing the most urgent requests, and ensuring that all requests get fulfilled.

Reach4Help is an open project that is completely run by volunteers that aims to address these issues, not only enabling those in need to receive help, but also enabling partner groups and organizations to help more efficiently by mobilizing their volunteers with the help of our own tracking and ticketing system.

We’re part of [Helpful Engineering](https://www.helpfulengineering.org/), a collective of volunteers who have congregated to come up with solutions in the COVID-19 Coronavirus Pandemic, without any commercial goals.

## Project Status
Right now we’re in the very early stages of project development, but moving very rapidly! We’re currently assembling [teams](https://github.com/covidaidapp/info#project-team), speaking to organizations to assess needs, designing app workflows, and building the initial MVP.

If you’d like to help and join one of our [teams](https://github.com/covidaidapp/info#project-team), please take a look at the [instructions for getting involved](https://github.com/covidaidapp/info#get-involved).

# Development

This is the main/mono-repo for the [Reach4Help](https://reach4help.org/).

## Preparing the repository

We use `Yarn workspaces` to manage this repository, so all NPM packages, for all directories, can be installed using the following command in the root directory:

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

More info [here](site/README.md)

### Map
This is the interactive map visualizing aid around the world. It allows users to quickly find organizations in their area.

More info [here](map/README.md)

### Web client
This is the web client with which our people in need and our volunteers interact with the platform.

More info [here](web-client/README.md)

### API
This is the API that will manage our data for the [Web client](web-client/README.md).

More info [here](api/README.md)

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
    <td align="center"><a href="https://sam.lanni.ng"><img src="https://avatars0.githubusercontent.com/u/3319932?v=4" width="100px;" alt=""/><br /><sub><b>Sam Lanning</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=s0" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=s0" title="Documentation">📖</a> <a href="#ideas-s0" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-s0" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3As0" title="Reviewed Pull Requests">👀</a> <a href="#content-s0" title="Content">🖋</a> <a href="#projectManagement-s0" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/luis-oliveira-tech/"><img src="https://avatars0.githubusercontent.com/u/9373787?v=4" width="100px;" alt=""/><br /><sub><b>Luis Filipe</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=luisFilipePT" title="Documentation">📖</a> <a href="https://github.com/reach4help/reach4help/commits?author=luisFilipePT" title="Code">💻</a> <a href="#ideas-luisFilipePT" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://freethinking.it"><img src="https://avatars0.githubusercontent.com/u/961844?v=4" width="100px;" alt=""/><br /><sub><b>Dan Sabin</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Asabind" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/reach4help/reach4help/commits?author=sabind" title="Code">💻</a> <a href="#ideas-sabind" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-sabind" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/jpmarques66"><img src="https://avatars1.githubusercontent.com/u/52417176?v=4" width="100px;" alt=""/><br /><sub><b>João Marques</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=jpmarques66" title="Code">💻</a> <a href="#ideas-jpmarques66" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=jpmarques66" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/rbgoncalves"><img src="https://avatars1.githubusercontent.com/u/24323690?v=4" width="100px;" alt=""/><br /><sub><b>Rúben Gonçalves</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=rbgoncalves" title="Code">💻</a> <a href="#ideas-rbgoncalves" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Arbgoncalves" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/wr46"><img src="https://avatars0.githubusercontent.com/u/5550776?v=4" width="100px;" alt=""/><br /><sub><b>Wilson Rodrigues</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=wr46" title="Code">💻</a> <a href="#ideas-wr46" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-wr46" title="Project Management">📆</a> <a href="#maintenance-wr46" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/commits?author=wr46" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://namadnuno.alojamento-gratis.com/"><img src="https://avatars1.githubusercontent.com/u/9502562?v=4" width="100px;" alt=""/><br /><sub><b>Nuno Alexandre</b></sub></a><br /><a href="#ideas-namadnuno" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=namadnuno" title="Code">💻</a></td>
    <td align="center"><a href="https://micaelr95.github.io/"><img src="https://avatars3.githubusercontent.com/u/12500655?v=4" width="100px;" alt=""/><br /><sub><b>Micael Rodrigues</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=micaelr95" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mdeous"><img src="https://avatars1.githubusercontent.com/u/393165?v=4" width="100px;" alt=""/><br /><sub><b>Mathieu Deous</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=mdeous" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/cinthyaejh"><img src="https://avatars1.githubusercontent.com/u/40286823?v=4" width="100px;" alt=""/><br /><sub><b>cinthyaejh</b></sub></a><br /><a href="#design-cinthyaejh" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/PatriciaMiranda"><img src="https://avatars1.githubusercontent.com/u/62437898?v=4" width="100px;" alt=""/><br /><sub><b>PatriciaMiranda</b></sub></a><br /><a href="#design-PatriciaMiranda" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/r13serra11"><img src="https://avatars1.githubusercontent.com/u/62537457?v=4" width="100px;" alt=""/><br /><sub><b>Rita Serra</b></sub></a><br /><a href="#design-r13serra11" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/telmodias"><img src="https://avatars1.githubusercontent.com/u/30916?v=4" width="100px;" alt=""/><br /><sub><b>Telmo Dias</b></sub></a><br /><a href="#ideas-telmodias" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=telmodias" title="Documentation">📖</a> <a href="https://github.com/reach4help/reach4help/commits?author=telmodias" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Atelmodias" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-telmodias" title="Project Management">📆</a> <a href="#design-telmodias" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

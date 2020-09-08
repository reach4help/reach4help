<h1 align="center">
  <a href="https://www.reach4help.org">
    <img src="branding/logo/logo-compat.svg" width="60">
    <img src="branding/logo/logo-type.svg" height="40">
  </a>
</h1>

[![Reach4Help released under the MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](./CODE_OF_CONDUCT.md)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-27-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Who We Are

[Reach4Help](https://reach4help.org/) is a global open-source and volunteer-run initiative developing technologies to bridge the gap between people in need and volunteers who can help during the COVID-19 pandemic and beyond. Through the development of open-source and accessible tools for volunteers (like [our app](https://app.reach4help.org/)), people in need, and volunteer organizations alike, we’re building a large-scale network of help to keep us stronger and more connected during this pandemic and beyond. 

## How _You_ Can Contribute

We're currently looking for help on the project in a number of fields. If you’d like to help, please take a look at the **[Onboarding Steps](https://github.com/reach4help/reach4help/wiki#onboading-steps)**. You can find more details on how to prepare the environment and the guidelines on how to contribute to the repo by looking at the [instructions for contributing](CONTRIBUTING.md). We'd be honored to have you join our humble abode!

# Development

This is our mono-repo, containing all the sub-projects we're working on. If you haven't already, please take a look at out our [instructions for contributing](CONTRIBUTING.md) before proceeding. **We also expect everyone to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Thank you!**

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

### [Reach4Help App](web-client)

This is our main app connecting people in need with volunteers who can help. **Check it out live [here](https://app.reach4help.org/)!**

### [Global Interactive Mutual Aid Map](map)

This is an interactive gloabl map visualizing over 7000 volunteer organizations supporting communities in need around the world! We're looking for help reaching out to more organizations and for developing the map further (optimizing loading all those datapoints). **Check it out live [here](https://app.reach4help.org/)!**

### [Website](site)

Our website highlighting the project and those working on it. **Check it out live [here](https://reach4help.org/)!** 

### [Backend](functions)

This is the layer that manages our data for the [main app](/web-client/src/firebase/index.ts).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/comoser"><img src="https://avatars2.githubusercontent.com/u/5495320?v=4" width="100px;" alt=""/><br /><sub><b>David Alecrim</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=comoser" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=comoser" title="Documentation">📖</a> <a href="#ideas-comoser" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-comoser" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Acomoser" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-comoser" title="Project Management">📆</a></td>
    <td align="center"><a href="https://sam.lanni.ng"><img src="https://avatars0.githubusercontent.com/u/3319932?v=4" width="100px;" alt=""/><br /><sub><b>Sam Lanning</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=s0" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=s0" title="Documentation">📖</a> <a href="#ideas-s0" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-s0" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3As0" title="Reviewed Pull Requests">👀</a> <a href="#content-s0" title="Content">🖋</a> <a href="#projectManagement-s0" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/puzzledbytheweb"><img src="https://avatars0.githubusercontent.com/u/35262512?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Filipe</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=puzzledbytheweb" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=puzzledbytheweb" title="Documentation">📖</a> <a href="#ideas-puzzledbytheweb" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-puzzledbytheweb" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Apuzzledbytheweb" title="Reviewed Pull Requests">👀</a> <a href="#content-puzzledbytheweb" title="Content">🖋</a> <a href="#projectManagement-puzzledbytheweb" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/luis-oliveira-tech/"><img src="https://avatars0.githubusercontent.com/u/9373787?v=4" width="100px;" alt=""/><br /><sub><b>Luis Filipe</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=luisFilipePT" title="Documentation">📖</a> <a href="https://github.com/reach4help/reach4help/commits?author=luisFilipePT" title="Code">💻</a> <a href="#ideas-luisFilipePT" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://freethinking.it"><img src="https://avatars0.githubusercontent.com/u/961844?v=4" width="100px;" alt=""/><br /><sub><b>Dan Sabin</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Asabind" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/reach4help/reach4help/commits?author=sabind" title="Code">💻</a> <a href="#ideas-sabind" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-sabind" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/commits?author=sabind" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jpmarques66"><img src="https://avatars1.githubusercontent.com/u/52417176?v=4" width="100px;" alt=""/><br /><sub><b>João Marques</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=jpmarques66" title="Code">💻</a> <a href="#ideas-jpmarques66" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=jpmarques66" title="Documentation">📖</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Ajpmarques66" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/rbgoncalves"><img src="https://avatars1.githubusercontent.com/u/24323690?v=4" width="100px;" alt=""/><br /><sub><b>Rúben Gonçalves</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=rbgoncalves" title="Code">💻</a> <a href="#ideas-rbgoncalves" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Arbgoncalves" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/wr46"><img src="https://avatars0.githubusercontent.com/u/5550776?v=4" width="100px;" alt=""/><br /><sub><b>Wilson Rodrigues</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=wr46" title="Code">💻</a> <a href="#ideas-wr46" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-wr46" title="Project Management">📆</a> <a href="#maintenance-wr46" title="Maintenance">🚧</a> <a href="https://github.com/reach4help/reach4help/commits?author=wr46" title="Documentation">📖</a></td>
    <td align="center"><a href="http://namadnuno.alojamento-gratis.com/"><img src="https://avatars1.githubusercontent.com/u/9502562?v=4" width="100px;" alt=""/><br /><sub><b>Nuno Alexandre</b></sub></a><br /><a href="#ideas-namadnuno" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=namadnuno" title="Code">💻</a></td>
    <td align="center"><a href="https://micaelr95.github.io/"><img src="https://avatars3.githubusercontent.com/u/12500655?v=4" width="100px;" alt=""/><br /><sub><b>Micael Rodrigues</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=micaelr95" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=micaelr95" title="Documentation">📖</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Amicaelr95" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/mdeous"><img src="https://avatars1.githubusercontent.com/u/393165?v=4" width="100px;" alt=""/><br /><sub><b>Mathieu Deous</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=mdeous" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/cinthyaejh"><img src="https://avatars1.githubusercontent.com/u/40286823?v=4" width="100px;" alt=""/><br /><sub><b>cinthyaejh</b></sub></a><br /><a href="#design-cinthyaejh" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/PatriciaMiranda"><img src="https://avatars1.githubusercontent.com/u/62437898?v=4" width="100px;" alt=""/><br /><sub><b>PatriciaMiranda</b></sub></a><br /><a href="#design-PatriciaMiranda" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/r13serra11"><img src="https://avatars1.githubusercontent.com/u/62537457?v=4" width="100px;" alt=""/><br /><sub><b>Rita Serra</b></sub></a><br /><a href="#design-r13serra11" title="Design">🎨</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/telmodias"><img src="https://avatars1.githubusercontent.com/u/30916?v=4" width="100px;" alt=""/><br /><sub><b>Telmo Dias</b></sub></a><br /><a href="#ideas-telmodias" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=telmodias" title="Documentation">📖</a> <a href="https://github.com/reach4help/reach4help/commits?author=telmodias" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Atelmodias" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-telmodias" title="Project Management">📆</a> <a href="#design-telmodias" title="Design">🎨</a></td>
    <td align="center"><a href="https://btuerker.com"><img src="https://avatars0.githubusercontent.com/u/46192266?v=4" width="100px;" alt=""/><br /><sub><b>Burhan Tuerker</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=btuerker" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ashwinkjoseph"><img src="https://avatars2.githubusercontent.com/u/13694998?v=4" width="100px;" alt=""/><br /><sub><b>Joseph Ashwin Kottapurath</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=ashwinkjoseph" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Aashwinkjoseph" title="Reviewed Pull Requests">👀</a> <a href="#ideas-ashwinkjoseph" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/commits?author=ashwinkjoseph" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/djohal"><img src="https://avatars1.githubusercontent.com/u/9207593?s=400" width="100px;" alt=""/><br /><sub><b>Dilpreet Johal</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=djohal" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mcverter"><img src="https://avatars0.githubusercontent.com/u/1453956?v=4" width="100px;" alt=""/><br /><sub><b>Mitchell Verter</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=mcverter" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/winggo"><img src="https://avatars1.githubusercontent.com/u/26425671?v=4" width="100px;" alt=""/><br /><sub><b>Winggo Tse</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=winggo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/sharmmad"><img src="https://avatars1.githubusercontent.com/u/5454024?v=4" width="100px;" alt=""/><br /><sub><b>sharmmad</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=sharmmad" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/skspade"><img src="https://avatars0.githubusercontent.com/u/43147936?v=4" width="100px;" alt=""/><br /><sub><b>skspade</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=skspade" title="Code">💻</a> <a href="https://github.com/reach4help/reach4help/commits?author=skspade" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/thomas-t-huynh"><img src="https://avatars1.githubusercontent.com/u/16145617?v=4" width="100px;" alt=""/><br /><sub><b>Thomas Huynh</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=thomas-t-huynh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/juozasg"><img src="https://avatars3.githubusercontent.com/u/4100?v=4" width="100px;" alt=""/><br /><sub><b>Juozas Gaigalas</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=juozasg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/schowdhury8"><img src="https://avatars3.githubusercontent.com/u/29135917?v=4" width="100px;" alt=""/><br /><sub><b>Shayan Chowdhury</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=schowdhury8" title="Code">💻</a> <a href="#ideas-schowdhury8" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/reach4help/reach4help/pulls?q=is%3Apr+reviewed-by%3Aschowdhury8" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/reach4help/reach4help/commits?author=schowdhury8" title="Documentation">📖</a> <a href="#projectManagement-schowdhury8" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/CorporateInvesther"><img src="https://avatars3.githubusercontent.com/u/65609627?v=4" width="100px;" alt=""/><br /><sub><b>Esther Handy-Malouin</b></sub></a><br /><a href="#userTesting-CorporateInvesther" title="User Testing">📓</a></td>
    <td align="center"><a href="http://codingeric.com"><img src="https://avatars2.githubusercontent.com/u/15906981?v=4" width="100px;" alt=""/><br /><sub><b>milkrong</b></sub></a><br /><a href="https://github.com/reach4help/reach4help/commits?author=milkrong" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

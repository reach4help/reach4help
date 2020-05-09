# Contributing to web-client for Reach4Help

🎉🚀🙌🏻 First off, thanks for taking the time to contribute! 🙌🏻🚀🎉

> First off, thank you for considering contributing to this repository. It's people like you that make Open Source so great.

### Please read our guidelines before you start.

> Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

### Contributions we are looking for.

We keep an open mind! Improving documentation, bug triaging, or writing tutorials are all examples of helpful contributions that mean less work for you.

# Ground Rules

### Follow our Code of Conduct.

We expect everyone to abide by our [**Code of Conduct**](CODE_OF_CONDUCT.md). Please read it. 🤝

# Your First Contribution

Here are a couple of friendly tutorials to help you get started: http://makeapullrequest.com/ and http://www.firsttimersonly.com/

> Working on your first Pull Request? You can learn how from this _free_ series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile_cat:

# Getting started

## Prerequisites

### You will need at least `node` and `yarn` installed.

- [Download Node Here](https://nodejs.org/en/download/ 'Download Node Here')
- [Download Yarn Here](https://yarnpkg.com/lang/en/docs/install/ 'Download Yarn Here')

#### In this repo we favour `yarn` over `npm` as the "official" package manager since we also leverage `yarn workspaces` as the manager for our `monorepo`

### Setting up the environment variables

This Project uses Services that require API keys and environment variables such as Firebase and Google Maps API.
You can find an example env file that lists the variables that are being used in [.env.EXAMPLE](.env.EXAMPLE)
The environment variables should be set up in a file named `.env` outside the `src` directory.

We cannot provide the values for any of the keys that we use internally.
We have however, included the keys for a starter project in [.env.EXAMPLE](.env.EXAMPLE). But in the situtation that we exceed the usage quotas of the starter project, you should create your own firebase project.

For Development Purposes, we have also stubbed the response from Google Maps Geocoding API so that you wouldn't have to obtain a Google Maps API Key with Billing account assosciated with it.
However, this produces a fixed response and if you would like dynamic and accurate response (which is most likely not required), you would have to generate your own Google Maps API Key with a Billing account assosciated with it.

We use the following Services and if you have to generate Credentials of your own, you have to enable these services and configure them with the following settings:

The Firebase Project must have the following Sign-In Methods Enabled:

- Facebook Sign In (with your own Faceboook App)
- Phone Auth
  The Firebase Project must also have Firestore and Cloud Messaging enabled.

You must also obtain a Google Maps API key with the following APIs enabled:

- Maps Javascript API
- Geocoding API

### If you are using the test credentials we provided, we had to enable https on localhost development server to let facebook app authenticate when redirecting as the facebook app had to be made live for everyone to be able to develop with it. This however, brings the problem of certificate. we haven't included the certificate in this repo and so you would be getting a warning from the browser warning you about the authenticity of the certificate. You should by pass the warning and proceed to start development.

## Run the project

1 - Install dependencies

```
yarn
```

2 - Run the `web-client` project in development mode.

```
cd ./web-client && yarn start
```

3 - The client is now available under [localhost:3000](http://localhost:3000)

# React version and Functional Components

### We are on the latest version of React.

- We favour functional components and hooks to class components.
- We also prefer multiple small components to a big one
- We are leveraging `TypeScript`
- We use `styled-components` for styling
- We use Prettier and ESLint to maintain consistent code

[Check here for latest version of React](https://reactjs.org/versions)

# How to report a bug

> If you find a security vulnerability, please contact us directly at `security@reach4help.org`. For any other non security-related issues, open an issue describing the problem.

# How to suggest a feature or enhancement

> Open an issue using with the suggestion you wish to give.

# Code review process

### For your contribution to get accepted after it’s been submitted.

Your contribution will have to be Approved by a member of the Organization before being merged.

> The core team looks at Pull Requests on a regular basis. After feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.

# Code, commit message and labeling conventions

### Commit message conventions.

We follow the conventional commits guidelines. Check [here](https://www.conventionalcommits.org/en/v1.0.0/)

### Code Style Enforced by Prettier

Prettier guarantees the code style adopted and runs on commit, stick to this code style.

<img height="42" width="42" src="https://prettier.io/icon.png" alt="Prettier">[ Prettier site for more information](https://prettier.io/ 'Prettier site for more information')

# PULL Requests

Opening pull requests should be done with enough information and screenshots for visual changes to facilitate the reviewers job. Its MANDATORY to add a link to the issue related

<h1 align="center">
  <a href="https://app.reach4help.org">
    <img src="../branding/logo/logo-compat.svg" width="60">
    <img src="../branding/logo/logo-type.svg" height="40">
  </a>
</h1>

# Introduction
 
This is our main app connecting people in need with volunteers who can help. We’re working with volunteer organizations across the world, amassing over 150 volunteers in 13 countries worldwide, providing support for charity events, food banks, and day-to-day delivery services. Our [backend layer](functions) manages all the data for our  **Check it out live [here](https://app.reach4help.org/)!**

# Local development

For contributing code, please take a look at our [CONTRIBUTING.md](./docs/CodingConventions/CONTRIBUTING.md) for in depth-instructions. 

## Using Docker

Just run:

### `docker-compose up -d --build`

Open [https://localhost:3002](https://localhost:3002) to view it in the browser.

The virtualisation is configured to map the `src` directory from the container to your local `src` directory, which will enable a seemless local development with support for everything it should, like HMR.

## Using local node

### Prerequisites

Go through the [Getting Started guide](./docs/CodingConventions/CONTRIBUTING.md#getting-started) in [CONTRIBUTING.md](./docs/CodingConventions/CONTRIBUTING.md) to set up the project.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

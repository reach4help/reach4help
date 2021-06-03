# COVID-19 Mutual Aid Map

<p align="center">
  <img src="../branding/banners/swarm_banner_map_alt.png">
</p>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contributing Data to The Map

You may find instructions on how to contribute data to the map [here](src/data/README.md).

## Available Scripts

In the project directory, you can run:

### Build @reach4help/model dependency:

`cd ../model` `yarn build`

Without this step, you will see this error:

```
Module not found: Can’t resolve ‘@reach4help/model/lib/markers’ in ‘~/projects/reach4help/map/src/data’
```

### Install map packages: `yarn` (from map directory)

Installs `yarn` packages specified in `yarn.lock`.

### Start Development Server: `yarn start` (from map directory)

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

For google maps to work when you're testing development, you need to have an API key that allows you to use it.

We don't include a key that is permitted to be used locally as that would incur costs for us.

To use your own key when testing development (or when running the build) please set the `REACT_APP_GOOGLE_MAPS_API_KEY` environment variable.

You can also specify this variable in a `.env` file to avoid entering it on the command line every time you run `yarn start`.

## Algolia Tutorials

If you are working on Algolia and new to it, I recommend reading the following tutorials and the errata together:

Optional: read or skim the following sections to learn about Algolia before starting the tutorial:

- [What is Algolia](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
- [How Algolia Works](https://www.algolia.com/doc/guides/getting-started/how-algolia-works/)

Start the backend tutorial:

- [Backend Tutorial - read errata below](https://www.algolia.com/doc/guides/getting-started/quick-start/tutorials/quick-start-with-the-api-client/javascript/?client=javascript)

  - **Install Section**
    - Run this command, then skip the rest: `yarn add algolia-search`. The install instructions actually have you install with `npm install` but Reach4Help uses yarn, which is generally considered better.
  - **Quick Start**

    - Before beginning:
      - if you don't have an Algolia account, create one for free
      - from the API keys screen copy your Application ID and Write API key.
    - **Initialize Client**

      This section has incomplete info and extra lines you don't need to enter.

      Here is what you should enter and copy into a file called init_practice.js

      ```
      import algoliasearch from 'algoliasearch/lite';
      import fs from 'fs';
      const client = algoliasearch('your_application_id','your_write_api_key');
      ```

    - **Push Data**

      - the line below will not work in Node uness you have Require installed, which is not recommended. Replace

        ```
        const contactsJSON = require('./contacts.json');
        ```

        with:

        ```
        let contactsJSON = fs.readFileSync('./contacts.json', {
          encoding: 'utf8',
          flag: 'r',
        });
        contactsJSON = JSON.parse(contactsJSON);
        ```

      - Instructions do not indicate how to run the file and check the data. First, run `node init_practice.js` and then check your indexes from your Algolia console. Click on the Contacts index to see the Contacts data. Hopefully, you see 500 contacts!
      - if you don't see the Contacts index, chec that you are using the correct Application ID and Write API Key.
      - if you don't see data in the Contacts index, add the following code to the end of the index.saveObjects statement:

      ```
       .catch(err => console.log('error ' + JSON.stringify(err, null, 2)));
      ```

      - combine code written or copied so far into init_practice.js
      - for code in the rest of the tutorial, put it into a separate file to avoid adding duplicate records to contacts

    - **Configure**
      - copy your code from init_practice.js up to and including the line: `const index = client.initIndex('contacts')` and paste into a new file search_practice.js
      - add code for the rest of the tutorial to this file
    - **Search**
      - add the code to the file you created in the previous section
    - **Search UI**
      - Skip this section entirely. The code is for a an HTML based system and the tutorial just has code without explanation. Use Frontend Tutorial in next section
      - Instead, see next session for recommended front end tutorial.

- Frontend Tutorial
  - [Using React/Algolia components]  (https://www.algolia.com/doc/api-reference/widgets/geo-search/react/) - up to part about Leaflet
  - Uaing Leaflet: second part of above tutorial

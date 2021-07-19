# Getting Started With Covid Helphub

## Functionality

The best way to start is to learn about the applicaton and what it does.

### Current Functionality

Covid Helphub is an organization in Canada that matches volunteers with people who need something ("beneficiaries"). Volunteers sign up through the website on a Googe form. Beneficiaries create a request through a Google form that asks for their contact info and what they need. If a volunteers and beneficiaries needs to update information, they have to contact staff at CHH. Volunteers and beneficiaries can also call CHH directly who can enter the information.

Information entered into the Google forms populates an Airtable table. CHH staff uses a combination of email and Airtable to manage the volunteers and requests. CHH staff may send out an email to find a volunteer for a request or may assign volunteers to a request based on what they know about a volunteer's avaialability. They then move the requests through a set of stages (open, matching, in progress, closed, cancelled) until the volunteer confirms the request is complete.

### Existing Forms

Please view the current forms (but don't submit) by going to covid19helphup19.org and clicking on Get Help or Get Involved.

### New Functionality

Airtable is expensive and in the current solution the beneficiary information has to be re-entered for all requests for a beneficiary. CHH would also like to see some enhancements, including making the system more user friendly, automating moving requests through the stages, using sentiment analysis to indicate likelihood a volunteer could assign, and utilizing text messages.

For the MVP, Reach4Help is building a system that implements the current functionality except storing beneficiaries in a separate table so their information could be re-used. After MVP, enhancements will be prioritized and implemented.

### Figma Wireframes

To understand what is being built, explore the wireframes. See https://www.figma.com/file/PgYaf0sV88x6P9UxoEgXJB/Reach4Help-Organization-Dashboard?node-id=2087%3A6546 for wireframe of the request flow after it is created. See https://www.figma.com/file/PgYaf0sV88x6P9UxoEgXJB/Reach4Help-Organization-Dashboard?node-id=1224%3A3203 for the flow for creating a request.  
**IGNORE** the page title which says "Help us make a difference". It should be something like "What do you need?"

There will be questions as you start to look at the screens in detail and build the screens. Funnel questions through Ethan. Use your best judgement about what to implement rather than waiting to get an answer and if it is different than the mockups, the UI team can review.

### Figma Tips

To scroll on the Mac, use the mouse scroll without holding down any keys. Zoom out to see all the flows, then Zoom in to look at a specific flow.

## Deploying Locally and Viewing Code

From your projects directory, clone the reach4help repository.

**Front end:**

cd reach4help
cd covidhelphub-frontend
yarn install # first time you clone only
yarn start # start web server

**Backend**

The frontend currently uses local storage. The backend which is in hasura is in development. To work on the backend look at the README.md in covidhelphub-backend.

## Coding

Look for issues with CHH-project as a tag that are not assigned. Eventually CHH will use Zenhub for priority of issues and to see what stage it is in. It is best to take issues from Product backlog or Sprint backlog of https://app.zenhub.com/workspaces/reach4help-chh-60d5ed8864e63f0010924781/board?repos=248581239. If you don't have access, contact Ethan, Shayan, or any other development lead and provide your github email.

For now, we are using a Google sheet https://docs.google.com/spreadsheets/d/1JQNCwXmnOZr_lYDI2b2JO-RwfHkmIee4/edit#gid=710538609. This will be migrated to Github Issues.

It is recommended to reviewing code for programs and how it is divided into model (objectModel), fetching data (services), and UI (components). Some of the code in programComponent is complicated in order to handle multi-record updates. In most cases, you will be working with single record updates.

Most issues will involve all three. If additional fields are needed or there is no resource, you can modify the objectModel.

Ethan is investigating how to call Hasura for the backend from the frontend. If interested in that, see the ethan/dev-chh-frontend-hasura-investigation branch.

## Recommendations

### Committing from terminal

Add --no-verify to the end of the git commit command

### Recommended VSCode Packages

- `Babel` Javascript
- Bracket Pair Colorizer
- ESLint
- GitLens
- JS Refactor
- Live Share
- Live Share Mob Timer
- Move TS
- Overtype
- Prettier
- Visual Code Intellisense

## Adding new NPM Packages to the monorepo

To add a new project to the repo,
simply create a new folder and its `package.json` file,
then add it to the `"workspaces"` property in the `package.json` file in the
root of this repository.

At this point running `yarn add` or `yarn install` in any of the sub directories
should update the appropriate `package.json`,
and update the `yarn.lock` in the root of the repo.

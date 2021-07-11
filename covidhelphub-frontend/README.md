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

### Deploying Locally and Viewing Code

From your projects directory, clone the reach4help repository.

**Front end:**

cd reach4help
cd covidhelphub-frontend
yarn install # first time you clone only
yarn start # start web server

**Backend**

# Reach4Help Backend

This document outlines the overall archtecture and goal of the Reach4Help Back End

## Serverless Overview

The back end is currently built on as serverless architecture running on [GCP Cloud Functions](https://cloud.google.com/functions/).
These functions are responsible for listening to events triggered when records are created/updated/deleted.
When events comes in it provides the function associated to the event a copy of the new record (and old record when applicable).
The functions are then responsible for conducting any additional work needed.
Sometimes this means updated different records in other collections (and thus triggering additional computations).
Function invocations should be localized to data that's pertinent to their specific collection.
This allows the rest of the system to handle actions without competing for the same record and triggering an infinte loop of updates.

## How To Contribute

Join out **#team-development** channel with the [Reach4Help Slack](https://join.slack.com/t/reach4help/shared_invite/zt-cu9pfz83-pAIKBDha17r5~W4thvn2Bw)

## Useage

The functions directory is a subrepo within a monorepo.  This used as the backend for Reach4Help website and resource map.

- [Firestore Triggers](https://firebase.google.com/docs/functions/firestore-events): Functions that are invoked by collection events (Create/Update/Delete of records in Firestore)
- [Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started): A set of rules and computations that prevent access (read/write/delete) to certain records and collections. 
These rules are also responsible for maintaining data integrity.
- [Storage Rules](https://firebase.google.com/docs/storage/security): The application also contains a static file storage component.
Currently we do not write data to this layer, but the back-end team is responsible for controlling access to this component.
- Third Party REST API: An additional component of our back-end that exposes our data to third-party developers via a REST API build on top of cloud functions.
This component will be developed after the inital MVP Launch.

## Development Environment
- Create a .runtimeconfig.json file
- Copy in contents from https://docs.google.com/document/d/1DNklTnhFZWYsJKnOzHK3VhFznAck1UP9biVd9P9wyok/edit If you don't have access, check with a development lead.
- Run
  ```
  yarn
  yarn serve
  ```
- 

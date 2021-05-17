Steps tried so far:

For functions and firestore:

- firebase console
    - Add through console.firebase.google.com
    - Enable billing
- modify .firebasesrc
    - add to projects 
    - copy configs for one of the projects
- termintal
    - firebase use --add
        - enter project name and alias
    - firebase functions:config:clone --from reach4help-dev
    - firebase deploy --only functions
    - firebase deploy --only firestore

For local web app:
- firebase console
    - Add app
        - Select project
        - Gear Icon => Project Settings
        - Add App
- .env file
    - copy API key
        - console.google.com
        - credentials
        - replace in .env
    - copy app id
        - console.firebase.google.com
        - Gear Icon => Project Settings
        - replace in .env
    - change reach4help-dev to reach4help-try-out-change
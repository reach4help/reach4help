import * as functions from 'firebase-functions';

// eslint-disable-next-line import/prefer-default-export
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

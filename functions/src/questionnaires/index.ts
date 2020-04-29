import * as functions from 'firebase-functions';
import { onCreate } from './functions';

export const triggerEventsWhenQuestionnaireIsCreated = functions.firestore
  .document('questionnaires/{questionnaireId}')
  .onCreate(onCreate);

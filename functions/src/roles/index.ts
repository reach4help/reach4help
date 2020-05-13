import * as functions from 'firebase-functions';
import { onWrite } from './functions';

export const rolesOnWrite = functions.firestore.document('roles/{userId}').onWrite(onWrite);

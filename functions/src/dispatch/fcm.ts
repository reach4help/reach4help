import * as Admin from 'firebase-admin';
import { messaging } from '../app';

export const sendToTopic = (config: Admin.messaging.Message) => messaging.send(config);

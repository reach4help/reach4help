import * as Admin from 'firebase-admin';
import { app } from '../app';

const messaging = app.messaging();

export const sendToTopic = (config: Admin.messaging.Message) => messaging.send(config);

import * as Admin from 'firebase-admin';

const admin = Admin.initializeApp(undefined, 'messagingApp');
const messaging = admin.messaging();

export const sendToTopic = async (config: Admin.messaging.Message) => messaging.send(config);

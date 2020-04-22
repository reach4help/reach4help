import * as admin from 'firebase-admin';
import * as flatten from 'flat';

import {
    sendToTopic
} from './fcm';
import { sendSMS } from './twilio';

admin.initializeApp();

export const notifyService = (config: Record<string, any>): Promise<void> => {
    for(let toNotify of config.notify){
        const fcmTopic = `${config[toNotify].id}_${config[toNotify].entity}_notifications in topics`;
        const notification: Record<string, string> = {};
        if(config[toNotify].entity === 'user'){
            notification['title'] = `${config.performedOnEntity.entity} ${config.action}`;
            notification['body'] = `Your ${config.performedOnEntity} was ${config.action}`;
            sendSMS(`Your ${config.performedOnEntity} was ${config.action}`, config['actor'].mobileNumber);
        }
        let data = { ...config };
        delete data['actor'];
        delete data['notify'];
        data = flatten(data, {
            delimiter: '_'
        });
        sendToTopic({
            notification,
            data,
            topic: fcmTopic
        });
    }
    return Promise.resolve();
}
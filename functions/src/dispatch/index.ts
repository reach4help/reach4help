import * as flatten from 'flat';

import { sendToTopic } from './fcm';
import { sendSMS } from './twilio';

export const notifyService = (config: Record<string, any>): Promise<void> => {
  const operations: Promise<void>[] = [];
  for (const toNotify of config.notify) {
    const fcmTopic = `${config[toNotify].id}_${config[toNotify].entity}_notifications in topics`;
    const notification: Record<string, string> = {};
    if (config[toNotify].entity === 'user') {
      notification.title = `${config.performedOnEntity.entity} ${config.action}`;
      notification.body = `Your ${config.performedOnEntity} was ${config.action}`;
      // Throw away the data since we don't need it using a hanging .then().
      operations.push(sendSMS(`Your ${config.performedOnEntity} was ${config.action}`, config.actor.mobileNumber).then());
    }
    let data = { ...config };
    delete data.actor;
    delete data.notify;
    data = flatten(data, {
      delimiter: '_',
    });
    // Throw away the data since we don't need it using a hanging .then().
    operations.push(
      sendToTopic({
        notification,
        data,
        topic: fcmTopic,
      }).then(),
    );
  }

  // Throw away the data since we don't need it using a hanging .then().
  return Promise.all(operations).then();
};

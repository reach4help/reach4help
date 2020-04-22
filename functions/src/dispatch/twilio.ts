import * as functions from 'firebase-functions';
import * as Client from 'twilio';

const accountSid = functions.config().TWILIO_ACCOUNT_SID;
const authToken = functions.config().TWILIO_AUTH_TOKEN;

const client = Client(accountSid, authToken);

export const sendSMS = async (body: string, to: string) =>
  client.messages.create({
    body,
    from: functions.config().TWILIO_SERVICE_SID,
    to,
  });

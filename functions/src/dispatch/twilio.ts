import * as functions from 'firebase-functions';
import * as Client from 'twilio';

let twilioAccountSid: string;
let twilioServiceSid: string;
let twilioAuthToken: string;
let client: Client.Twilio;

try {
  twilioAccountSid = functions.config().twilio.account_sid;
  twilioServiceSid = functions.config().twilio.service_sid;
  twilioAuthToken = functions.config().twilio.auth_token;
  client = Client(twilioAccountSid, twilioAuthToken);
} catch (err) {
  console.error('WARNING - twilio not configured properly');
  console.error(err);
}

export const sendSMS = (body: string, to: string) =>
  client.messages.create({
    body,
    from: twilioServiceSid,
    to,
  });

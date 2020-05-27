import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const authenticateBot = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).send('Invalid method');
    return;
  }
  const presharedToken = req.body.token;
  if (!presharedToken || presharedToken === '') {
    res.status(400).send('missing token');
    return;
  }
  const requiredTokens = functions.config().bot_auth_tokens;
  if (!requiredTokens) {
    res.status(500).send('Tokens not configured for this firebase instance');
    return;
  }
  let confirmedUid: string | null = null;
  for (const [botUid, token] of Object.entries(requiredTokens)) {
    if (presharedToken === token) {
      confirmedUid = botUid;
      break;
    }
  }
  if (confirmedUid) {
    const token = await admin.auth().createCustomToken(confirmedUid);
    res.status(200).send(token);
  } else {
    res.status(403).send('invalid token');
  }
});

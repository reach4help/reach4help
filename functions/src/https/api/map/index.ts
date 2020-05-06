import * as functions from 'firebase-functions';
import { FieldPath } from '@google-cloud/firestore';

import { db } from '../../../app';

import { MarkerInfo, MARKER_COLLECTION_ID } from '../../../models/markers';

/* eslint-disable max-len */
const LICENSES = {
  reach4help:
    'This data by Reach4Help (https://reach4help.org/) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (http://creativecommons.org/licenses/by-nc-sa/4.0/)',
  // TODO: uncomment when license is confirmed with mutualaid.wiki
  // 'mutualaid.wiki': `This data by Mutual Aid Wiki (https://mutualaid.wiki/) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (http://creativecommons.org/licenses/by-nc-sa/4.0/)`
};
/* eslint-enable max-len */

type LicenseKey = keyof typeof LICENSES;

interface Marker extends MarkerInfo {
  id: string;
  license: LicenseKey;
}

interface Result {
  licenses: typeof LICENSES;
  data: Marker[];
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const data = functions.https.onRequest(async (_req, res) => {
  const result: Result = {
    licenses: LICENSES,
    data: [],
  };
  const markers = await db
    .collection(MARKER_COLLECTION_ID)
    .where(new FieldPath('visible'), '==', true)
    .get();
  markers.forEach(doc => {
    const docData = doc.data() as MarkerInfo;
    // TODO: add other sources (with appropriate licenses)
    if (!(docData as any).source) {
      result.data.push({
        ...docData,
        id: doc.id,
        license: 'reach4help',
      });
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.status(200).send(JSON.stringify(result));
});

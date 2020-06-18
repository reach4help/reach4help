import * as functions from 'firebase-functions';
import { FieldPath } from '@google-cloud/firestore';

import { db } from '../../../app';

import { MARKER_COLLECTION_ID, MarkerInfo, SerializableMarkerInfo } from '../../../models/markers';

/* eslint-disable max-len */
const LICENSES = {
  reach4help:
    'This data by Reach4Help (https://reach4help.org/) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (http://creativecommons.org/licenses/by-nc-sa/4.0/)',
  // TODO: uncomment when license is confirmed with mutualaid.wiki
  // 'mutualaid.wiki': `This data by Mutual Aid Wiki (https://mutualaid.wiki/) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (http://creativecommons.org/licenses/by-nc-sa/4.0/)`
  'mutualaidhub.org':
    'This data from mutualaidhub.org is licensed under Public Domain Dedication and License v1.0 (https://www.opendatacommons.org/licenses/pddl/1.0/)',
};
/* eslint-enable max-len */

type LicenseKey = keyof typeof LICENSES;

interface Marker extends SerializableMarkerInfo {
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
    let license: LicenseKey | null = null;
    if (!docData.source || docData.source.name === 'hardcoded') {
      license = 'reach4help';
    } else if (docData.source.name === 'mutualaidhub.org') {
      license = 'mutualaidhub.org';
    }
    if (license) {
      result.data.push({
        ...docData,
        loc: {
          ...docData.loc,
          latlng: {
            latitude: docData.loc.latlng.latitude,
            longitude: docData.loc.latlng.longitude,
          },
        },
        id: doc.id,
        license,
      });
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.status(200).send(JSON.stringify(result));
});

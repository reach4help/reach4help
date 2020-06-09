import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { db } from '../../../app';
import { IUser, User } from '../../../models/users';
import { IPrivilegedUserInformation, PrivilegedUserInformation } from '../../../models/users/privilegedInformation';

export const getNearbyVolunteers = functions.https.onCall(async (data, context) => {
  const { lat, lng, radius } = data;
  const userId = context.auth?.uid;

  if (userId) {
    const userRef = db.collection('users').doc(userId);
    const user = User.factory((await userRef.get()).data() as IUser);

    if (user && user.applicationPreference) {
      // ~1 mile of lat and lon in degrees
      const unitLat = 0.0144927536231884;
      const unitLng = 0.0181818181818182;

      const lowerLat = lat - unitLat * radius;
      const lowerLng = lng - unitLng * radius;

      const greaterLat = lat + unitLat * radius;
      const greaterLng = lng + unitLng * radius;

      const lesserGeopoint = new firestore.GeoPoint(lowerLat, lowerLng);
      const greateGeopoint = new firestore.GeoPoint(greaterLat, greaterLng);

      const queryResults = await db
        .collectionGroup('privilegedInformation')
        .where('address.coords', '>=', lesserGeopoint)
        .where('address.coords', '<=', greateGeopoint)
        .get();
      const idToDataMapping: Record<string, IPrivilegedUserInformation> = {};
      for (const queryResult of queryResults.docs) {
        idToDataMapping[queryResult.id] = PrivilegedUserInformation.factory(
          queryResult.data() as IPrivilegedUserInformation,
        ).toObject() as IPrivilegedUserInformation;
      }
      return {
        sucess: true,
        data: idToDataMapping,
      };
    }
    throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
  } else {
    throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
  }
});

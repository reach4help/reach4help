import * as firebase from '@firebase/testing';
import { Request } from '../src/models/requests';
import { User, ApplicationPreference, IUser } from '../src/models/users';
import { indexUnauthenticatedRequest } from '../src/algolia/index';

const projectId = 'reach-4-help-test';

const authedApp = (auth?: object) => {
    const app = firebase.initializeTestApp({ projectId, auth })
    return {
        app,
        db: app.firestore()
    }
};

beforeAll(async () => {
    const { db } = authedApp({uid: '1234'});
    const user = User.factory({
        displayPicture: '',
        displayName: 'newtestuser',
        applicationPreference: ApplicationPreference.pin,
        username: 'newtestuser'
    })
    await db.collection('users').doc('1234').set(user.toObject());
});

describe('request creation triggers', () => {
    const { db } = authedApp({ uid: '1234' });
    it('should delete invalid data', async () => {
        const request = Request.factory({
            pinUserRef: db.collection('users').doc('1234') as any,
            pinUserSnapshot: (await db.collection('users').doc('1234').get()).data() as IUser,
            title: 'new test request2',
            description: 'description of the nrew test request',
            latLng: new firebase.firestore.GeoPoint(0,0),
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now(),
            streetAddress: 'random street address2'
        });
        console.log("object being set for request: ", request.toObject());
        await db.collection('requests').doc('12345').set(request.toObject());
        await indexUnauthenticatedRequest(request, db.collection('requests').doc('12345').path)
        console.log("successfully set the request");
    });
  });
  
import { validateOrReject } from 'class-validator';

import { ApplicationPreference, User } from '../src/models/users';

describe('user validation', () => {
  it('fails when you pass it negative ratings ', () => {
    const user = User.factory({
      cavRatingsReceived: 0,
      pinRatingsReceived: 0,
      cavQuestionnaireRef: null,
      pinQuestionnaireRef: null,
      averageRating: -1,
      casesCompleted: 0,
      requestsMade: 0,
      username: 'TestUser',
      displayName: null,
      displayPicture: null,
      applicationPreference: ApplicationPreference.pin,
    });

    return validateOrReject(user)
      .then(() => {
        throw Error('Validations should have failed, but they passed');
      })
      .catch(errors => {
        expect(errors).toBeTruthy();
      });
  });

  it('succeeds when you pass it minimum info ', () => {
    const user = User.factory({
      averageRating: null,
      casesCompleted: 0,
      cavRatingsReceived: 0,
      displayName: null,
      displayPicture: null,
      pinRatingsReceived: 0,
      requestsMade: 0,
      cavQuestionnaireRef: null,
      pinQuestionnaireRef: null,
      username: 'TestUser',
    });

    return validateOrReject(user).then(() => {
      expect(true).toBeTruthy();
    });
  });
});

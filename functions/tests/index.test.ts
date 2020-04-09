import { validate } from 'class-validator';

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
      },
    );

    return validate(user)
      .then(() => {
        throw Error('Validations should have failed, but they passed');
      })
      .catch(errors => {
        expect(errors).toBeTruthy();
      });
  });
});

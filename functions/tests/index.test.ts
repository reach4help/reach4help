import { validate } from 'class-validator';

import { User } from '../src/models/users';

describe('user validation', () => {
  it('fails when you pass it negative ratings ', () => {
    const user = User.factory({
        cavQuestionnaireRef: null,
        pinQuestionnaireRef: null,
        averageRating: -1,
        casesCompleted: 0,
        requestsMade: 0,
        username: 'TestUser',
        displayName: null,
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

import { validate } from 'class-validator';

import { User } from '../src/users';

describe('user validation', () => {
  it('fails when you pass it negative ratings ', () => {
    const user = User.factory({
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

import { validate } from 'class-validator';

import { User } from '../src/users';

test('user validation: empty object fails', () => {
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

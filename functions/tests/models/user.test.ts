import { validateOrReject } from 'class-validator';

import { User } from '../../src/models/users/User';

describe('user validation', () => {
  it('fails when you pass it negative average ', () => {
    const user = User.factory({
      username: 'TestUser',
      displayNickname: null,
      displayPicture: null,
    });

    return validateOrReject(user)
      .then(() => {
        throw Error('Validations should have failed, but they passed');
      })
      .catch(errors => {
        expect(errors).toBeTruthy();
      });
  });

  it('fails when you pass it negative posts made', () => {
    const user = User.factory({
      casesCompleted: 0,
      postsMade: -1,
      username: 'TestUser',
      displayNickname: null,
      displayPicture: null,
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
      username: 'test_user',
    });

    return validateOrReject(user).then(() => {
      expect(true).toBeTruthy();
    });
  });
});

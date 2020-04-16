import { validateOrReject } from 'class-validator';

import { ApplicationPreference, User } from '../src/models/users';

describe('user validation', () => {
  it('fails when you pass it negative average ', () => {
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

  it('fails when you pass it negative cav ratings received ', () => {
    const user = User.factory({
      cavRatingsReceived: -1,
      pinRatingsReceived: 0,
      cavQuestionnaireRef: null,
      pinQuestionnaireRef: null,
      averageRating: 0,
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

  it('fails when you pass it negative pin ratings received ', () => {
    const user = User.factory({
      cavRatingsReceived: 1,
      pinRatingsReceived: -1,
      cavQuestionnaireRef: null,
      pinQuestionnaireRef: null,
      averageRating: 0,
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

  it('fails when you pass it negative cases completed', () => {
    const user = User.factory({
      cavRatingsReceived: 1,
      pinRatingsReceived: 1,
      cavQuestionnaireRef: null,
      pinQuestionnaireRef: null,
      averageRating: 0,
      casesCompleted: -1,
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

  it('fails when you pass it negative requests made', () => {
    const user = User.factory({
      cavRatingsReceived: 1,
      pinRatingsReceived: 1,
      cavQuestionnaireRef: null,
      pinQuestionnaireRef: null,
      averageRating: 0,
      casesCompleted: 0,
      requestsMade: -1,
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
      username: 'test_user',
    });

    return validateOrReject(user)
      .then(() => {
        expect(true).toBeTruthy();
      });
  });
});

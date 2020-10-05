/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { observeUserAction } from 'src/ducks/auth/actions';
import { AuthState } from 'src/ducks/auth/types';
import {
  observePrivileged,
  observeProfile,
  setUserProfile,
} from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';

import PersonalDataForm, {
  IPersonalData,
} from '../../components/PersonalDataForm/PersonalDataForm';

// is there a place where we should put the interfaces that would be common
// for the wrapper and for the UI component ?

const PersonalDataFormContainer: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const user = useSelector(({ auth }: { auth: AuthState }) => auth.user);
  const dispatch = useDispatch();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  useEffect((): any => {
    if (user && user.uid) {
      return observeProfile(dispatch, { uid: user.uid });
    }
    return undefined;
  }, [dispatch, user]);

  useEffect((): any => {
    if (user && user.uid) {
      return observePrivileged(dispatch, { uid: user.uid });
    }
    return undefined;
  }, [dispatch, user]);

  const handleFormSubmit = (personalInfo: IPersonalData) => {
    const {
      termsAndPrivacyAccepted,
      displayName,
      displayPic,
      sendNotificatoins,
    } = personalInfo;
    if (termsAndPrivacyAccepted && displayName && user) {
      dispatch(
        setUserProfile(
          {},
          termsAndPrivacyAccepted,
          displayName,
          user.uid,
          sendNotificatoins,
          displayPic,
        ),
      );
    } else {
      alert(
        t(
          'modules.personal-data.containers.PersonalDataFormContainer.missing_data',
        ),
      );
    }
  };

  return (
    <PersonalDataForm
      handleFormSubmit={handleFormSubmit}
      user={user}
      profile={profileState.profile}
    />
  );
};

export default PersonalDataFormContainer;

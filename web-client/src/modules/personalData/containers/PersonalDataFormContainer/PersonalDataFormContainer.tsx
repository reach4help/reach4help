import React from 'react';
import { useSelector } from 'react-redux';
import { AuthState } from 'src/ducks/auth/types';
import { ProfileState } from 'src/ducks/profile/types';

import PersonaDataForm from '../../components/PersonaDataForm/PersonaDataForm';

const PersonalDataFormContainer: React.FC = () => {
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const user = useSelector(({ auth }: { auth: AuthState }) => auth.user);
  const handleFormSubmit = () => null;
  return (
    <>
      <PersonaDataForm
        handleFormSubmit={handleFormSubmit}
        user={user}
        profile={profileState.profile}
        priviledgedInfo={profileState.privilegedInformation}
      />
    </>
  );
};

PersonalDataFormContainer.propTypes = {};

export default PersonalDataFormContainer;

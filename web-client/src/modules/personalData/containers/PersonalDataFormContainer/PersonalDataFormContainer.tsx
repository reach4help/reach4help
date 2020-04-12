import React from 'react';

import PersonaDataForm from '../../components/PersonaDataForm/PersonaDataForm';

const PersonalDataFormContainer: React.FC = () => (
  <>
    <PersonaDataForm handleFormSubmit={() => null} />
  </>
);

PersonalDataFormContainer.propTypes = {};

export default PersonalDataFormContainer;

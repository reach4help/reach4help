import React from 'react';

import PersonalDataForm from '../../components/PersonalDataForm/PersonalDataForm';

const PersonalDataFormContainer: React.FC = () => (
  <>
    <PersonalDataForm handleFormSubmit={() => null} />
  </>
);

PersonalDataFormContainer.propTypes = {};

export default PersonalDataFormContainer;

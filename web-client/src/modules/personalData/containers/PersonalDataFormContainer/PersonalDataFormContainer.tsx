import React from 'react';

import PersonaDataForm from '../../components/PersonaDataForm/PersonaDataForm';

const LoginContainer: React.FC = () => (
  <>
    <PersonaDataForm handleFormSubmit={() => null} />
  </>
);

LoginContainer.propTypes = {};

export default LoginContainer;

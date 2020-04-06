import React from 'react';

import CenteredCard from '../../components/CenteredCard/CenteredCard';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import UserDataForm from '../../components/UserDataForm/UserDataForm';

const UserDataFormPage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (values: { body: string; title: string }) => {
    // eslint-disable-next-line no-console
    console.log('Form Data:', values);
  };

  return (
    <GradientBackground>
      <CenteredCard>
        <UserDataForm handleFormSubmit={handleFormSubmit} />
      </CenteredCard>
    </GradientBackground>
  );
};

export default UserDataFormPage;

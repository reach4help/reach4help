import React from 'react';
import { useHistory } from 'react-router-dom';

import NewRequestForm from '../../components/NewRequestForm/NewRequestForm';
import { NewRequestSuccessLocation } from '../../pages/routes/NewRequestSuccessRoute/constants';

const NewRequestContainer: React.FC = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (values: { body: string; title: string }) => {
    setTimeout(() => history.push(NewRequestSuccessLocation.path), 250);
  };

  return (
    <>
      <NewRequestForm handleFormSubmit={handleFormSubmit} />
    </>
  );
};

NewRequestContainer.propTypes = {};

export default NewRequestContainer;

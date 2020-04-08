import React from 'react';

import NewRequestForm from '../../components/NewRequestForm/NewRequestForm';

const NewRequestContainer: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (values: { body: string; title: string }) => {
    // console.log("Form Data:", values);
  };

  return (
    <>
      <NewRequestForm handleFormSubmit={handleFormSubmit} />
    </>
  );
};

NewRequestContainer.propTypes = {};

export default NewRequestContainer;

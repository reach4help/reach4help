import React from "react";

import NewRequest from "../../components/NewRequest/NewRequest";

const NewRequestContainer: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (values: { body: string; title: string }) => {
    // console.log("Form Data:", values);
  };

  return (
    <>
      <NewRequest handleFormSubmit={handleFormSubmit} />
    </>
  );
};

NewRequestContainer.propTypes = {};

export default NewRequestContainer;

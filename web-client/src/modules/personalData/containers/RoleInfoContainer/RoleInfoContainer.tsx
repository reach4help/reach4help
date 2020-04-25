import React from 'react';
import { ApplicationPreference } from 'src/models/users';

import RoleInfo from '../../components/RoleInfo/RoleInfo';

const RoleInfoContainer: React.FC = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  const chooseApplicationPreference = (preference: ApplicationPreference) => {};

  return (
    <>
      <RoleInfo chooseApplicationPreference={chooseApplicationPreference} />
    </>
  );
};

RoleInfoContainer.propTypes = {};

export default RoleInfoContainer;

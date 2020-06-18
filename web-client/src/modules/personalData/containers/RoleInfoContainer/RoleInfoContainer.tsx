import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from 'src/ducks/auth/types';
import { updateUserProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';

import RoleInfo from '../../components/RoleInfo/RoleInfo';

const RoleInfoContainer: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector(({ auth }: { auth: AuthState }) => auth);
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const chooseApplicationPreference = (preference: ApplicationPreference) => {
    const user = profileState.profile;
    if (user && authState.user) {
      user.applicationPreference = preference;
      dispatch(updateUserProfile(authState.user.uid, user));
    }
  };

  return (
    <>
      <RoleInfo chooseApplicationPreference={chooseApplicationPreference} />
    </>
  );
};

export default RoleInfoContainer;

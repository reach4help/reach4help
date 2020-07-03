import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import { AuthState } from '../../../../ducks/auth/types';
import {
  observeProfile,
  updateUserProfile,
} from '../../../../ducks/profile/actions';
import { ProfileState } from '../../../../ducks/profile/types';
import SettingsList from '../../components/SettingsList/SettingsList';
import SettingsTopPanel from '../../components/TopPanel/SettingsTopPanel';

const SettingsContainer: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // const [showDeleteAccountModal, setDeleteAccountModal] = useState<boolean>(false);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const authState = useSelector(({ auth }: { auth: AuthState }) => auth);

  useEffect(() => {
    document.title = 'Reach4Help: '.concat(t('routeSubtitles._settings'));
  });

  useEffect((): any => {
    if (authState && authState.user && authState.user.uid) {
      return observeProfile(dispatch, { uid: authState.user.uid });
    }
    return undefined;
  }, [dispatch, authState]);

  if (!profileState.profile || !authState) {
    return <LoadingWrapper />;
  }

  // const deleteAccountClickHandler = () => {
  //     setDeleteAccountModal(true);
  // };

  const changeNameSubmitHandler = (displayName, username) => {
    const user = profileState.profile;
    if (user && authState.user) {
      user.displayName = displayName;
      user.username = username;

      dispatch(updateUserProfile(authState.user.uid, user));
    }
  };

  return (
    <>
      <SettingsTopPanel
        goBack={() => history.goBack()}
        user={profileState.profile}
      />
      <SettingsList
        changeNameSubmitHandler={changeNameSubmitHandler}
        deleteAccountClickHandler={() => ''}
        initialValues={{
          displayName: profileState.profile.displayName,
          username: profileState.profile.username,
        }}
      />
    </>
  );
};

export default SettingsContainer;

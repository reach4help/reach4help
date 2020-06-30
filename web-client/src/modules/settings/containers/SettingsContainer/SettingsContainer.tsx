import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import { ChangeNameModal } from '../../../../components/Modals/ChangeNameModal';
import { AuthState } from '../../../../ducks/auth/types';
import { observeProfile, updateUserProfile } from '../../../../ducks/profile/actions';
import { ProfileState } from '../../../../ducks/profile/types';
import Settings from '../../components/Settings/Settings';
import TopPanel from '../../components/TopPanel/TopPanel';

const SettingsContainer: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [showChangeNameModal, setShowChangeNameModal] = useState<boolean>(false);
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
    const changeNameClickHandler = () => {
        setShowChangeNameModal(true);
    };
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
        <TopPanel
            goBack={() => history.goBack()}
            user={profileState.profile}
        />
        <Settings
            changeNameClickHandler={changeNameClickHandler}
            deleteAccountClickHandler={() => ''}
        />
        <ChangeNameModal
              changeNameHandler={changeNameSubmitHandler}
              showModal={showChangeNameModal}
              closeModal={() => setShowChangeNameModal(false)}
              initialValues={{
                  displayName: profileState.profile.displayName,
                  username: profileState.profile.username,
              }}
          />
      </>
    );
};

export default SettingsContainer;

import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBackIcon from 'src/assets/nav-back-icon.svg';
import { User } from 'src/models/users/index';

import {
  SettingsTopPanelDisplayName,
  SettingsTopPanelDisplayPhoto,
  SettingsTopPanelEmptyPhoto,
  SettingsTopPanelHeadingRow,
  SettingsTopPanelNavRow,
  SettingsTopPanelUserRow,
  SettingsTopPanelWrapper,
} from '../../../../components/figma/BlockStyles';

const SettingsTopPanel: React.FC<SettingsTopPanel> = ({ user, goBack }) => {
  const { t } = useTranslation();

  return (
    <SettingsTopPanelWrapper>
      <SettingsTopPanelNavRow>
        <div onClick={() => goBack()}>
          <img
            src={NavBackIcon}
            alt={t(
              'modules.navigation.components.SettingsTopPanel.a11y_back_nav',
            )}
          />
        </div>
      </SettingsTopPanelNavRow>
      <SettingsTopPanelHeadingRow>
        {t('settings.heading')}
      </SettingsTopPanelHeadingRow>
      <SettingsTopPanelUserRow>
        {user && user.displayPicture ? (
          <SettingsTopPanelDisplayPhoto
            src={user.displayPicture}
            alt={t(
              'modules.navigation.components.SettingsTopPanel.a11y_display_photo',
            )}
          />
        ) : (
          <SettingsTopPanelEmptyPhoto />
        )}
        <SettingsTopPanelDisplayName>
          {user?.displayName}
        </SettingsTopPanelDisplayName>
      </SettingsTopPanelUserRow>
    </SettingsTopPanelWrapper>
  );
};

interface SettingsTopPanel {
  user?: User;
  goBack: Function;
}

export default SettingsTopPanel;

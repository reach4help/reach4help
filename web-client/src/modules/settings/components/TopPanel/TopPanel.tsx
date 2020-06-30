import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBackIcon from 'src/assets/nav-back-icon.svg';
import { User } from 'src/models/users/index';

import {
    TopPanelDisplayName,
    TopPanelDisplayPhoto, TopPanelEmptyPhoto,
    TopPanelHeadingRow,
    TopPanelNavRow,
    TopPanelUserRow,
    TopPanelWrapper,
} from '../../../../components/figma/BlockStyles';

const TopPanel: React.FC<TopPanelProps> = ({ user, goBack }) => {
    const { t } = useTranslation();

    return (
      <TopPanelWrapper>
        <TopPanelNavRow>
          <div onClick={() => goBack()}>
            <img
                        src={NavBackIcon}
                        alt={t('modules.navigation.components.TopPanel.a11y_back_nav')}
                    />
          </div>
        </TopPanelNavRow>
        <TopPanelHeadingRow>
          {t('settings.heading')}
        </TopPanelHeadingRow>
        <TopPanelUserRow>
          {user && user.displayPicture ? (
            <TopPanelDisplayPhoto
                  src={user.displayPicture}
                  alt={t('modules.navigation.components.TopPanel.a11y_display_photo')}
              />
          ) : (
            <TopPanelEmptyPhoto />
          )}
          <TopPanelDisplayName>
            {user?.displayName}
          </TopPanelDisplayName>
        </TopPanelUserRow>
      </TopPanelWrapper>
    );
};

interface TopPanelProps {
    user?: User;
    goBack: Function;
}

export default TopPanel;

import { CheckOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavBackIcon from 'src/assets/nav-back-icon.svg';
import { MediumSaveButton } from 'src/components/Buttons';
import { User } from 'src/models/users/index';
import styled from 'styled-components';

import {
  SettingsTopPanelDisplayName,
  SettingsTopPanelDisplayPhoto,
  SettingsTopPanelEmptyPhoto,
  SettingsTopPanelHeadingRow,
  SettingsTopPanelUserRow,
  SettingsTopPanelWrapper,
} from '../../../../components/figma/BlockStyles';
import ChangeAvatar from '../ChangeAvatar/ChangeAvatar';

const SettingsTopPanel: React.FC<SettingsTopPanel> = ({ user, goBack }) => {
  const { t } = useTranslation();
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  return (
    <SettingsTopPanelWrapper>
      {/* <SettingsTopPanelNavRow>
        <div onClick={() => goBack()}>
          <img
            src={NavBackIcon}
            alt={t('modules.navigation.components.TopPanel.a11y_back_nav')}
          />
        </div>
      </SettingsTopPanelNavRow> */}
      <SettingsTopPanelHeadingRow>
        <div onClick={() => goBack()}>
          <img
            src={NavBackIcon}
            alt={t('modules.navigation.components.TopPanel.a11y_back_nav')}
          />
        </div>
        {t('settings.heading')}
      </SettingsTopPanelHeadingRow>
      <SettingsTopPanelUserRow>
        <AvatarButton onClick={() => setAvatarModalVisible(true)}>
          {user && user.displayPicture ? (
            <SettingsTopPanelDisplayPhoto
              src={user.displayPicture}
              alt={t(
                'modules.navigation.components.TopPanel.a11y_display_photo',
              )}
            />
          ) : (
            <SettingsTopPanelEmptyPhoto />
          )}
        </AvatarButton>
        <Modal
          title={t('settings.changeAvatar')}
          footer={
            <MediumSaveButton htmlType="submit">
              <CheckOutlined />
              {t('settings.changeNameForm.submit')}
            </MediumSaveButton>
          }
          visible={avatarModalVisible}
          onCancel={() => setAvatarModalVisible(false)}
          centered
          closable
        >
          <ChangeAvatar displayPicture={user && user.displayPicture} />
        </Modal>
        <SettingsTopPanelDisplayName>
          {user?.displayName}
        </SettingsTopPanelDisplayName>
      </SettingsTopPanelUserRow>
    </SettingsTopPanelWrapper>
  );
};

const AvatarButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 20px;
  border: none;
  display: inline-block;
  text-align: center;
`;

interface SettingsTopPanel {
  user?: User;
  goBack: Function;
}

export default SettingsTopPanel;

import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsButton } from '../../../../components/Buttons';
import { SettingsWrapper } from '../../../../components/figma/BlockStyles';

const Settings: React.FC<SettingsProps> = ({
                                               changeNameClickHandler,
                                               deleteAccountClickHandler,
                                           }): React.ReactElement => {
    const { t } = useTranslation();

    return (
      <SettingsWrapper>
        <Row gutter={[0, 12]}>
          <Col span="24" md={12}>
            <SettingsButton
                    type="default"
                    onClick={() => changeNameClickHandler()}
                >
              <UserOutlined />
              <span>{t('settings.changeName')}</span>
            </SettingsButton>
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col span="24" md={12}>
            <SettingsButton
                    type="default"
                    onClick={() => deleteAccountClickHandler()}
                >
              <UserDeleteOutlined />
              <span>{t('settings.deleteAccount')}</span>
            </SettingsButton>
          </Col>
        </Row>
      </SettingsWrapper>
    );
};

interface SettingsProps {
    changeNameClickHandler: Function;
    deleteAccountClickHandler: Function;
}

export default Settings;

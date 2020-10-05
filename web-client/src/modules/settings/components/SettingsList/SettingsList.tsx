// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Collapse } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { SettingsListButton } from '../../../../components/Buttons';
import { H4Font } from '../../../../components/figma';
import {
  SettingsCollapsePanelHeaderContent,
  SettingsListCollapsePanel,
  SettingsListContainer,
  SettingsListItemWrapper,
  SettingsListWrapper,
} from '../../../../components/figma/BlockStyles';
import { ChangeName } from '../ChangeName/ChangeName';

const SettingsList: React.FC<SettingsProps> = ({
  changeNameSubmitHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  deleteAccountClickHandler,
  initialValues,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [collapseActiveKey, setCollapseActiveKey] = useState<string[]>([]);

  const changeNameHandler = activeKey => setCollapseActiveKey(activeKey);
  const ChangeNameExpandedHeader = () => (
    <H4Font>
      <UserOutlined />
      <SettingsCollapsePanelHeaderContent>
        {t('settings.changeName')}
      </SettingsCollapsePanelHeaderContent>
    </H4Font>
  );

  const ChangeNameHeader = () => (
    <>
      <UserOutlined />
      <SettingsCollapsePanelHeaderContent>
        {t('settings.changeName')}
      </SettingsCollapsePanelHeaderContent>
    </>
  );
  const PanelHeader = () =>
    collapseActiveKey.length > 0
      ? ChangeNameExpandedHeader()
      : ChangeNameHeader();

  return (
    <SettingsListWrapper>
      <SettingsListContainer>
        <SettingsListItemWrapper>
          <Col span="24" lg={12}>
            <Collapse
              onChange={changeNameHandler}
              bordered={false}
              activeKey={collapseActiveKey}
            >
              <SettingsListCollapsePanel
                showArrow={false}
                header={PanelHeader()}
                key={1}
                forceRender
              >
                <ChangeName
                  changeNameHandler={changeNameSubmitHandler}
                  cancelHandler={() => setCollapseActiveKey([])}
                  initialValues={initialValues}
                />
              </SettingsListCollapsePanel>
            </Collapse>
          </Col>
        </SettingsListItemWrapper>
        <SettingsListItemWrapper>
          <Col span="24" lg={12}>
            <SettingsListButton
              type="default"
              onClick={() => deleteAccountClickHandler()}
            >
              <UserDeleteOutlined />
              <span>{t('settings.deleteAccount')}</span>
            </SettingsListButton>
          </Col>
        </SettingsListItemWrapper>
      </SettingsListContainer>
    </SettingsListWrapper>
  );
};

interface SettingsProps {
  changeNameSubmitHandler: Function;
  deleteAccountClickHandler: Function;
  initialValues: {
    displayName: string | null;
    username: string | null;
  };
}

export default SettingsList;

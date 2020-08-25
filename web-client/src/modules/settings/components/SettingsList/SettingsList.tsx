// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { IUserAddress } from 'src/models/users/privilegedInformation';

import { SettingsListButton } from '../../../../components/Buttons';
import { H4Font } from '../../../../components/figma';
import {
  SettingsCollapsePanelHeaderContent,
  SettingsListCollapsePanel,
  SettingsListWrapper,
} from '../../../../components/figma/BlockStyles';
import { ChangeAddresses } from '../ChangeAddresses/ChangeAddresses';
import { ChangeName } from '../ChangeName/ChangeName';

const SettingsList: React.FC<SettingsProps> = ({
  changeAddressesSubmitHandler,
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

  const changeAddressesHandler = activeKey => setCollapseActiveKey(activeKey);
  const ChangeAddressesHeader = () => (
    <>
      <UserOutlined />
      <SettingsCollapsePanelHeaderContent>
        {t('settings.changeAddresses')}
      </SettingsCollapsePanelHeaderContent>
    </>
  );

  const ChangeAddressesExpandedHeader = () => (
    <H4Font>
      <UserOutlined />
      <SettingsCollapsePanelHeaderContent>
        {t('settings.changeAddresses')}
      </SettingsCollapsePanelHeaderContent>
    </H4Font>
  );

  const NamePanelHeader = () =>
    collapseActiveKey.includes('1')
      ? ChangeNameExpandedHeader()
      : ChangeNameHeader();

  const AddressesPanelHeader = () =>
    collapseActiveKey.includes('2')
      ? ChangeAddressesExpandedHeader()
      : ChangeAddressesHeader();

  return (
    <SettingsListWrapper>
      <Row gutter={[0, 12]}>
        <Col span="24" lg={12}>
          <Collapse
            onChange={changeNameHandler}
            bordered={false}
            activeKey={collapseActiveKey}
          >
            <SettingsListCollapsePanel
              showArrow={false}
              header={NamePanelHeader()}
              key={1}
              forceRender
            >
              <ChangeName
                changeNameHandler={changeNameSubmitHandler}
                cancelHandler={() => setCollapseActiveKey([])}
                initialValues={{
                  displayName: initialValues.displayName,
                  username: initialValues.username,
                }}
              />
            </SettingsListCollapsePanel>
          </Collapse>
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span="24" lg={12}>
          <SettingsListButton
            type="default"
            onClick={() => deleteAccountClickHandler()}
          >
            <UserDeleteOutlined />
            <span>{t('settings.deleteAccount')}</span>
          </SettingsListButton>
        </Col>
      </Row>
      <Row gutter={[0, 12]}>
        <Col span="24" lg={12}>
          <Collapse
            onChange={changeAddressesHandler}
            bordered={false}
            activeKey={collapseActiveKey}
          >
            <SettingsListCollapsePanel
              showArrow={false}
              header={AddressesPanelHeader()}
              key={2}
              forceRender
            >
              <ChangeAddresses
                changeAddressesHandler={changeAddressesSubmitHandler}
                cancelHandler={() => setCollapseActiveKey([])}
                addresses={initialValues.addresses}
              />
            </SettingsListCollapsePanel>
          </Collapse>
        </Col>
      </Row>
    </SettingsListWrapper>
  );
};

interface SettingsProps {
  changeNameSubmitHandler: Function;
  deleteAccountClickHandler: Function;
  changeAddressesSubmitHandler: Function;
  initialValues: {
    displayName: string | null;
    username: string | null;
    addresses: Record<string, IUserAddress> | undefined;
  };
}

export default SettingsList;

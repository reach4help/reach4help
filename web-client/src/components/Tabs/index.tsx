import { Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { TabPane } = Tabs;

// eslint-disable-next-line comma-spacing
const TabsComponent = <P,>({
  currentKey,
  defaultKey,
  onChange,
  tabs,
}: ITabsComponent<P>) => {
  const { t } = useTranslation();

  return (
    <StyledTabs
      activeKey={currentKey}
      defaultActiveKey={defaultKey || tabs[0].key}
      onChange={onChange}
    >
      {tabs.map(tab => (
        <StyledTabPane tab={t(tab.tKey)} key={tab.key}>
          <tab.component {...tab.props} />
        </StyledTabPane>
      ))}
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .ant-tabs-content-holder {
    display: flex;
  }
`;

const StyledTabPane = styled(TabPane)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

interface ITab<P> {
  component: React.FC<P>;
  key: string;
  tKey: string;
  props: P;
}

interface ITabsComponent<P> {
  currentKey?: string;
  defaultKey?: string;
  onChange: (activeKey: string) => void;
  tabs: ITab<P>[];
}

export default TabsComponent;

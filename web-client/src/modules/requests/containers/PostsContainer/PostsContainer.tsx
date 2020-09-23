import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { DummyAsks } from './DummyAsks';
import { DummyOffers } from './DummyOffers';

const { TabPane } = Tabs;

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

export const PostsContainer: React.FC = (): ReactElement => {
  /* Why t?? Copied from FindRequestsContainer */
  const { t } = useTranslation();
  return (
    <>
      <StyledTabs defaultActiveKey="Offer">
        <StyledTabPane
          tab={t(
            'modules.requests.containers.PostsContainer.PostsContainer.offer_tab_label',
          )}
          key="Offer"
        >
          <DummyOffers />
        </StyledTabPane>
        <StyledTabPane
          tab={t(
            'modules.requests.containers.PostsContainer.PostsContainer.ask_tab_label',
          )}
          key="Ask"
        >
          <DummyAsks />
        </StyledTabPane>
      </StyledTabs>
    </>
  );
};

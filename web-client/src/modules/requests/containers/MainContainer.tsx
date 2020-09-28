import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

// ?? complex code to use with toUrl
// import Location from 'react-app-location';
// import * as Yup from 'yup';
// const LocationObj = new Location(MainLocation, {MainLocation, type: Yup.string()});
// history.push(LocationObj.toUrl({type: activeKey}))

import { TabbedRequestsLocation } from '../constants';
import { OfferedRequestsContainer } from './OfferedRequestsContainer';
import { RequestedRequestsContainer } from './RequestedRequestsContainer';

const { TabPane } = Tabs;

const getUrlForKey = (url: string, activeKey: string) => {
  const posBeforeColon = String(url).indexOf(':') - 2;
  return String(url).substring(0, posBeforeColon) + activeKey;
};

const MainContainer: React.FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { type } = useParams() as Record<string, string>;
  const { t } = useTranslation();
  const history = useHistory();
  const onChange = (activeKey: string) => {
    history.push(getUrlForKey(TabbedRequestsLocation, activeKey));
  };
  return (
    <>
      <StyledTabs defaultActiveKey={type} onChange={onChange}>
        <StyledTabPane
          tab={t(
            'modules.requests.containers.MainContainer.MainContainer.offers_tab_label',
          )}
          key="offer"
        >
          <OfferedRequestsContainer />
        </StyledTabPane>
        <StyledTabPane
          tab={t(
            'modules.requests.containers.MainContainer.MainContainer.requests_tab_label',
          )}
          key="request"
        >
          <RequestedRequestsContainer />
        </StyledTabPane>
      </StyledTabs>
    </>
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

export default MainContainer;

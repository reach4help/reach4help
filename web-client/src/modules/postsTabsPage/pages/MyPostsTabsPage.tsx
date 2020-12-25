import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { MyPostsLocation, PostTabTypes } from '../../allMyRequests/constants';
import MyOffersContainer from '../../allMyRequests/containers/MyOffersContainer';
import MyRequestsContainer from '../../allMyRequests/containers/MyRequestsContainer';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .ant-tabs-content-holder {
    display: flex;
  }
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
`;

const StyledTabPane = styled(TabPane)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MyPostsTabsPage: React.FC = (): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const searchString = location.search;
  const searchParams = new URLSearchParams(searchString);
  const status = searchParams.get('status');

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { postType } = useParams() as Record<string, string>;
  const { t } = useTranslation();

  const onChange = (activeKey: string) => {
    const url = MyPostsLocation.toUrl({ postType: activeKey });
    history.replace(url);
  };

  return (
    <StyledTabs activeKey={postType} onChange={onChange}>
      <StyledTabPane
        tab={t('modules.requests.containers.TabbedPostPage.requests_tab_label')}
        key={PostTabTypes.requests.valueOf()}
      >
        <MyRequestsContainer status={status} />
      </StyledTabPane>

      <StyledTabPane
        tab={t('modules.requests.containers.TabbedPostPage.offers_tab_label')}
        key={PostTabTypes.offers.valueOf()}
      >
        <MyOffersContainer status={status} />
      </StyledTabPane>
    </StyledTabs>
  );
};
export default MyPostsTabsPage;

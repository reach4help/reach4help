import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ListMyPostsLocation, PostTabsType } from '../constants';
import OfferPostsContainer from '../containers/OfferPostsContainer';
import RequestPostsContainer from '../containers/RequestPostsContainer';

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

const TabbedPosts: React.FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { postType } = useParams() as Record<string, string>;
  const { t } = useTranslation();

  function onChange(activeKey: string) {
    history.replace(ListMyPostsLocation.toUrl({ postType: activeKey }));
  }

  return (
    <StyledTabs defaultActiveKey={postType} onChange={onChange}>
      <StyledTabPane
        tab={t('modules.requests.containers.TabbedPostPage.requests_tab_label')}
        key={PostTabsType.requests.valueOf()}
      >
        <RequestPostsContainer />
      </StyledTabPane>

      <StyledTabPane
        tab={t('modules.requests.containers.TabbedPostPage.offers_tab_label')}
        key={PostTabsType.offers.valueOf()}
      >
        <OfferPostsContainer />
      </StyledTabPane>
    </StyledTabs>
  );
};
export default TabbedPosts;

import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  OfferPostsLocation,
  PostsSuffixTypes,
  RequestPostsLocation,
} from '../constants';
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
  const currentKey = window.location.href.includes(OfferPostsLocation.toUrl())
    ? PostsSuffixTypes.offers
    : PostsSuffixTypes.requests;
  const { t } = useTranslation();

  function onChange(activeKey: string) {
    if (activeKey === PostsSuffixTypes.offers.valueOf()) {
      history.push(OfferPostsLocation.path);
    } else {
      history.push(RequestPostsLocation.path);
    }
  }

  return (
    <StyledTabs activeKey={currentKey.valueOf()} onChange={onChange}>
      <StyledTabPane
        tab={t('modules.requests.containers.TabbedPostPage.requests_tab_label')}
        key={PostsSuffixTypes.requests.valueOf()}
      >
        <RequestPostsContainer />
      </StyledTabPane>

      <StyledTabPane
        tab={t('modules.requests.containers.TabbedPostPage.offers_tab_label')}
        key={PostsSuffixTypes.offers.valueOf()}
      >
        <OfferPostsContainer />
      </StyledTabPane>
    </StyledTabs>
  );
};
export default TabbedPosts;

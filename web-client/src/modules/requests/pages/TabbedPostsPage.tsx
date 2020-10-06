// TODOS: ??
// ?? undo Tabs
// ?? create constants for offer and request
// ?? rename OfferAndRequestsPostsContainer
// ?? create an OfferTab container
// ?? create OfferListLocation and RequestListLoc equal to post/offer

import React, { lazy, ReactElement, Suspense } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import {
  PostListLocation,
  offersPostType,
  requestsPostType,
  OffersLocation,
  RequestsLocation,
} from '../constants';
import PostsContainer from '../containers/PostsContainer';
import { ApplicationPreference } from 'src/models/users';
import styled from 'styled-components';
// ?? why does Tabs.TabPane not work?
const { t } = useTranslation();
const { TabPane } = Tabs;
// TODO: ?? To be removed and container for request list should be used instead

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
  const { type } = useParams() as Record<string, string>;
  const history = useHistory();
  const currentKey = window.location.href === OffersLocation? offersPostType : requestsPostType; 

  function onChange (activeKey: string) {
    history.push(PostListLocation.toUrl({ type: activeKey }));
  };


  return (
    <StyledTabs
      activeKey={currentKey}
      onChange={onChange}
    >
      <StyledTabPane
            tab={t(
              'modules.requests.containers.TabbedPostPage.requests_tab_label',
            )}
            key="requests"
          >
      </StyledTabPane>
      <StyledTabPane
            tab={t(
              'modules.requests.containers.TabbedPostPage.offers_tab_label',
            )}
            key="offers"
          >
      </StyledTabPane>
    </StyledTabs>
  );

};
export default TabbedPosts;
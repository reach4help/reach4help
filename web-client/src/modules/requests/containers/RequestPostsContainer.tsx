import React from 'react';

import { PostTabsType } from '../constants';
import PostsContainer from './PostsContainer';

const RequestPostsContainer: React.FC = () => (
  <PostsContainer postType={PostTabsType.requests} />
);

export default RequestPostsContainer;

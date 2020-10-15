import React from 'react';

import { PostTabsType } from '../constants';
import PostsContainer from './PostsContainer';

const OfferPostsContainer: React.FC = () => (
  <PostsContainer postType={PostTabsType.offers} />
);

export default OfferPostsContainer;

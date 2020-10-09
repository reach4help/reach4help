import React from 'react';

import { PostsSuffixTypes } from '../constants';
import PostsContainer from './PostsContainer';

const OfferPostsContainer: React.FC = () => (
  <PostsContainer postType={PostsSuffixTypes.offers} />
);

export default OfferPostsContainer;

import React from 'react';

import { PostsSuffixTypes } from '../constants';
import PostsContainer from './PostsContainer';

const RequestPostsContainer: React.FC = () => (
  <PostsContainer postType={PostsSuffixTypes.requests} />
);

export default RequestPostsContainer;

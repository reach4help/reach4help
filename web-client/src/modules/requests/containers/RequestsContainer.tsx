import React from 'react';
import PostsContainer from './PostsContainer';
import { requestsPostType} from '../constants';

const RequestsContainer: React.FC = () => (
  <PostsContainer
    postType={ requestsPostType }
  />
);

export default RequestsContainer;



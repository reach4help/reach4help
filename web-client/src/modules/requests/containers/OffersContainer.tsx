import React from 'react';
import PostsContainer from './PostsContainer';
import { offersPostType} from '../constants';

const OffersContainer: React.FC = () => (
  <PostsContainer
    postType={ offersPostType }
  />
);

export default OffersContainer;



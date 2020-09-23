import React, { ReactElement } from 'react';
/* ?? see note below import { useParams } from 'react-router-dom'; */
import { PostsContainer } from 'src/modules/requests/containers/PostsContainer/PostsContainer';

const PostsRoute: React.FC = (): ReactElement => (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  /* ?? maybe this will be needed - ask or offer - const { type } = useParams() as Record<string, string>; */
  <PostsContainer />
);

export default PostsRoute;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observeMyRequests } from 'src/ducks/myRequests2/actions';
import { MyRequestsState } from 'src/ducks/myRequests2/types';
import { ProfileState } from 'src/ducks/profile/types';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import PostList from '../components/GeneralPostList';
import Header from '../components/Header';

const RequestPostsContainer: React.FC<{ status: string | null }> = ({
  status,
}) => {
  const dispatch = useDispatch();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const myRequests = useSelector(
    ({ myRequestReducer }: { myRequestReducer: MyRequestsState }) =>
      myRequestReducer.myRequests,
  );

  useEffect(() => {
    if (profileState.userRef) {
      observeMyRequests(dispatch, {
        status,
        userRef: profileState.userRef,
      });
    }
  }, [dispatch, status, profileState.userRef]);

  if (myRequests.loading) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <Header numRequests={Object.keys(myRequests.data || {}).length} />
      <PostList
        posts={myRequests.data}
        loading={myRequests && myRequests.loading}
      />
    </>
  );
};

export default RequestPostsContainer;

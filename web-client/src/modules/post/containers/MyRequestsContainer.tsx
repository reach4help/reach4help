import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observeMyRequests } from 'src/ducks/MyRequests/actions';
import { MyRequestsState } from 'src/ducks/MyRequests/types';
import { ProfileState } from 'src/ducks/profile/types';
import { observeGetMyRequests } from 'src/ducks/PublicRequests/actions';
import { RequestState } from 'src/ducks/PublicRequests/types';
import {
  MyRequestPostsStatusAllUrl,
  MyRequestPostsStatusClosedUrl,
  MyRequestPostsStatusOnGoingUrl,
  MyRequestPostsStatusOpenUrl,
} from 'src/modules/myRequests/constants';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../components/Modals/OneTimeModal';
import FilterByDropDownMenu from '../components/FilterByDropDownMenu';
import PostList from '../components/PublicPostList';

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
      <FilterByDropDownMenu
        type="requests"
        allPath={MyRequestPostsStatusAllUrl}
        openPath={MyRequestPostsStatusOpenUrl}
        onGoingPath={MyRequestPostsStatusOnGoingUrl}
        closedPath={MyRequestPostsStatusClosedUrl}
      />
      <PostList
        posts={myRequests.data}
        loading={myRequests && myRequests.loading}
      />
    </>
  );
};

export default RequestPostsContainer;

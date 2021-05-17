import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observeMyOffers } from 'src/ducks/myOffers2/actions';
import { MyOffersState } from 'src/ducks/myOffers2/types';
import { ProfileState } from 'src/ducks/profile/types';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import GeneralPostsList from '../components/GeneralPostList';
import Header from '../components/Header';

const RequestPostsContainer: React.FC<{ status: string | null }> = ({
  status,
}) => {
  const dispatch = useDispatch();

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const myOffers = useSelector(
    ({ myOfferReducer }: { myOfferReducer: MyOffersState }) =>
      myOfferReducer.myOffers,
  );
  useEffect(() => {
    if (profileState.userRef) {
      observeMyOffers(dispatch, { status, userRef: profileState.userRef });
    }
  }, [dispatch, profileState.userRef, status]);

  if (myOffers.loading) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <Header numRequests={Object.keys(myOffers.data || {}).length} />
      <GeneralPostsList
        posts={myOffers.data}
        loading={myOffers && myOffers.loading}
      />
    </>
  );
};

export default RequestPostsContainer;

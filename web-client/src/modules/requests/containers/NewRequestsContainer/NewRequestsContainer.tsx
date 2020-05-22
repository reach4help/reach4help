import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { updateUserPrivilegedInformation } from '../../../../ducks/profile/actions';
import { ProfileState } from '../../../../ducks/profile/types';
import { setRequest } from '../../../../ducks/requests/actions';
import { IUser } from '../../../../models/users';
import NewRequest from '../../components/NewRequest/NewRequest';

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const NewRequestsContainer: React.FC = () => {
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const dispatch = useDispatch();

  const newRequestSubmitHandler = (
    title: string,
    body: string,
    sendNotifications: boolean,
  ) => {
    if (
      profileState.profile &&
      profileState.userRef &&
      profileState.privilegedInformation
    ) {
      dispatch(
        setRequest({
          title,
          description: body,
          pinUserRef: profileState.userRef,
          pinUserSnapshot: profileState.profile.toObject() as IUser,
          latLng: profileState.privilegedInformation.address.coords,
        }),
      );
    }

    if (profileState.uid && profileState.privilegedInformation) {
      profileState.privilegedInformation.sendNotifications =
        sendNotifications === true;
      dispatch(
        updateUserPrivilegedInformation(
          profileState.uid,
          profileState.privilegedInformation,
        ),
      );
    }
  };

  const onCancel = () => (
    <RequestDetails>
      <div>Request review component</div>
    </RequestDetails>
  );
  return (
    <>
      <RequestDetails>
        <NewRequest
          createRequest={newRequestSubmitHandler}
          onCancel={onCancel}
        />
      </RequestDetails>
    </>
  );
};

NewRequestsContainer.propTypes = {};

export default NewRequestsContainer;

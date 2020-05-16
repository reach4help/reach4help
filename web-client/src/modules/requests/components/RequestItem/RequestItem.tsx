import { Button } from 'antd';
import React, { useState } from 'react';
import { Request } from 'src/models/requests';
import styled, { keyframes } from 'styled-components';

import avgRating from '../../assets/pinAverageRating.svg';
import defaultUserPic from '../../assets/role_pin.png';

const Item = styled.div`
  overflow: auto;
  margin: 15px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
`;

const Text = styled.div`
  float: left;
  font-family: Segoe UI;
  color: rgba(0, 0, 0, 0.65);
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const StyledText = styled.p`
  margin-bottom: 3px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const UserPic = styled.img`
  float: left;
  width: 56px;
  height: 56px;
  margin: 5px;
  border-radius: 105px;
  animation: ${fadeIn} 0.75s;
`;

const StyledButton = styled(Button)`
  margin: 15px;
  border-radius: 4px;
`;

const UserDetails = styled.div`
  display: inline-block;
  margin-left: 15px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export interface RequestItemProps {
  request: Request;
  handleRequest: (action?: boolean) => void;
  isCavAndOpenRequest: boolean;
}

const RequestItem: React.FC<RequestItemProps> = ({
  request,
  handleRequest,
  isCavAndOpenRequest,
}): React.ReactElement => {
  const [displayDetails, toggleDetails] = useState(false);

  const handleRequestClick = () => {
    if (isCavAndOpenRequest) {
      toggleDetails(true);
    } else {
      handleRequest();
    }
  };

  if (displayDetails) {
    return (
      <Item>
        <div
          onClick={() => toggleDetails(false)}
          style={{ marginBottom: '15px' }}
        >
          <UserPic
            src={request.pinUserSnapshot.displayPicture || defaultUserPic}
            alt="Profile pic"
          />
          <UserDetails>
            <StyledText style={{ fontSize: '18px' }}>
              {request.pinUserSnapshot.displayName}
            </StyledText>
            <div style={{ display: 'flex' }}>
              <StyledIcon src={avgRating} />
              <StyledText>{request.pinUserSnapshot.averageRating}</StyledText>
            </div>
          </UserDetails>
        </div>
        <hr style={{ margin: '5px' }} />
        <Text>
          <StyledTitle>{request.title}</StyledTitle>
          <StyledText>{request.description}</StyledText>
          <StyledButton onClick={() => handleRequest(false)}>
            Cannot Help
          </StyledButton>
          <StyledButton
            style={{
              background: '#52C41A',
              color: '#FFFFFF',
            }}
            onClick={() => handleRequest(true)}
          >
            Help {request.pinUserSnapshot.displayName}
          </StyledButton>
        </Text>
      </Item>
    );
  }

  return (
    <Item onClick={handleRequestClick}>
      <Text
        style={{
          width: '70%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <StyledTitle>{request.title}</StyledTitle>
        <StyledText>{request.description}</StyledText>
      </Text>
      <UserPic
        style={{ float: 'right' }}
        src={request.pinUserSnapshot.displayPicture || defaultUserPic}
        alt="Profile pic"
      />
    </Item>
  );
};

export default RequestItem;

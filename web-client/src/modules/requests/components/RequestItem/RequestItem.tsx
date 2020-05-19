import { Button, Col, Row } from 'antd';
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
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.65);
  padding: 5px;
`;

const StyledTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const StyledText = styled.p`
  margin-bottom: 3px;
  font-family: Roboto, sans-serif;
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
  object-fit: cover;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserDetails = styled.div`
  display: inline-block;
  margin-left: 15px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
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
          <UserDetails style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
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
          <StyledTitle style={{ color: 'rgba(0, 0, 0, 1)' }}>
            {request.title}
          </StyledTitle>
          <StyledText
            style={{
              color: 'rgba(0, 0, 0, 0.85)',
              marginBottom: '20px',
            }}
          >
            {request.description}
          </StyledText>
          <Row>
            <Col span={11}>
              <StyledButton onClick={() => handleRequest(false)}>
                Cannot Help
              </StyledButton>
            </Col>
            <Col span={11} offset={2}>
              <StyledButton
                style={{
                  background: '#52C41A',
                  color: '#FFFFFF',
                }}
                onClick={() => handleRequest(true)}
              >
                Help {request.pinUserSnapshot.displayName}
              </StyledButton>
            </Col>
          </Row>
        </Text>
      </Item>
    );
  }

  return (
    <Item onClick={handleRequestClick}>
      <Text
        style={{
          width: '75%',
          whiteSpace: 'nowrap',
        }}
      >
        <StyledTitle
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'rgba(0, 0, 0, 0.65)',
          }}
        >
          {request.title}
        </StyledTitle>
        <StyledText
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {request.description}
        </StyledText>
      </Text>
      <UserPic
        style={{
          float: 'right',
        }}
        src={request.pinUserSnapshot.displayPicture || defaultUserPic}
        alt="Profile pic"
      />
    </Item>
  );
};

export default RequestItem;

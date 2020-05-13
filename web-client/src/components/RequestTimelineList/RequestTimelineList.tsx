import React from 'react';
import styled, { css } from 'styled-components';

import { ApplicationPreference } from '../../models/users';

const RequestTimelineListItem: React.FC<RequestTimelineListItemProps> = ({
  item,
  align,
}) => {
  const isCav = item.user.applicationPreference === ApplicationPreference.cav;

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <>
      <Header>{date}</Header>
      <StyledListItem className={align}>
        {isCav ? (
          <CavBullet className="bullet" />
        ) : (
          <PinBullet className="bullet" />
        )}
        <MessageBox className={`message-box ${isCav ? 'cav' : 'pin'}`}>
          Cav request itemCav request item
        </MessageBox>
      </StyledListItem>
    </>
  );
};

const RequestTimelineList: React.FC<RequestTimelineListProps> = ({
  items,
  currentUser,
}) => (
  <StyledList>
    <Line />
    {items.map((item, index) => (
      <RequestTimelineListItem
        key={index}
        item={item}
        align={item.user === currentUser ? 'left' : 'right'}
      />
    ))}
  </StyledList>
);

const StyledListItem = styled.li`
  position: relative;
  width: 50%;
  margin-left: 0;
  display: inline-block;

  &.left {
    margin-left: 0;

    .bullet {
      right: -7px;
    }

    .message-box {
      text-align: right;
    }
  }

  &.right {
    margin-left: auto;

    .bullet {
      left: -7px;
    }
  }
`;

const Header = styled.div`
  background: #f0f2f5;
  z-index: 1;
  text-align: center;
  margin: 0;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.45);
`;

const Bullet = css`
  position: absolute;
  top: 20px;
`;

const PinBullet = styled.span`
  ${Bullet}
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: red;
`;

const CavBullet = styled.span`
  ${Bullet}
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: blue;
`;

const MessageBox = styled.div`
  padding: 5px 7px;
  margin: 10px;
  border-radius: 4px;

  &.pin {
    background: rgba(255, 123, 2, 0.05);
  }

  &.cav {
    background: rgba(129, 30, 120, 0.05);
  }
`;

const StyledList = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

// TODO use global colors
const Line = styled.div`
  position: absolute;
  align-self: center;
  width: 3px;
  background: rgba(0, 0, 0, 0.05);
  height: 100%;
`;

interface RequestTimelineListProps {
  items: any;
  currentUser: any;
}

interface RequestTimelineListItemProps {
  item: any;
  align: 'left' | 'right';
}

export default RequestTimelineList;

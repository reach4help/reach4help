import moment from 'moment';
import React from 'react';
import CavBulletIcon from 'src/assets/cav-bullet.svg';
import PinBulletIcon from 'src/assets/pin-bullet.svg';
import { TimelineItem } from 'src/models/requests/timeline';
import styled from 'styled-components';

import { ApplicationPreference, User } from '../../../../models/users';

// TODO use i18n
const MESSAGE_TEXTS = {
  CREATE_REQUEST: 'Pin created this request.',
  CANCEL_REQUEST: 'Pin closed this request.',
  REMOVE_REQUEST: 'Cav removed this request',
  COMPLETE_REQUEST: 'Cav finished this request.',
  CREATE_OFFER: 'Cav accepted this request.',
  ACCEPT_OFFER: 'Pin accepted Cav help.',
  REJECT_OFFER: 'Pin rejected Cav help.',
  RATE_PIN: 'Cav rated pin.',
  RATE_CAV: 'Pin rated cav.',
};

const RequestTimelineListItem: React.FC<RequestTimelineListItemProps> = ({
  item,
  align,
}) => {
  const isCavItem =
    item.actorSnapshot.applicationPreference === ApplicationPreference.cav;
  const date = new Date(item.createdAt.toDate());
  const dateString = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  return (
    <>
      {/* TODO group items by date, then only render once heading date */}
      <HeadingDate>{dateString}</HeadingDate>
      <StyledListItem className={align}>
        <ListItemBullet src={isCavItem ? CavBulletIcon : PinBulletIcon} />
        <MessageBox className={`message-box ${isCavItem ? 'cav' : 'pin'}`}>
          {MESSAGE_TEXTS[item.action]}
          <TimeAgo>{moment(date).fromNow()}</TimeAgo>
        </MessageBox>
      </StyledListItem>
    </>
  );
};

const TimelineList: React.FC<RequestTimelineListProps> = ({
  items,
  currentUser,
}) => (
  <>
    <Title>Request Timeline</Title>
    <StyledList>
      <VerticalSeparator />
      {items.map((item, index) => (
        <RequestTimelineListItem
          key={index}
          item={item}
          align={item.actorRef.id === currentUser.id ? 'right' : 'left'}
        />
      ))}
    </StyledList>
  </>
);

const StyledListItem = styled.li`
  display: inline-block;
  width: 50%;
  position: relative;
  margin-bottom: 10px;

  &.left {
    margin-left: 0;

    img {
      right: -6px;
    }

    .message-box {
      float: right;
      text-align: right;
    }
  }

  &.right {
    margin-left: auto;

    img {
      left: -6px;
    }

    .message-box {
      float: left;
      text-align: left;
    }
  }
`;

const ListItemBullet = styled.img`
  position: absolute;
  top: 20px;
`;

const HeadingDate = styled.div`
  padding: 10px;
  background: #f0f2f5;
  z-index: 1;
  text-align: center;
  margin: 0;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.45);
`;

const TimeAgo = styled.span`
  position: absolute;
  right: 5px;
  bottom: -18px;
  font-size: 12px;
  text-align: right;
  color: rgba(0, 0, 0, 0.25);
`;

const MessageBox = styled.div`
  display: inline-block;
  position: relative;
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

// TODO use global theme colors
const VerticalSeparator = styled.div`
  position: absolute;
  align-self: center;
  width: 3px;
  background: rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 20px;
  font-size: 1.2rem;
`;

interface RequestTimelineListProps {
  items: TimelineItem[];
  currentUser: firebase.firestore.DocumentReference<User>;
}

interface RequestTimelineListItemProps {
  item: TimelineItem;
  align: 'left' | 'right';
}

export default TimelineList;

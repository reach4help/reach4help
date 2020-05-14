import { Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import CavBulletIcon from 'src/assets/cav-bullet.svg';
import PinBulletIcon from 'src/assets/pin-bullet.svg';
import { TimelineItemAction } from 'src/models/requests/timeline';
import styled from 'styled-components';

import { ApplicationPreference } from '../../models/users';

const { Text } = Typography;

// TODO use i18n
const renderMessageTextFor = action => {
  let text = '';
  switch (action) {
    case TimelineItemAction.CREATE_REQUEST:
      text = 'Pin created this request.';
      break;
    case TimelineItemAction.CANCEL_REQUEST:
      text = 'Pin closed this request.';
      break;
    case TimelineItemAction.REMOVE_REQUEST:
      text = 'Cav removed this request';
      break;
    case TimelineItemAction.COMPLETE_REQUEST:
      text = 'Cav finished this request.';
      break;
    case TimelineItemAction.CREATE_OFFER:
      text = 'Cav accepted this request.';
      break;
    case TimelineItemAction.ACCEPT_OFFER:
      text = 'Pin accepted Cav help';
      break;
    case TimelineItemAction.REJECT_OFFER:
      text = 'Pin rejected Cav help';
      break;
    case TimelineItemAction.RATE_PIN:
      text = 'Cav rated pin.';
      break;
    case TimelineItemAction.RATE_CAV:
      text = 'Pin rated cav.';
      break;
    default:
      text = 'Something went wrong!';
      break;
  }

  return <Text>{text}</Text>;
};

const RequestTimelineListItem: React.FC<RequestTimelineListItemProps> = ({
  item,
  align,
}) => {
  const isCavItem =
    item.actor.applicationPreference === ApplicationPreference.cav;
  const date = new Date(item.createdAt);
  const dateString = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  return (
    <>
      <HeadingDate>{dateString}</HeadingDate>
      <StyledListItem className={align}>
        <ListItemBullet src={isCavItem ? CavBulletIcon : PinBulletIcon} />
        <MessageBox className={`message-box ${isCavItem ? 'cav' : 'pin'}`}>
          {renderMessageTextFor(item.action)}
          <TimeAgo>{moment(date).fromNow()}</TimeAgo>
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
    <VerticalSeperator />
    {items.map((item, index) => (
      <RequestTimelineListItem
        key={index}
        item={item}
        align={item.actor === currentUser ? 'right' : 'left'}
      />
    ))}
  </StyledList>
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

// TODO use global colors
const VerticalSeperator = styled.div`
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

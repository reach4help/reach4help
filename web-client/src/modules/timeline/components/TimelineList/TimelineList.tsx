import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CavBulletIcon from 'src/assets/cav-bullet.svg';
import PinBulletIcon from 'src/assets/pin-bullet.svg';
import { TimelineItem } from 'src/models/requests/timeline';
import styled from 'styled-components';

import { ApplicationPreference, User } from '../../../../models/users';

const RequestTimelineListItem: React.FC<RequestTimelineListItemProps> = ({
  item,
  isCurrentUserItem,
}) => {
  const { t } = useTranslation();

  const align = isCurrentUserItem ? 'right' : 'left';
  const isCavItem =
    item.actorSnapshot.applicationPreference === ApplicationPreference.cav;
  const date = new Date(item.createdAt.toDate());
  const dateString = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  const pinUserName = item.requestSnapshot.pinUserSnapshot.displayName;
  const cavUserName =
    item.offerSnapshot?.cavUserSnapshot.displayName ||
    item.requestSnapshot.cavUserSnapshot?.displayName;
  const { pinRating, cavRating } = item.requestSnapshot;
  const messagePlaceholders = {
    actorName: isCurrentUserItem
      ? 'You'
      : isCavItem
      ? cavUserName
      : pinUserName,
    pinUserName: isCurrentUserItem && !isCavItem ? 'your' : pinUserName,
    cavUserName: isCurrentUserItem && isCavItem ? 'your' : cavUserName,
    pinRating,
    cavRating,
  };

  return (
    <>
      {/* TODO group items by date, then only render once heading date */}
      <HeadingDate>{dateString}</HeadingDate>
      <StyledListItem className={align}>
        <ListItemBullet src={isCavItem ? CavBulletIcon : PinBulletIcon} />
        <MessageBox className={`message-box ${isCavItem ? 'cav' : 'pin'}`}>
          {t(`timeline.${item.action}`, messagePlaceholders)}
          <TimeAgo>{moment(date).fromNow()}</TimeAgo>
        </MessageBox>
      </StyledListItem>
    </>
  );
};

const TimelineList: React.FC<RequestTimelineListProps> = ({
  items,
  currentUser,
}) => {
  const sortedItemsByDate = items.sort(
    (a: TimelineItem, b: TimelineItem) =>
      a.createdAt.toMillis() - b.createdAt.toMillis(),
  );
  return (
    <Wrapper>
      <Title>Request Timeline</Title>
      <StyledList>
        <VerticalSeparator />
        {sortedItemsByDate.map((item, index) => (
          <RequestTimelineListItem
            key={index}
            item={item}
            isCurrentUserItem={item.actorRef.id === currentUser.id}
          />
        ))}
      </StyledList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  flex: auto;
  overflow: scroll;
  padding-bottom: 64px;
`;

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
  background: white;
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
  text-align: center;
`;

interface RequestTimelineListProps {
  items: TimelineItem[];
  currentUser: firebase.firestore.DocumentReference<User>;
}

interface RequestTimelineListItemProps {
  item: TimelineItem;
  isCurrentUserItem: boolean;
}

export default TimelineList;

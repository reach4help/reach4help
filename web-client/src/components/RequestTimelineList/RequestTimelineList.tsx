import React from 'react';
import styled, { css } from 'styled-components';

const renderMessageBox = (align, text) => {
  const textAlign = align === 'left' ? 'right' : 'left';
  const float = align === 'left' ? 'right' : 'left';
  const marginLeft = align === 'left' ? '0' : 'auto';

  return (
    <>
      {align === 'left' ? (
        <MessagePin style={{ textAlign, float, marginLeft }}>
          {align === 'left' ? <PointerPin /> : <PointerCav />}
          {text}
        </MessagePin>
      ) : (
        <MessageCav style={{ textAlign, float }}>
          {align === 'left' ? <PointerPin /> : <PointerCav />}
          {text}
        </MessageCav>
      )}
    </>
  );
};

const RequestTimelineListItem: React.FC<RequestTimelineListItemProps> = ({
  item,
}) => (
  <>
    <p
      style={{
        background: '#f0f2f5',
        zIndex: 1,
        textAlign: 'center',
        margin: 0,
        fontSize: '0.8rem',
        color: 'rgba(0, 0, 0, 0.45)',
      }}
    >
      30 May 2020
    </p>
    <li
      style={{
        marginLeft: item?.align === 'left' ? '0' : 'auto',
        width: '50%',
      }}
    >
      {renderMessageBox(item?.align, 'Blanche created this request')}
    </li>
  </>
);

const RequestTimelineList: React.FC<RequestTimelineListProps> = ({ items }) => (
  <StyledList>
    <Line />
    {items.map((item, index) => (
      <RequestTimelineListItem key={index} item={item} />
    ))}
  </StyledList>
);

const Pointer = css`
  position: absolute;
  top: 12px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
`;

// TODO use global colors
const PointerPin = styled.span`
  ${Pointer}
  // -margin-right - markerW / 2 = -10 - 7
  right: -17px;
  background: red;
`;

// TODO use global colors
const PointerCav = styled.span`
  ${Pointer}
  // -margin-left - markerW / 2 = -10 - 7
  left: -17px;
  background: blue;
`;

const MessageBox = css`
  position: relative;
  padding: 5px 7px;
  margin: 10px;
  display: inline-block;
  border-radius: 4px;
`;

// TODO use global colors
const MessagePin = styled.div`
  ${MessageBox}
  background: rgba(255, 123, 2, 0.05);
`;

// TODO use global colors
const MessageCav = styled.div`
  ${MessageBox}
  background: rgba(129, 30, 120, 0.05);
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
}

interface RequestTimelineListItemProps {
  item: any;
}

export default RequestTimelineList;

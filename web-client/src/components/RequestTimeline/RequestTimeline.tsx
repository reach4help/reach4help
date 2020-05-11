import { StarOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import RatingSlider from '../RatingSlider/RatingSlider';
import RequestTimelineList from '../RequestTimelineList/RequestTimelineList';

const { Text } = Typography;

const RequestTimeline: React.FC<RequestTimelineProps> = () => {
  const [rating, setRating] = useState<number | [number, number]>(0);
  const handleRatingSubmit = () => alert(`Rating submitted: ${rating}`);

  return (
    <Wrapper>
      <Title>Request Timeline</Title>
      <RequestTimelineList items={[{ align: 'left' }, { align: 'right' }]} />
      <Actions>
        <>
          <RatingMessage>
            {/* TODO use translation */}
            How would you rate your experience with Daniel Wade?
          </RatingMessage>
          <RatingSlider
            selected={rating}
            onChangeHandler={value => setRating(value)}
          />
          <ActionButtons>
            <ActionButton className="btn-green" onClick={handleRatingSubmit}>
              <StarOutlined />
              Submit Rating
            </ActionButton>
          </ActionButtons>
          {/* <ActionButton onClick={() => alert('cancel request')}> */}
          {/*  Cancel Request */}
          {/* </ActionButton> */}
          {/* <ActionButton onClick={() => alert('finish request')}> */}
          {/*  Finish Request */}
          {/* </ActionButton> */}
        </>
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  padding-top: 20px;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 1.2rem;
`;

const RatingMessage = styled(Text)``;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;

  button {
    border: 1px solid #d9d9d9;
    background: white;
    outline: none;

    svg {
      margin-right: 5px;
      font-size: 0.8rem;
    }
  }

  .btn-green {
    border: none;
    color: white;
    background: #52c41a;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  margin: 0 10px;
  border-radius: 4px;
`;

interface RequestTimelineProps {
  some?: string;
}

export default RequestTimeline;

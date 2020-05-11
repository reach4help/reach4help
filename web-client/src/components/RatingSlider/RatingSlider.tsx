import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import React from 'react';
import styled from 'styled-components';

const RatingSlider: React.FC<RatingSliderProps> = ({
  selected,
  onChangeHandler,
  disabled = false,
}) => {
  const markOptions = (key: number, active: boolean) => ({
    style: { fontSize: '28px' },
    label: active ? (
      <StarFilled style={{ color: '#FFCB52' }} />
    ) : (
      <StarOutlined style={{ color: '#DADADA' }} />
    ),
  });

  const marks = [1, 2, 3, 4, 5].reduce((object, key) => {
    // eslint-disable-next-line no-param-reassign
    object[key] = markOptions(key, key <= selected);
    return object;
  }, {});

  return (
    <StarSlider
      marks={marks}
      defaultValue={[1, 5]}
      min={1}
      max={5}
      onChange={value => onChangeHandler(value)}
      disabled={disabled}
    />
  );
};

const StarSlider = styled(Slider)`
  width: 100%;
  max-width: 150px;
  margin: 0;
  margin-bottom: 35px;

  .ant-slider-mark {
    top: 0;
  }

  .ant-slider-mark-text .ant-slider-mark-text-active {
    color: black;
    font-size: 25px;
  }

  .ant-slider-rail,
  .ant-slider-track,
  .ant-slider-handle,
  .ant-slider-step {
    display: none;
  }
`;

interface RatingSliderProps {
  selected: number | [number, number];
  onChangeHandler: (value: number | [number, number]) => void;
  disabled?: boolean;
}

export default RatingSlider;

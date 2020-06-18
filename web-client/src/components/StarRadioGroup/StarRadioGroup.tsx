import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const StarRadioGroup: React.FC<StarRadioGroupProps> = ({
  name = 'star-radio-group',
  rating,
  handleChange,
}) => {
  const [value, setValue] = React.useState(rating || 0);

  const ratingLevels = [1, 2, 3, 4, 5];

  const onChange: (e: RadioChangeEvent) => void = e => {
    setValue(e.target.value);
    handleChange(e.target.value);
  };

  return (
    <RadioGroup name={name} onChange={onChange} value={value}>
      {ratingLevels.map(ratingLevel => (
        <Radio key={ratingLevel} value={ratingLevel}>
          {ratingLevel <= value ? <FilledStar /> : <EmptyStar />}
        </Radio>
      ))}
    </RadioGroup>
  );
};

const RadioGroup = styled(Radio.Group)`
  .ant-radio {
    position: fixed;
    opacity: 0;
  }
`;

const FilledStar = styled(StarFilled)`
  color: ${COLORS.secondaryLight};
  font-size: 20px;
`;

const EmptyStar = styled(StarOutlined)`
  font-size: 20px;
`;

interface StarRadioGroupProps {
  name?: string;
  rating: number | null;
  handleChange: (value: number) => void;
}

export default StarRadioGroup;

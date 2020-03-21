import React from 'react';
import styled from 'styled-components';
import { Filter } from 'src/data';

interface Props {
  className?: string;
  filter: Filter;
}

const Map = (props: Props) => {
  const {className, filter} = props;
  return (
    <div className={className}>
      MAP Filter:
      {filter.service}
    </div>
  );
}

export default styled(Map)`
  flex-grow: 1;
  background: #f99;
  font-size: 70px;
  text-align: center;
`;

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const Results = (props: Props) => {
  const {className} = props;
  return (
    <div className={className}>
      Results
    </div>
  );
}

export default styled(Results)`
  width: 400px;
  background: #9f9;
  font-size: 70px;
  text-align: center;
`;


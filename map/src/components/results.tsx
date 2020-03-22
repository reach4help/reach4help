import React from 'react';
import styled from 'styled-components';
import { MarkerInfo } from 'src/data/markers';

interface Props {
  className?: string;
  results: MarkerInfo[];
}

const Results = (props: Props) => {
  const { className, results} = props;
  return (
    <div className={className}>
      {results.map((result, index) => (
        <div key={index} className="result">
          <div>{index + 1}</div>
          <div>{result.contentTitle}</div>
        </div>
      ))}
    </div>
  );
}

export default styled(Results)`
  width: 400px;
  background: #9f9;
`;


import React from 'react';
import styled from 'styled-components';
import { MarkerInfo } from 'src/data/markers';
import { SelectMarkerCallback } from './map';

interface Props {
  className?: string;
  results: MarkerInfo[];
  selectMarkerCallback: SelectMarkerCallback;
}

const Results = (props: Props) => {
  const { className, results, selectMarkerCallback } = props;
  return (
    <div className={className}>
      {results.map((result, index) => (
        <div
          key={index}
          className="result"
          onClick={
            selectMarkerCallback ? () => selectMarkerCallback(index) : undefined
          }
        >
          <div>{index + 1}</div>
          <div>{result.contentTitle}</div>
        </div>
      ))}
    </div>
  );
};

export default styled(Results)`
  width: 400px;
  background: #9f9;
`;

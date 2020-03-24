import React from 'react';
import { MarkerInfo } from 'src/data/markers';
import styled from '../styling';
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
  overflow-y: scroll;
  background: #9f9;
`;

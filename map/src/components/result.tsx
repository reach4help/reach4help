import React from 'react';
import { MarkerIdAndInfo } from 'src/components/map';

import styled from '../styling';
import MarkerType from './marker-type';

interface Props {
  result: MarkerIdAndInfo | null;
  index: number;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
}

const Div = styled('div')`
  color: ${p => p.theme.textColor};
  border-bottom: ${p => p.theme.borderLight};
  padding: ${p => p.theme.spacingPx}px;
  display: flex;
  align-items: start;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${p => p.theme.colors.grayLight5};

    .location {
      color: ${p => p.theme.textColorLight};
    }
  }

  .number {
    color: ${p => p.theme.textColor};
    font-size: 20px;
    font-weight: 600;
    margin-right: ${p => p.theme.spacingPx}px;

    [dir='rtl'] & {
      margin: 0 0 0 ${p => p.theme.spacingPx}px;
    }
  }

  .location {
    color: ${p => p.theme.textColorLight};
    font-size: 0.9rem;
    margin-bottom: ${p => p.theme.spacingPx / 2}px;
  }
`;

class Result extends React.PureComponent<Props, {}> {
  public render() {
    const { result, index, setSelectedResult } = this.props;
    return (
      <Div key={index} onClick={() => setSelectedResult(result)}>
        <div className="number">{index + 1}</div>
        <div className="info">
          {result?.info.loc.description && (
            <div className="location">{result.info.loc.description}</div>
          )}
          <div className="name">{result?.info.contentTitle}</div>
          <MarkerType type={result?.info.type} />
        </div>
      </Div>
    );
  }
}
export default Result;

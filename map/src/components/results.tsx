import React from 'react';
import { MarkerInfo } from 'src/data/markers';
import styled from '../styling';
import { SelectMarkerCallback } from './map';

interface Props {
  className?: string;
  results: MarkerInfo[] | null;
  selectMarkerCallback: SelectMarkerCallback;
}

const Results = (props: Props) => {
  const { className, results, selectMarkerCallback } = props;
  return (
    <div className={className}>
      <div className="header">{`${(results || []).length} results`}</div>
      <div className="list">
        {(results || []).map((result, index) => (
          <div
            key={index}
            className="result"
            onClick={
              selectMarkerCallback
                ? () => selectMarkerCallback(index)
                : undefined
            }
          >
            <div className="number">{index + 1}</div>
            <div className="info">
              {result.loc.description && (
                <div className="location">{result.loc.description}</div>
              )}
              <div className="name">{result.contentTitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default styled(Results)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;

  > .header {
    padding: ${p => p.theme.spacingPx}px;
    background: ${p => p.theme.bg};
    border-bottom: ${p => p.theme.borderLight};
    border-top: ${p => p.theme.borderLight};
  }

  > .list {
    overflow-y: scroll;
    height: 0;
    flex-grow: 1;

    > .result {
      color: ${p => p.theme.textColor};
      border-bottom: ${p => p.theme.borderLight};
      padding: ${p => p.theme.spacingPx}px;
      display: flex;
      align-items: start;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background: ${p => p.theme.colors.grayLight3};

        .location {
          color: ${p => p.theme.textColorLight};
        }
      }

      .number {
        color: ${p => p.theme.colors.red};
        font-size: 20px;
        font-weight: 600;
        margin-right: ${p => p.theme.spacingPx}px;
      }

      .location {
        color: ${p => p.theme.textColorExtraLight};
        font-size: 0.9rem;
        margin-bottom: ${p => p.theme.spacingPx / 2}px;
      }
    }
  }
`;

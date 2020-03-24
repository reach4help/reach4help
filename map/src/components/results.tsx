import React from 'react';
import { MarkerInfo } from 'src/data/markers';
import { button } from 'src/styling/mixins';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import styled from '../styling';
import Services from './services';

interface Props {
  className?: string;
  results: MarkerInfo[] | null;
  nextResults: MarkerInfo[] | null;
  updateResults: () => void;
  selectedResult: MarkerInfo | null;
  setSelectedResult: (selectedResult: MarkerInfo | null) => void;
}

const Results = (props: Props) => {
  const {
    className,
    results,
    nextResults,
    updateResults,
    selectedResult,
    setSelectedResult,
  } = props;
  const selectedResultVisible = selectedResult ? 'visible' : '';
  return (
    <div className={className}>
      <div className="header">
        <button
          className={`back ${selectedResultVisible}`}
          onClick={() => setSelectedResult(null)}
          type="button"
        >
          <MdKeyboardArrowLeft size={24} />
        </button>
        <span>{`${(results || []).length} results`}</span>
        {nextResults !== results && (
          <button className="update" onClick={updateResults} type="button">
            Update results for current area
          </button>
        )}
      </div>
      <div className="list">
        {(results || []).map((result, index) => (
          <div
            key={index}
            className="result"
            onClick={() => setSelectedResult(result)}
          >
            <div className="number">{index + 1}</div>
            <div className="info">
              {result.loc.description && (
                <div className="location">{result.loc.description}</div>
              )}
              <div className="name">{result.contentTitle}</div>
              <Services services={result.services} />
            </div>
          </div>
        ))}
      </div>
      {selectedResult && (
        <div className="details">
          <div className="name">{selectedResult.contentTitle}</div>
          {selectedResult.loc.description && (
            <div className="location">{selectedResult.loc.description}</div>
          )}
          <Services className="services" services={selectedResult.services} />
          {selectedResult.contentBody && (
            <div className="content">{selectedResult.contentBody}</div>
          )}
        </div>
      )}
    </div>
  );
};

const HEADER_HEIGHT_PX = 52;

export default styled(Results)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 26%;
  min-width: 300px;
  border-left: ${p => p.theme.borderLight};

  > .header {
    z-index: 200;
    height: ${HEADER_HEIGHT_PX}px;
    padding: 0 ${p => p.theme.spacingPx}px 0 0;
    background: ${p => p.theme.bg};
    border-bottom: ${p => p.theme.borderLight};
    display: flex;
    align-items: center;

    > .back {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      background: none;
      border: none;
      outline: none;
      color: ${p => p.theme.colors.grayLight};

      width: ${p => p.theme.spacingPx}px;
      opacity: 0;
      transition: opacity 200ms, width 200ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      &.visible {
        width: 50px;
        opacity: 1;
        cursor: pointer;
      }

      .hidden {
      }

      &:hover {
        color: ${p => p.theme.colors.grayLight1};
      }
    }

    > span {
      flex-grow: 1;
      margin-right: ${p => p.theme.spacingPx}px;
      line-height: 22px;
    }

    > .update {
      ${button};
      background-color: ${p => p.theme.colors.grayLight2};
      border: 1px solid ${p => p.theme.colors.grayLight1};
      margin: -${p => p.theme.spacingPx / 2}px;

      &:hover {
        background-color: ${p => p.theme.colors.grayLight3};
      }
    }
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
        background: ${p => p.theme.colors.grayLight4};

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

  > .details {
    z-index: 100;
    color: ${p => p.theme.textColor};
    background: #fff;
    position: absolute;
    top: ${HEADER_HEIGHT_PX}px;
    left: 0;
    bottom: 0;
    right: 0;
    padding: ${p => p.theme.spacingPx}px;
    overflow-y: auto;

    > .name {
      font-size: 1.5rem;
      padding-bottom: ${p => p.theme.spacingPx / 2}px;
    }

    > .location {
      color: ${p => p.theme.textColorExtraLight};
      font-size: 0.9rem;
    }

    > .services {
      margin-bottom: ${p => p.theme.spacingPx / 2}px;
    }
  }
`;

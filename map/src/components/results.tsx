import isEqual from 'lodash/isEqual';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import Chevron from 'src/components/assets/chevron';
import Refresh from 'src/components/assets/refresh';
import { MarkerIdAndInfo, ResultsSet } from 'src/components/map';
import { format, t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';
import Result from './result';
import ResultDetail from './resultDetail';

interface Props {
  className?: string;
  results: ResultsSet | null;
  nextResults: ResultsSet | null;
  updateResults: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedResult: MarkerIdAndInfo | null;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
  showMoreResults: (count: number) => void;
}

class Results extends React.PureComponent<Props, {}> {
  private headerClicked = () => {
    const { open, setOpen, selectedResult, setSelectedResult } = this.props;
    if (selectedResult) {
      setSelectedResult(null);
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  public render() {
    const {
      className,
      results,
      nextResults,
      updateResults,
      open,
      selectedResult,
      setSelectedResult,
      showMoreResults,
    } = this.props;
    const canUpdateResults =
      !isEqual(results?.context, nextResults?.context) ||
      !isEqual(results?.results, nextResults?.results);

    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div
            className={`${className} ${open ? 'open' : ''} ${
              selectedResult ? 'selected-result' : ''
            }`}
          >
            <button
              type="button"
              className="header"
              onClick={this.headerClicked}
            >
              <Chevron className="back chevron" />
              <span className="count">
                {format(
                  lang,
                  s =>
                    selectedResult
                      ? s.results.backToResults
                      : open
                      ? s.results.closeResults
                      : s.results.openResults,
                  {
                    results: (results?.results || []).length,
                  },
                )}
              </span>
              <span className="grow" />
              <Chevron className="toggle chevron" />
            </button>
            {canUpdateResults && (
              <div className="update">
                <button onClick={updateResults} type="button">
                  <Refresh />
                  <span>{t(lang, s => s.map.updateResultsForThisArea)}</span>
                </button>
              </div>
            )}
            <div className="grow">
              <div className="list">
                {(results?.results || [])
                  .slice(0, results?.showRows)
                  .map((result, index) => (
                    <Result
                      result={result}
                      key={index}
                      index={index}
                      setSelectedResult={setSelectedResult}
                    />
                  ))}
                {results && results.showRows < results.results.length && (
                  <div className="show-more">
                    <button onClick={() => showMoreResults(10)} type="button">
                      <MdExpandMore />
                      <span>{t(lang, s => s.results.showMore)}</span>
                      <MdExpandMore />
                    </button>
                  </div>
                )}
              </div>
              {selectedResult &&
                !selectedResult?.info.contentBody &&
                !selectedResult?.info.contact && (
                  <div className="details">Data loading. Try again later.</div>
                )}
              {selectedResult && (
                <ResultDetail result={selectedResult} lang={lang} />
              )}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(Results)`
  height: 0;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;

  > button.header {
    background: #d9bbd6;
    cursor: pointer;
    outline: none;
    border: none;
    display: flex;
    color: ${p => p.theme.colors.brand.primaryDark};
    padding: 5px 8px;
    align-items: center;
    pointer-events: initial;

    > .chevron,
    .count {
      margin: 0 8px;
    }

    > .chevron.back {
      opacity: 0;
      margin: 0 -6px;
      transform: rotate(90deg);
      transition: opacity ${p => p.theme.transitionSpeedQuick},
        margin ${p => p.theme.transitionSpeedQuick};

      [dir='rtl'] & {
        transform: rotate(270deg);
      }
    }

    > .count {
      font-weight: bold;
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
    }

    > .grow {
      flex-grow: 1;
    }

    > .chevron.toggle {
      transition: opacity ${p => p.theme.transitionSpeedQuick};
    }

    &:hover,
    &:focus {
      color: rgb(129, 30, 120, 0.7);
    }
  }

  > .update,
  .show-more {
    display: flex;
    padding: 20px 16px;
    background: #fff;
    pointer-events: initial;

    button {
      flex-grow: 1;
      padding: 4px;
      color: #fff;
      background: ${p => p.theme.colors.blue};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;

      svg {
        height: 16px;
        margin: 0 4px;
      }

      span {
        margin: 0 4px;
      }

      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }
  }

  > .update {
    display: none;
  }

  > .grow {
    height: 0;
    display: none;
    flex-grow: 1;

    > .list {
      overflow-y: auto;
      max-height: 100%;
      background: #fff;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      pointer-events: initial;
    }

    > .details {
      overflow-y: auto;
      max-height: 100%;
      background: #fff;
      padding: ${p => p.theme.spacingPx}px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      pointer-events: initial;
    }
  }

  &.open {
    > .header > .chevron.toggle {
      transform: rotate(180deg);
    }

    > .update {
      display: flex;
    }

    > .grow {
      display: block;
    }
  }

  &.selected-result {
    > .header {
      > .chevron.back {
        opacity: 1;
        margin: 0 8px;
      }
      > .chevron.toggle {
        opacity: 0;
      }
    }

    > .update {
      display: none;
    }

    > .grow {
      display: block;

      > .list {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }
    }
  }
`;

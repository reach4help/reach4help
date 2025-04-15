import isEqual from 'lodash/isEqual';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import Chevron from 'src/components/assets/chevron';
import Refresh from 'src/components/assets/refresh';
import { MarkerIdAndInfo, ResultsSet } from 'src/components/map';
import { format, t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';
import MarkerType from './marker-type';
import ResultDetail from './resultDetail';

interface Props {
  className?: string;
  results: ResultsSet | null;
  nextResults: ResultsSet | null;
  updateResults: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  mapMarkerClicked: boolean;
  selectedResult: MarkerIdAndInfo | null;
  setSelectedResult: (selectedResult: MarkerIdAndInfo | null) => void;
  showMoreResults: (count: number) => void;
}

class Results extends React.PureComponent<Props, { expandAccordion: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { expandAccordion: false };
  }

  private headerClicked = () => {
    const { open, setOpen, selectedResult, setSelectedResult } = this.props;
    if (selectedResult) {
      setSelectedResult(null);
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  private resultClicked = (result: MarkerIdAndInfo | null) => {
    const { selectedResult, setSelectedResult } = this.props;
    this.setState(state => {
      const expand =
        result?.id === selectedResult?.id ? !state.expandAccordion : true;
      return { expandAccordion: expand };
    });
    setSelectedResult(result);
  };

  public render() {
    const { expandAccordion } = this.state;
    const {
      className,
      results,
      nextResults,
      updateResults,
      open,
      mapMarkerClicked,
      selectedResult,
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
              selectedResult && mapMarkerClicked ? 'selected-result' : ''
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
                    selectedResult && mapMarkerClicked
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
                    <div key={index} className="result">
                      <div
                        className="flexContainer"
                        onClick={() => {
                          this.resultClicked(result);
                        }}
                      >
                        <div className="resultItem">
                          <div className="number">{index + 1}</div>
                          <div className="info">
                            {result.info.loc.description && (
                              <div className="location">
                                {result.info.loc.description}
                              </div>
                            )}
                            <div className="name">
                              {result.info.contentTitle}
                            </div>
                            <MarkerType type={result.info.type} />
                          </div>
                        </div>
                        <Chevron
                          className={`${'toggle chevron'} ${
                            selectedResult?.id === result.id && expandAccordion
                              ? 'open'
                              : ''
                          }`}
                        />
                      </div>
                      {selectedResult?.id === result.id && expandAccordion && (
                        <ResultDetail result={selectedResult} lang={lang} />
                      )}
                    </div>
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
              {mapMarkerClicked &&
                selectedResult &&
                !selectedResult?.info.contentBody &&
                !selectedResult?.info.contact && (
                  <div className="details">Data loading. Try again later.</div>
                )}
              {selectedResult && (
                <ResultDetail result={selectedResult} lang={lang} fullDetail />
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

      > .result {
        color: ${p => p.theme.textColor};
        border-bottom: ${p => p.theme.borderLight};
        padding: ${p => p.theme.spacingPx}px;
        font-size: 1rem;
        cursor: pointer;
        &:hover {
          background: ${p => p.theme.colors.grayLight5};
        }
        > .flexContainer {
          display: flex;
          justify-content: space-between;

          > .resultItem {
            display: flex;
            align-items: start;
            padding: ${p => p.theme.spacingPx}px;

            > .number {
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
          }
          .chevron.toggle {
            flex-shrink: 0;
            transition: opacity ${p => p.theme.transitionSpeedQuick};
            padding: ${p => p.theme.spacingPx}px 0;
            align-self: flex-start;
            &.open {
              transform: rotate(180deg);
            }
          }
        }
      }
    }

    > .details {
      overflow-y: auto;
      max-height: 100%;
      background: #fff;
      padding: ${p => p.theme.spacingPx}px;
      overflow-y: auto;
      background: #fff;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
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

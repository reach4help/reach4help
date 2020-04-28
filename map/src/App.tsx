import isEqual from 'lodash/isEqual';
import React from 'react';
import { Helmet } from 'react-helmet';
import About from 'src/components/about';
import * as i18n from 'src/i18n';
import { Page } from 'src/state';

import { AppContext } from './components/context';
import { FilterMutator } from './components/filters';
import Header from './components/header';
import Map, { MarkerIdAndInfo } from './components/map';
import MapLoader from './components/map-loader';
import Results from './components/results';
import { Filter } from './data';
import styled, {
  CLS_SCREEN_LG_HIDE,
  CLS_SCREEN_LG_ONLY,
  LARGE_DEVICES,
} from './styling';

interface Props {
  className?: string;
}

interface State {
  filter: Filter;
  results: MarkerIdAndInfo[] | null;
  nextResults?: MarkerIdAndInfo[];
  selectedResult: MarkerIdAndInfo | null;
  updateResultsCallback: (() => void) | null;
  updateResultsOnNextClustering: boolean;
  lang: i18n.Language;
  /**
   * * open: (default) the results are open
   * * closed: the results are closed
   * * open-auto: the results are open because a point is selected
   */
  resultsMode: 'open' | 'closed' | 'open-auto';
  page: Page;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: {},
      results: null,
      selectedResult: null,
      updateResultsCallback: null,
      resultsMode: 'open',
      updateResultsOnNextClustering: false,
      lang: i18n.getLanguage(),
      page: {
        page: 'about',
      },
    };
  }

  private setFilter = (mutator: FilterMutator) => {
    this.setState(state => ({ filter: mutator(state.filter) }));
  };

  private setResults = (results: MarkerIdAndInfo[]) => {
    this.setState({ results, selectedResult: null });
  };

  private setUpdateResultsCallback = (callback: (() => void) | null) => {
    this.setState({ updateResultsCallback: callback });
  };

  private setSelectedResult = (selectedResult: MarkerIdAndInfo | null) => {
    this.setState(state => {
      let { resultsMode } = state;
      if (selectedResult && state.resultsMode === 'closed') {
        resultsMode = 'open-auto';
      }
      if (!selectedResult && state.resultsMode === 'open-auto') {
        resultsMode = 'closed';
      }
      return { selectedResult, resultsMode };
    });
  };

  private setNextResults = (nextResults: MarkerIdAndInfo[]) => {
    this.setState(state =>
      isEqual(state.nextResults, nextResults) ? {} : { nextResults },
    );
  };

  private setUpdateResultsOnNextClustering = (
    updateResultsOnNextClustering: boolean,
  ) => {
    this.setState({ updateResultsOnNextClustering });
  };

  private setPage = (page: Page) => {
    this.setState({ page });
  };

  private updateResults = () => {
    const { updateResultsCallback } = this.state;
    if (updateResultsCallback) {
      updateResultsCallback();
    }
  };

  private toggleResults = () => {
    this.setState(state => ({
      resultsMode: state.resultsMode === 'closed' ? 'open' : 'closed',
    }));
  };

  private languageUpdated = (lang: i18n.Language) => {
    this.setState({ lang });
  };

  public componentDidMount = () => {
    i18n.addListener(this.languageUpdated);
  };

  public componentWillUnmount = () => {
    i18n.removeListener(this.languageUpdated);
  };

  public render() {
    const { className } = this.props;
    const {
      filter,
      results,
      nextResults,
      selectedResult,
      resultsMode,
      updateResultsOnNextClustering,
      page,
      lang,
    } = this.state;
    const effectiveResultsMode =
      resultsMode === 'open-auto' ? 'open' : resultsMode;
    return (
      <AppContext.Provider value={{ lang }}>
        <div dir={i18n.getMeta(lang).direction} className={className}>
          <Helmet>
            {i18n.LANGUAGE_KEYS.map((langKey, i) => (
              <link
                key={i}
                rel="alternate"
                hrefLang={langKey}
                href={i18n.canonicalUrl(lang)}
              />
            ))}
            <link rel="canonical" href={i18n.canonicalUrl(lang)} />
          </Helmet>
          <Header page={page} setPage={this.setPage} />
          <main className={`results-${effectiveResultsMode} page-${page.page}`}>
            <div className="map-area">
              <MapLoader
                className="map"
                child={() => (
                  <Map
                    filter={filter}
                    results={results}
                    nextResults={nextResults}
                    setResults={this.setResults}
                    setNextResults={this.setNextResults}
                    selectedResult={selectedResult}
                    setSelectedResult={this.setSelectedResult}
                    setUpdateResultsCallback={this.setUpdateResultsCallback}
                    resultsMode={effectiveResultsMode}
                    toggleResults={this.toggleResults}
                    updateResultsOnNextClustering={
                      updateResultsOnNextClustering
                    }
                    setUpdateResultsOnNextClustering={
                      this.setUpdateResultsOnNextClustering
                    }
                    page={page}
                    setPage={this.setPage}
                  />
                )}
              />
            </div>
            <Results
              className="results"
              results={results}
              nextResults={nextResults}
              selectedResult={selectedResult}
              setSelectedResult={this.setSelectedResult}
              updateResults={this.updateResults}
            />
            <About page={page} setPage={this.setPage} />
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

const RESULTS_TRANSITION_IN = '300ms';
const RESULTS_TRANSITION_OUT = '250ms';
const RESULTS_WIDTH = '400px';

export default styled(App)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${p => p.theme.textColor};

  * {
    font-family: 'Roboto', sans-serif;
  }

  > main {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-grow: 1;
    height: 0;
    min-height: 150px;

    > .map-area {
      flex-grow: 1;
      position: relative;
      margin-right: 0;
      transition: none;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      > .map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    > .results {
      display: none;
      position: absolute;
      top: 0;
      height: 100%;
      right: 0;
      width: ${RESULTS_WIDTH};
      transition: right ${RESULTS_TRANSITION_OUT};
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.results-closed {
      > .map-area {
        margin-right: 0;
        transition: margin-right ${RESULTS_TRANSITION_IN};
      }
      > .results {
        right: -${RESULTS_WIDTH};
        transition: right ${RESULTS_TRANSITION_IN};
      }
    }

    &.page-map {
      > .map-area {
        margin-right: ${RESULTS_WIDTH};
        transition: margin-right ${RESULTS_TRANSITION_OUT};
      }
      > .results {
        display: block;
      }
    }
  }

  a {
    color: ${p => p.theme.textLinkColor};
    text-decoration: none;

    &:hover {
      color: ${p => p.theme.textLinkHoverColor};
      text-decoration: underline;
    }
  }

  .info-window {
    font-size: 1rem;
    font-weight: 400;
  }

  .mobile-message {
    display: none;
    padding: ${p => p.theme.spacingPx / 2}px;
    font-size: 1.5rem;

    p {
      margin: 0;
      padding: ${p => p.theme.spacingPx / 2}px;
    }
  }

  .${CLS_SCREEN_LG_ONLY} {
    display: none;

    ${LARGE_DEVICES} {
      display: initial;
    }
  }

  .${CLS_SCREEN_LG_HIDE} {
    ${LARGE_DEVICES} {
      display: none;
    }
  }
`;

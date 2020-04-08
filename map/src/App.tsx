import isEqual from 'lodash/isEqual';
import React from 'react';

import AddInstructions from './components/add-instructions';
import { FilterMutator } from './components/filters';
import Footer from './components/footer';
import Header from './components/header';
import Map, { NextResults } from './components/map';
import MapLoader from './components/map-loader';
import Results from './components/results';
import Search from './components/search';
import { Filter } from './data';
import { MarkerInfo } from './data/markers';
import styled, {
  CLS_SCREEN_LG_ONLY,
  LARGE_DEVICES,
  SMALL_DEVICES,
} from './styling';

interface Props {
  className?: string;
}

interface State {
  filter: Filter;
  results: MarkerInfo[] | null;
  nextResults?: NextResults;
  selectedResult: MarkerInfo | null;
  updateResultsCallback: (() => void) | null;
  searchInput: HTMLInputElement | null;
  addInstructionsOpen: boolean;
  fullScreen: boolean;
  /**
   * * open: (default) the results are open
   * * closed: the results are closed
   * * open-auto: the results are open because a point is selected
   */
  resultsMode: 'open' | 'closed' | 'open-auto';
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: {},
      results: null,
      selectedResult: null,
      updateResultsCallback: null,
      searchInput: null,
      addInstructionsOpen: false,
      fullScreen: false,
      resultsMode: 'open',
    };
  }

  private setFilter = (mutator: FilterMutator) => {
    this.setState(state => ({ filter: mutator(state.filter) }));
  };

  private setResults = (results: MarkerInfo[]) => {
    this.setState({ results, selectedResult: null });
  };

  private setUpdateResultsCallback = (callback: (() => void) | null) => {
    this.setState({ updateResultsCallback: callback });
  };

  private setSearchInput = (searchInput: HTMLInputElement | null) => {
    this.setState({ searchInput });
  };

  private setSelectedResult = (selectedResult: MarkerInfo | null) => {
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

  private setNextResults = (nextResults: NextResults) => {
    this.setState(state =>
      isEqual(state.nextResults, nextResults) ? {} : { nextResults },
    );
  };

  private setAddInstructionsOpen = (addInstructionsOpen: boolean) => {
    this.setState({ addInstructionsOpen });
  };

  private updateResults = () => {
    const { updateResultsCallback } = this.state;
    if (updateResultsCallback) {
      updateResultsCallback();
    }
  };

  private toggleFullscreen = () => {
    this.setState(state => ({
      fullScreen: !state.fullScreen,
      resultsMode: state.fullScreen ? 'open' : 'closed',
    }));
  };

  private toggleResults = () => {
    this.setState(state => ({
      resultsMode: state.resultsMode === 'closed' ? 'open' : 'closed',
    }));
  };

  public render() {
    const { className } = this.props;
    const {
      filter,
      results,
      nextResults,
      selectedResult,
      searchInput,
      addInstructionsOpen,
      fullScreen,
      resultsMode,
    } = this.state;
    const effectiveResultsMode =
      resultsMode === 'open-auto' ? 'open' : resultsMode;
    return (
      <div className={className + (fullScreen ? ' fullscreen' : '')}>
        <Header
          filter={filter}
          updateFilter={this.setFilter}
          setAddInstructionsOpen={this.setAddInstructionsOpen}
          fullScreen={fullScreen}
          toggleFullscreen={this.toggleFullscreen}
        />
        <main className={`results-${effectiveResultsMode}`}>
          <div className="map-area">
            <MapLoader
              className="map"
              child={() => (
                <Map
                  filter={filter}
                  searchInput={searchInput}
                  results={results}
                  nextResults={nextResults}
                  setResults={this.setResults}
                  setNextResults={this.setNextResults}
                  selectedResult={selectedResult}
                  setSelectedResult={this.setSelectedResult}
                  setUpdateResultsCallback={this.setUpdateResultsCallback}
                  resultsMode={effectiveResultsMode}
                  toggleResults={this.toggleResults}
                />
              )}
            />
            <Search
              className="search"
              updateSearchInput={this.setSearchInput}
            />
          </div>
          <Results
            className="results"
            results={results}
            nextResults={nextResults?.results || null}
            selectedResult={selectedResult}
            setSelectedResult={this.setSelectedResult}
            updateResults={this.updateResults}
          />
        </main>
        <div className="mobile-message">
          <p>
            Unfortunately, this map has not been updated to work on devices with
            small screens.
          </p>
          <p>
            We are currently working on it, and should have an update out in the
            coming days. Until then, please open page on a different device.
          </p>
        </div>
        {!fullScreen && <Footer />}
        <AddInstructions
          open={addInstructionsOpen}
          setAddInstructionsOpen={this.setAddInstructionsOpen}
        />
      </div>
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

  &.fullscreen {
    /**
     * These styles prevent scrolling on mobile / tablets when in full-screen
     * mode (where the address-bar can collapse)
     */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: initial;
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
      margin-right: ${RESULTS_WIDTH};
      transition: margin-right ${RESULTS_TRANSITION_OUT};
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      .map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      > .search {
        position: absolute;
        z-index: 100;
        max-width: 500px;
        top: 10px;
        left: 10px;
        right: 40px;
      }
    }

    > .results {
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

  ${SMALL_DEVICES} {
    position: relative;

    > main {
      display: none;
    }
    .mobile-message {
      display: block;
    }
  }

  .${CLS_SCREEN_LG_ONLY} {
    display: none;

    ${LARGE_DEVICES} {
      display: initial;
    }
  }
`;

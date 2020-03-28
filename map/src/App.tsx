import React from 'react';
import isEqual from 'lodash/isEqual';

import styled, { SMALL_DEVICES } from './styling';

import { Filter } from './data';

import AddInstructions from './components/add-instructions';
import { FilterMutator } from './components/filters';
import Header from './components/header';
import Footer from './components/footer';
import Map, { NextResults } from './components/map';
import Results from './components/results';
import MapLoader from './components/map-loader';
import Search from './components/search';

import { MarkerInfo } from './data/markers';

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
    this.setState({ selectedResult });
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

  public render() {
    const { className } = this.props;
    const {
      filter,
      results,
      nextResults,
      selectedResult,
      searchInput,
      addInstructionsOpen,
    } = this.state;
    return (
      <div className={className}>
        <Header
          filter={filter}
          updateFilter={this.setFilter}
          setAddInstructionsOpen={this.setAddInstructionsOpen}
        />
        <main>
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
                />
              )}
            />
            <Search
              className="search"
              updateSearchInput={this.setSearchInput}
            />
          </div>
          <Results
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
        <Footer />
        <AddInstructions
          open={addInstructionsOpen}
          setAddInstructionsOpen={this.setAddInstructionsOpen}
        />
      </div>
    );
  }
}

export default styled(App)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  color: ${p => p.theme.textColor};

  > main {
    display: flex;
    flex-grow: 1;
    height: 0;

    > .map-area {
      flex-grow: 1;
      position: relative;
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
        right: 60px;
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
`;

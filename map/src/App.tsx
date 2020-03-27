import React from 'react';
import isEqual from 'lodash/isEqual';

import styled from './styling';

import { Filter } from './data';

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
    } = this.state;
    return (
      <div className={className}>
        <Header filter={filter} updateFilter={this.setFilter} />
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
        <Footer />
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
`;

import React from 'react';
import styled from './styling';

import { Filter } from './data';

import { FilterMutator } from './components/filters';
import Header from './components/header';
import Map, { SelectMarkerCallback } from './components/map';
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
  selectMarkerCallback: SelectMarkerCallback;
  searchInput: HTMLInputElement | null;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: {},
      results: null,
      selectMarkerCallback: null,
      searchInput: null,
    };
  }

  private updateFilter = (mutator: FilterMutator) => {
    this.setState(state => ({ filter: mutator(state.filter) }));
  };

  private updateResults = (results: MarkerInfo[]) => {
    this.setState({ results });
  };

  private setSelectMarkerCallback = (callback: SelectMarkerCallback) => {
    this.setState({ selectMarkerCallback: callback });
  };

  private updateSearchInput = (searchInput: HTMLInputElement | null) => {
    this.setState({ searchInput });
  };

  public render() {
    const { className } = this.props;
    const { filter, results, selectMarkerCallback, searchInput } = this.state;
    return (
      <div className={className}>
        <Header filter={filter} updateFilter={this.updateFilter} />
        <main>
          <div className="map-area">
            <MapLoader
              className="map"
              child={() => (
                <Map
                  filter={filter}
                  searchInput={searchInput}
                  results={results}
                  updateResults={this.updateResults}
                  setSelectResultCallback={this.setSelectMarkerCallback}
                />
              )}
            />
            <Search
              className="search"
              updateSearchInput={this.updateSearchInput}
            />
          </div>
          <Results
            results={results}
            selectMarkerCallback={selectMarkerCallback}
          />
        </main>
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
`;

import React from 'react';
import styled from 'styled-components';

import { Filter } from './data';

import Filters, { FilterMutator } from './components/filters';
import Map from './components/map';
import Results from './components/results';
import MapLoader from './components/map-loader';
import { MarkerInfo } from './data/markers';

interface Props {
  className?: string;
}

interface State {
  filter: Filter;
  results: MarkerInfo[];
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      filter: {},
      results: []
    };
  }

  private updateFilter = (mutator: FilterMutator) => {
    this.setState(state => ({filter: mutator(state.filter)}))
  }

  private updateResults = (results: MarkerInfo[]) => {
    this.setState({results});
  }

  public render() {
    const {className} = this.props;
    const { filter, results } = this.state;
    return (
      <div className={className}>
        <header>
          <h1>Reach4Help</h1>
          <Filters filter={filter} updateFilter={this.updateFilter} />
        </header>
        <main>
          <MapLoader child={() => (
            <Map filter={filter} updateResults={this.updateResults} />
          )}
          />
          <Results results={results} />
        </main>
      </div>
    );
  }
}

export default styled(App)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;

  > header {
    > h1 {
      margin: 0;
      padding: 10px;
    }
  }
  > main {
    display: flex;
    flex-grow: 1;
  }
`;

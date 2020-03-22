import React from 'react';
import styled from 'styled-components';
import { SERVICES, isService, Filter } from 'src/data';

export type FilterMutator = (filter: Filter) => Filter;

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
}

class Filters extends React.Component<Props, {}> {

  private changeService = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const {updateFilter} = this.props;
    const service = event.currentTarget.value;
    updateFilter(filter => ({
      ...filter,
      service: isService(service) ? service : undefined
    }));
  }

  public render() {
    const {className, filter} = this.props;
    return (
      <div className={className}>
        Service:
        <select onChange={this.changeService} value={filter.service || ''}>
          <option key='all' value=''>Any</option>
          {Object.entries(SERVICES).map(([value, data]) => (
            <option key={value} value={value}>
              {data.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default styled(Filters)`
  margin: 0 10px 10px;

  select {
    margin-left: 5px;
  }
`;


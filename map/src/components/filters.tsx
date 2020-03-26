import React from 'react';
import { SERVICES, isService, Filter } from 'src/data';
import { buttonPrimary } from 'src/styling/mixins';
import styled from '../styling';

export type FilterMutator = (filter: Filter) => Filter;

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
}

class Filters extends React.Component<Props, {}> {
  private changeService = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { updateFilter } = this.props;
    const service = event.currentTarget.value;
    updateFilter(filter => ({
      ...filter,
      service: isService(service) ? service : undefined,
    }));
  };

  public render() {
    const { className, filter } = this.props;
    return (
      <div className={className}>
        Filter by need:
        <select onChange={this.changeService} value={filter.service || ''}>
          <option key="all" value="">
            Any
          </option>
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
  select {
    margin-left: 5px;
    ${buttonPrimary};
    padding: 7px 11px;

    &:focus {
      background: ${p => p.theme.colors.brand.primaryLight};
    }
  }
`;

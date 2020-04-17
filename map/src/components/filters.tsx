import React from 'react';
import { Filter, isMarkerType, MARKER_TYPES } from 'src/data';
import { t } from 'src/i18n';
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
    const type = event.currentTarget.value;
    updateFilter(() => ({
      type: isMarkerType(type) ? type : undefined,
    }));
  };

  public render() {
    const { className, filter } = this.props;
    return (
      <div className={className}>
        Filter by marker:
        <select onChange={this.changeService} value={filter.type || ''}>
          <option key="all" value="">
            {t(s => s.services.any)}
          </option>
          {Object.entries(MARKER_TYPES).map(([value, data]) => (
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

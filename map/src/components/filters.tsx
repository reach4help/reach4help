import React from 'react';
import { Filter, isMarkerType, MARKER_TYPE_STRINGS } from 'src/data';
import { t } from 'src/i18n';
import { buttonPrimary } from 'src/styling/mixins';

import styled from '../styling';
import { AppContext } from './context';

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
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            Filter by marker:
            <select onChange={this.changeService} value={filter.type || ''}>
              <option key="all" value="">
                {t(lang, s => s.services.any)}
              </option>
              {MARKER_TYPE_STRINGS.map(value => (
                <option key={value} value={value}>
                  {t(lang, s => s.markerTypes[value])}
                </option>
              ))}
            </select>
          </div>
        )}
      </AppContext.Consumer>
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

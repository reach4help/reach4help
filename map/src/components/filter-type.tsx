import {
  isMarkerType,
  MARKER_TYPE_STRINGS,
  MarkerTypeString,
} from '@reach4help/model/lib/markers/type';
import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import { Language, t } from 'src/i18n';
import { Filter, FilterMutator } from 'src/state';

import styled from '../styling';
import { AppContext } from './context';

type Option = {
  value: MarkerTypeString | undefined;
  label: string;
};

const isOption = (option: ValueType<Option>): option is Option =>
  !!(option && isMarkerType((option as Option).value));

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
}

class FilterType extends React.Component<Props, {}> {
  private changeService = (option: ValueType<Option>): void => {
    const { updateFilter } = this.props;
    updateFilter(filter => ({
      ...filter,
      type: isOption(option) ? option.value : undefined,
    }));
  };

  private select = (lang: Language) => {
    const { className, filter } = this.props;

    const optionsMap = new Map(
      MARKER_TYPE_STRINGS.map(value => [
        value,
        { value, label: t(lang, s => s.markerTypes[value]) },
      ]),
    );

    const any: Option = {
      value: undefined,
      label: t(lang, s => s.services.any),
    };

    const options: Option[] = [any, ...optionsMap.values()];

    const value = (filter.type && optionsMap.get(filter.type)) || any;

    return (
      <Select
        className={className}
        classNamePrefix="select"
        value={value}
        onChange={this.changeService}
        options={options}
        isSearchable={false}
        components={{
          DropdownIndicator: () => <Chevron className="chevron" />,
          IndicatorSeparator: () => null,
        }}
      />
    );
  };

  public render() {
    return (
      <AppContext.Consumer>
        {({ lang }) => this.select(lang)}
      </AppContext.Consumer>
    );
  }
}

export default styled(FilterType)`
  .select__control {
    border: 1px solid ${p => p.theme.colors.borderBase};
    box-shadow: none;
    cursor: pointer;
    background: none;
    border-radius: 4px;
    justify-content: center;
    align-items: middle;
    min-height: initial;
    padding: 5px 4px;
    font-size: 14px;
    line-height: 22px;
    color: ${p => p.theme.colors.brand.primaryDark1};

    .chevron {
      color: ${p => p.theme.colors.brand.primaryDark1};
      opacity: 0.6;
      margin: 0 2px;
    }

    .select__value-container {
      margin: 0;
      padding: 0;
      height: 22px;
    }

    &.select__control--menu-is-open {
      .chevron {
        transform: rotate(180deg);
      }
    }

    &:hover,
    &.select__control--is-focused {
      border-color: ${p => p.theme.colors.brand.primaryDark};
      .single-value,
      .chevron {
        color: ${p => p.theme.colors.brand.primaryDark};
      }
    }
  }
  .select__menu {
    width: initial;
    min-width: 100%;
  }
  .select__option {
    cursor: pointer;
    white-space: nowrap;
  }
  .select__option--is-focused {
    background: ${p => p.theme.colors.brand.primaryLight1};
  }
  .select__option--is-selected {
    background: ${p => p.theme.colors.brand.primary};
  }
`;

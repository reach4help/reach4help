import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import { Language, t } from 'src/i18n';
import { Filter, FilterMutator } from 'src/state';

import styled from '../styling';
import { AppContext } from './context';

const OPTION_VALUES = ['any', 'visible', 'hidden'] as const;

type OptionValue = typeof OPTION_VALUES[number];

type Option = {
  value: OptionValue;
  label: string;
};

const isOption = (option: ValueType<Option>): option is Option =>
  !!(option && OPTION_VALUES.includes((option as Option).value));

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
}

class FilterType extends React.Component<Props, {}> {
  private changeOption = (option: ValueType<Option>): void => {
    const { updateFilter } = this.props;
    updateFilter(filter => ({
      ...filter,
      visibility: isOption(option) ? option.value : undefined,
    }));
  };

  private select = (lang: Language) => {
    const { className, filter } = this.props;

    const optionsMap = new Map(
      OPTION_VALUES.map(value => [
        value,
        { value, label: t(lang, s => s.hiddenMarkers.filter[value]) },
      ]),
    );

    const options: Option[] = [...optionsMap.values()];

    const value = optionsMap.get(filter.visibility || 'any');

    return (
      <Select
        className={className}
        classNamePrefix="select"
        value={value}
        onChange={this.changeOption}
        options={options}
        isSearchable={false}
        components={{
          DropdownIndicator: () => <Chevron className="chevron" />,
          SingleValue: props => (
            <div className="single-value">
              {t(lang, s => s.hiddenMarkers.visiblility, {
                visibility: () => <span>{props.children}</span>,
              })}
            </div>
          ),
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

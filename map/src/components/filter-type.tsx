import { isService } from '@reach4help/model/lib/markers/type';
import {
  isMarkerType as isOrgType,
  MARKER_TYPE_STRINGS,
  MarkerTypeString as OrgTypeString,
  Service,
} from '@reach4help/model/lib/markers/type';
import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import { Language, t } from 'src/i18n';
import { Filter, UpdateFilter } from 'src/state';
import { VisibilityOptions, FilterOptions } from '../state/index';

import styled from '../styling';
import { AppContext } from './context';

// TODO: the form's value should be an array of OptionType when multi filter implemented
type OptionType = {
  value: string | undefined;  
  label: string;
};

interface Props {
  className?: string;
  filterType: FilterOptions;
  filter: Filter;
  updateFilter: UpdateFilter;
}

class FilterType extends React.Component<Props, {}> {
  private changeService = (fieldName: string, fieldValue: string | undefined): void => {
    if (fieldValue) {
      this.props.updateFilter(fieldName, fieldValue);
    }
  };

  private select = (lang: Language) => {
    const { className, filter } = this.props;

    const optionsMap = new Map(
      MARKER_TYPE_STRINGS.map(value => [
        value,
        { value, label: t(lang, s => s.markerTypes[value]) },
      ]),
    );

    // For filter-visibility:
    // const optionsMap = new Map(
    //   OPTION_VALUES.map(value => [
    //     value,
    //     { value, label: t(lang, s => s.hiddenMarkers.filter[value]) },
    //   ]),
    // );

    // For services: SERVICE_STRINGS, s.services

    const any: OptionType = {
      value: undefined,
      label: t(lang, s => s.services.any),
    };

    const options: OptionType[] = [any, ...optionsMap.values()];
    console.log('options:', options);

    // TODO: change value to use local state
    const value = filter.orgType && optionsMap.get(filter.orgType);

    return (
      <Select
        className={className}
        classNamePrefix="select"
        value={value}
        onChange={() => this.changeService(this.props.filterType, value?.value)}
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

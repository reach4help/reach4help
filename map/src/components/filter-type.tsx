import { isService } from '@reach4help/model/lib/markers/type';
import {
  isMarkerType as isOrgType,
  MARKER_TYPE_STRINGS,
  MarkerTypeString as OrgTypeString,
} from '@reach4help/model/lib/markers/type';
import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import { Language, t } from 'src/i18n';
import { Filter, FilterMutator } from 'src/state';

import styled from '../styling';
import { AppContext } from './context';

type OrgOption = {
  value: OrgTypeString | undefined;
  label: string;
};

const isOrgOption = (orgOption: ValueType<OrgOption>): orgOption is OrgOption =>
  !!(orgOption && isOrgType((orgOption as OrgOption).value));

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
}

class FilterType extends React.Component<Props, {}> {
  private changeService = (fieldValue: ValueType<OrgOption>): void => {
    const { updateFilter } = this.props;
    updateFilter(filter => ({
      ...filter,
      orgType: isOrgOption(fieldValue) ? fieldValue.value : undefined,
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

    const any: OrgOption = {
      value: undefined,
      label: t(lang, s => s.services.any),
    };

    const options: OrgOption[] = [any, ...optionsMap.values()];

    const value = (filter.orgType && optionsMap.get(filter.orgType));

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

import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import { Language, t } from 'src/i18n';
import { Filter, UpdateFilter } from 'src/state';

import styled from '../styling';
import { AppContext } from './context';

type OptionType = {
  value: string | undefined;
  label: string;
};

interface Props {
  className?: string;
  translationKey: string;
  filterScreenField: string;
  dropDownValues: readonly string[];
  filter: Filter;
  updateFilter: UpdateFilter;
}

class DropDown extends React.Component<Props, {}> {
  private changeService = (
    fieldName: string,
    selectedValue: ValueType<OptionType>,
  ): void => {
    if (selectedValue) {
      const { updateFilter } = this.props;
      updateFilter(fieldName, (selectedValue as OptionType).value);
    }
  };

  private lookUpValue = (
    // TODO: add some docs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translationObject: any,
    propKey: string,
    valueKey: string,
  ): string => {
    let val = translationObject;
    const keys = propKey.split('.');
    keys.forEach(key => {
      val = val[key];
    });
    return val[valueKey];
  };

  private select = (lang: Language) => {
    const {
      className,
      filter,
      dropDownValues,
      translationKey,
      filterScreenField,
    } = this.props;

    const optionsMap = new Map(
      dropDownValues.map(value => [
        value,
        {
          value,
          label: t(lang, translationObject =>
            this.lookUpValue(translationObject, translationKey, value),
          ),
        },
      ]),
    );

    // TODO: refactor .services
    const any: OptionType = {
      value: undefined,
      label: t(lang, translationObject => translationObject.services.any),
    };

    const options: OptionType[] = [any, ...optionsMap.values()];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchInOptions = (filterScreen: any) =>
      filterScreen[filterScreenField];
    const value =
      typeof searchInOptions !== 'undefined'
        ? optionsMap.get(searchInOptions(filter))
        : undefined;

    return (
      <Select
        className={className}
        classNamePrefix="select"
        value={value}
        onChange={selectedValue =>
          this.changeService(filterScreenField, selectedValue)
        }
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

export default styled(DropDown)`
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

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

/**
 * @param className the class name
 * @param translationKey a dot-separated list of keys used to index a translationObject generated from json
 * @param filterScreenField the property of filter this drop-down updates
 * @param dropDownValues the drop down values
 * @param filter the filter applied to the map
 * @param updateFilter a callback that updates filter
 */
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

  /**
   * Returns the translated word at translationObject.propKey.valueKey if it exists, else undefined.
   * For example, translationObject.services.org returns "Organization" if the translationObject
   * is in English.
   *
   * @param translationObject an object generated from a json translation file
   * @param propKey a dot-separated list of keys used to index into the translationObject
   * @param valueKey a dropDownValue
   * @return the translated label if it exists, else undefined
   */
  private lookUpValue = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translationObject: any,
    propKey: string,
    valueKey: string,
  ): string | undefined => {
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
          label: t(
            lang,
            translationObject =>
              this.lookUpValue(
                translationObject,
                translationKey,
                value,
              ) as string,
          ),
        },
      ]),
    );

    const any: OptionType = {
      value: undefined,
      label: t(lang, translationObject =>
        this.lookUpValue(translationObject, translationKey, 'any')
          ? (this.lookUpValue(
              translationObject,
              translationKey,
              'any',
            ) as string)
          : translationObject.services.any,
      ),
    };

    const options: OptionType[] = [any, ...optionsMap.values()];

    const value =
      typeof filter[filterScreenField as keyof Filter] !== 'undefined'
        ? optionsMap.get(filter[filterScreenField as keyof Filter] as string)
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

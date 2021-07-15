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
 * @param className the className of the Select component
 * @param translationKey a dot-separated list of keys used to index a translationObject generated from json
 * @param filterScreenField the name of the property of filter this drop-down updates
 * @param dropDownValues the drop down values
 * @param isMulti true iff multi-select is enabled
 * @param placeholder the place holder text displayed in input box if multi-select is enabled
 * @param updateFilter a callback that updates filter
 */
interface DropDownProps {
  className?: string;
  translationKey: string;
  filterScreenField: keyof Filter;
  dropDownValues: readonly string[];
  isMulti?: boolean;
  placeholder?: string;
  updateFilter: UpdateFilter;
}

interface DropDownState {
  selectedValues: ValueType<OptionType>;
}

class DropDown extends React.Component<DropDownProps, DropDownState> {
  constructor(props: DropDownProps) {
    super(props);

    this.state = {
      selectedValues: undefined,
    };
  }

  private onChangeHandler = (
    fieldName: string,
    selected: ValueType<OptionType>,
  ): void => {
    const { updateFilter, isMulti } = this.props;
    let newVal;
    if (selected) {
      newVal = isMulti
        ? new Set(
            (selected as OptionType[]).map(
              selectedOption => selectedOption.value,
            ),
          )
        : (selected as OptionType).value;
    }
    updateFilter(fieldName, newVal);
    this.setState({ selectedValues: selected });
  };

  /**
   * Returns the translated word at translationObject.propKey.valueKey if it exists, else undefined.
   * For example, lookUpValue(translationObject, 'visibility.filter", "visible") returns  "Visible markers"
   * if the visibility.filter.visible property of translationObject.visibilty.filter is "Visible marker".
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

  private getLabel = (lang: Language, translationKey: string, value: string) =>
    t(
      lang,
      translationObject =>
        this.lookUpValue(translationObject, translationKey, value) as string,
    );

  private SelectComponent = (lang: Language) => {
    const {
      className,
      dropDownValues,
      translationKey,
      filterScreenField,
      isMulti,
      placeholder,
    } = this.props;
    const { selectedValues } = this.state;

    const optionsMap = new Map(
      dropDownValues.map(value => [
        value,
        {
          value,
          label: this.getLabel(lang, translationKey, value),
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

    const options: OptionType[] = isMulti
      ? [...optionsMap.values()]
      : [any, ...optionsMap.values()];

    return (
      <Select
        className={className}
        isMulti={isMulti}
        classNamePrefix="select"
        value={selectedValues}
        defaultValue={isMulti ? undefined : any}
        onChange={selected => this.onChangeHandler(filterScreenField, selected)}
        placeholder={placeholder}
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
        {({ lang }) => this.SelectComponent(lang)}
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
    padding: 6px 8px;
    font-size: 14px;
    line-height: 20px;
    color: ${p => p.theme.colors.brand.primaryDark1};

    .chevron {
      color: ${p => p.theme.colors.brand.primaryDark1};
      opacity: 0.6;
      margin: 0 2px;
    }

    .select__value-container {
      margin: 0;
      padding: 0;
      min-height: 22px;
    }

    &.select__control--menu-is-open {
      .chevron {
        transform: rotate(180deg);
      }
    }

    .select__placeholder {
      color: ${p => p.theme.colors.gray};
      opacity: 0.75;
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
    font-size: 14px;
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

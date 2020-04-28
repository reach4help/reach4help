import React from 'react';
import Select, { ValueType } from 'react-select';
import Chevron from 'src/components/assets/chevron';
import {
  isValidLanguage,
  Language,
  LANGUAGE_KEYS,
  LANGUAGES,
  setLanguage,
} from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';

type Option = {
  value: Language;
  label: string;
};

const isOption = (option: ValueType<Option>): option is Option =>
  !!(option && isValidLanguage((option as Option).value));

const OPTIONS_MAP = new Map(
  LANGUAGE_KEYS.map(value => [
    value,
    { value, label: LANGUAGES[value].meta.name },
  ]),
);

const OPTIONS = [...OPTIONS_MAP.values()];

interface Props {
  className?: string;
}

class Languages extends React.Component<Props, {}> {
  private changeLanguage = (option: ValueType<Option>): void => {
    if (isOption(option)) {
      setLanguage(option.value);
    }
  };

  public render() {
    const { className } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <Select
            className={className}
            classNamePrefix={className}
            value={OPTIONS_MAP.get(lang) || null}
            onChange={this.changeLanguage}
            options={OPTIONS}
            isSearchable={false}
            components={{
              DropdownIndicator: () => <Chevron className="chevron" />,
              IndicatorSeparator: () => null,
            }}
          />
        )}
      </AppContext.Consumer>
    );
  }
}

export default styled(Languages)`
  .languages__control {
    border: none;
    box-shadow: none;
    cursor: pointer;

    .languages__value-container {
      justify-content: flex-end;
    }

    .languages__single-value {
      font-weight: bold;
      font-size: 15px;
      color: ${p => p.theme.colors.brand.primaryDark1};
    }

    .chevron {
      color: ${p => p.theme.colors.brand.primaryDark1};
      opacity: 0.6;
    }

    &.languages__control--menu-is-open {
      .chevron {
        transform: rotate(180deg);
      }
    }

    &:hover {
      .languages__single-value,
      .chevron {
        color: ${p => p.theme.colors.brand.primaryDark};
      }
    }
  }
  .languages__option {
    cursor: pointer;
  }
  .languages__option--is-focused {
    background: ${p => p.theme.colors.brand.primaryLight1};
  }
  .languages__option--is-selected {
    background: ${p => p.theme.colors.brand.primary};
  }
`;

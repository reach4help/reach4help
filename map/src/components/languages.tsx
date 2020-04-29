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
  button: boolean;
}

class Languages extends React.Component<Props, {}> {
  private changeLanguage = (option: ValueType<Option>): void => {
    if (isOption(option)) {
      setLanguage(option.value);
    }
  };

  public render() {
    const { className, button } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <Select
            className={`${className} ${button ? 'button' : ''}`}
            classNamePrefix={className}
            value={OPTIONS_MAP.get(lang) || null}
            onChange={this.changeLanguage}
            options={OPTIONS}
            isSearchable={false}
            components={{
              ValueContainer: props => (
                <div className="value-container">{props.children}</div>
              ),
              SingleValue: props => (
                <div className="single-value">{props.children}</div>
              ),
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
    background: none;
    border-radius: 6px;
    justify-content: center;
    align-items: middle;
    padding: 0 10px;

    .value-container {
      display: flex;
      margin: 0 2px;
    }

    .single-value {
      font-weight: bold;
      font-size: 15px;
      color: ${p => p.theme.colors.brand.primaryDark1};
    }

    .chevron {
      color: ${p => p.theme.colors.brand.primaryDark1};
      opacity: 0.6;
      margin: 0 2px;
    }

    &.languages__control--menu-is-open {
      .chevron {
        transform: rotate(180deg);
      }
    }

    &:hover,
    &.languages__control--is-focused {
      .single-value,
      .chevron {
        color: ${p => p.theme.colors.brand.primaryDark};
      }
    }
  }
  .languages__menu {
    width: initial;
    min-width: 100%;
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

  &.button {
    .languages__control {
      padding: 11px 30px;
      background: rgba(31, 0, 41, 0.05);
    }
  }
`;

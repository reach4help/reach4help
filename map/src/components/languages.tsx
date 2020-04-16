import React from 'react';
import { isLanguage, LANGUAGES, Translate } from 'src/data';
import { buttonPrimary } from 'src/styling/mixins';

import styled from '../styling';

export type TranslateMutator = (translate: Translate) => Translate;

interface Props {
  className?: string;
  translate: Translate;
  updateTranslate: (mutator: TranslateMutator) => void;
}

class Languages extends React.Component<Props, {}> {
  private changeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { updateTranslate } = this.props;
    const language = event.currentTarget.value;
    localStorage.setItem('selectedLanguage', language);
    updateTranslate(translate => ({
      ...translate,
      language: isLanguage(language) ? language : undefined,
    }));
  };

  public render() {
    const { className, translate } = this.props;
    return (
      <div className={className}>
        Language:
        <select onChange={this.changeLanguage} value={translate.language || ''}>
          {Object.entries(LANGUAGES).map(([value, data]) => (
            <option key={value} value={value}>
              {data.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default styled(Languages)`
  select {
    margin-left: 5px;
    ${buttonPrimary};
    padding: 7px 11px;

    &:focus {
      background: ${p => p.theme.colors.brand.primaryLight};
    }
  }
`;

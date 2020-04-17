import React from 'react';
import { Internationalization, isValidLanguage, LANGUAGES, t } from 'src/i18n';
import { buttonPrimary } from 'src/styling/mixins';

import styled from '../styling';

export type TranslateMutator = (
  translate: Internationalization,
) => Internationalization;

interface Props {
  className?: string;
  i18n: Internationalization;
  updateI18n: (mutator: TranslateMutator) => void;
}

class Languages extends React.Component<Props, {}> {
  private changeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { updateI18n } = this.props;
    const language = event.currentTarget.value;
    localStorage.setItem('selectedLanguage', language);
    updateI18n(() => ({
      language: isValidLanguage(language) ? language : undefined,
    }));
  };

  public render() {
    const { className, i18n: translate } = this.props;
    return (
      <div className={className}>
        {t(s => s.lang)}
        <select onChange={this.changeLanguage} value={translate.language || ''}>
          <option key="" value="">
            {t(s => s.langSelect)}
          </option>
          {Object.entries(LANGUAGES).map(([value, data]) => (
            <option key={value} value={value}>
              {data.meta.name}
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

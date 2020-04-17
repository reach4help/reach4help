import React from 'react';
import { isValidLanguage, LANGUAGES, setLanguage, t } from 'src/i18n';
import { buttonPrimary } from 'src/styling/mixins';

import styled from '../styling';
import { AppContext } from './context';

interface Props {
  className?: string;
}

class Languages extends React.Component<Props, {}> {
  private changeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const language = event.currentTarget.value;
    if (isValidLanguage(language)) {
      setLanguage(language);
    }
  };

  public render() {
    const { className } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <div className={className}>
            {t(lang, s => s.lang)}
            <select onChange={this.changeLanguage} value={lang}>
              {Object.entries(LANGUAGES).map(([value, data]) => (
                <option key={value} value={value}>
                  {data.meta.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </AppContext.Consumer>
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

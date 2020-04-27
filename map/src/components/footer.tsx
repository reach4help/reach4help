import React from 'react';
import * as firebase from 'src/data/firebase';
import { t } from 'src/i18n';

import styled from '../styling';
import { AppContext } from './context';

const FooterWrapper = styled.footer`
  display: flex;
  padding: ${p => p.theme.spacingPx * 0.75}px;
  background: ${p => p.theme.bg};
  border-top: ${p => p.theme.borderLight};
  font-size: 0.8rem;

  .grow {
    flex-grow: 1;
  }

  > a,
  > button {
    margin-left: ${p => p.theme.spacingPx}px;
    color: ${p => p.theme.textLinkColor};
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    &: hover {
      color: ${p => p.theme.textLinkHoverColor};
      text-decoration: underline;
    }
  }
`;

interface State {
  includingHidden: boolean;
}

class Footer extends React.PureComponent<{}, State> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      includingHidden: firebase.includingHidden(),
    };
  }

  public componentDidMount() {
    firebase.addInformationListener(this.firebaseInformationUpdated);
  }

  public componentWillUnmount() {
    firebase.removeInformationListener(this.firebaseInformationUpdated);
  }

  private firebaseInformationUpdated: firebase.InformationListener = update =>
    this.setState({ includingHidden: update.includingHidden });

  public render = () => {
    const { includingHidden } = this.state;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <FooterWrapper>
            <div className="grow">
              {t(lang, s => s.footer.netlifyNote, {
                link: key => (
                  <a key={key} href="https://www.netlify.com/">
                    {t(lang, s => s.footer.netlifyLinkText)}
                  </a>
                ),
              })}
              <span aria-label="heart emoji" role="img">
                &nbsp;❤️
              </span>
            </div>
            <button
              type="button"
              onClick={() => firebase.includeHiddenMarkers(!includingHidden)}
            >
              {t(
                lang,
                s => s.footer[includingHidden ? 'hideHidden' : 'showHidden'],
              )}
            </button>
            <a href="https://github.com/reach4help/reach4help/">
              {t(lang, s => s.footer.githubRepo)}
            </a>
            <a href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md">
              {t(lang, s => s.footer.codeOfConduct)}
            </a>
          </FooterWrapper>
        )}
      </AppContext.Consumer>
    );
  };
}

export default Footer;

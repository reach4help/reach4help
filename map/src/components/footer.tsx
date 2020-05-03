import React from 'react';
import * as firebase from 'src/data/firebase';
import { t } from 'src/i18n';

import styled, { NON_LARGE_DEVICES } from '../styling';
import { AppContext } from './context';

interface Props {
  className?: string;
}

interface State {
  includingHidden: boolean;
}

class Footer extends React.PureComponent<Props, State> {
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
    const { className } = this.props;
    const { includingHidden } = this.state;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <footer className={className}>
            <div className="netlify">
              {t(lang, s => s.footer.netlifyNote, {
                link: key => (
                  <a
                    className="footer-link"
                    key={key}
                    href="https://www.netlify.com/"
                  >
                    {t(lang, s => s.footer.netlifyLinkText)}
                  </a>
                ),
              })}
              <span aria-label="heart emoji" role="img">
                &nbsp;❤️
              </span>
            </div>
            <div className="links">
              <button
                type="button"
                onClick={() => firebase.includeHiddenMarkers(!includingHidden)}
              >
                {t(
                  lang,
                  s => s.footer[includingHidden ? 'hideHidden' : 'showHidden'],
                )}
              </button>
              <a
                className="footer-link"
                href="https://github.com/reach4help/reach4help/"
              >
                {t(lang, s => s.footer.githubRepo)}
              </a>
              <a
                className="footer-link"
                href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md"
              >
                {t(lang, s => s.footer.codeOfConduct)}
              </a>
            </div>
          </footer>
        )}
      </AppContext.Consumer>
    );
  };
}

export default styled(Footer)`
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0 30px;
  font-size: 16px;
  line-height: 200%;
  justify-content: center;

  ${NON_LARGE_DEVICES} {
    font-size: 14px;
  }

  .netlify {
    margin-bottom: 10px;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > * {
      margin: 5px 10px;
    }
  }

  a.footer-link,
  button {
    font-size: 16px;
    line-height: 200%;
    color: #fff;
    font-weight: bold;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    ${NON_LARGE_DEVICES} {
      font-size: 14px;
    }

    &:hover {
      text-decoration: underline;
      color: #fff;
    }
  }
`;

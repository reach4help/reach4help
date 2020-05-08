import React from 'react';
import Cross from 'src/components/assets/cross';
import Hamburger from 'src/components/assets/hamburger';
import LogoType from 'src/components/assets/logo-type';
import { AppContext } from 'src/components/context';
import Languages from 'src/components/languages';
import SocialIcons from 'src/components/social-icons';
import { Language, t } from 'src/i18n';
import { Page } from 'src/state';
import styled, {
  LARGE_DEVICES,
  NON_LARGE_DEVICES,
  SMALL_DEVICES,
  Z_INDICES,
} from 'src/styling';
import { trackEvent } from 'src/util/tracking';

const MENU = ['about', 'map'] as const;

interface Props {
  className?: string;
  page: Page;
  setPage: (page: Page) => void;
}

interface State {
  open: boolean;
}

class Header extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  private toggle = () => this.setState(state => ({ open: !state.open }));

  private addActions = (lang: Language, displayLangAsButton: boolean) => {
    const { page, setPage } = this.props;
    return (
      <div className="actions">
        <Languages className="languages" button={displayLangAsButton} />
        <button
          className="add"
          type="button"
          onClick={() => {
            setPage(
              page.page === 'add-information'
                ? {
                    page: 'map',
                  }
                : {
                    page: 'add-information',
                    step: 'information',
                  },
            );
            trackEvent(
              'nav',
              page.page === 'add-information' ? 'back-to-map' : 'add-info',
            );
            this.setState({ open: false });
          }}
        >
          {t(
            lang,
            s =>
              s.addInformation[
                page.page === 'add-information' ? 'backToMap' : 'button'
              ],
          )}
        </button>
      </div>
    );
  };

  render = () => {
    const { open } = this.state;
    const { className, page, setPage } = this.props;
    return (
      <AppContext.Consumer>
        {({ lang }) => (
          <header className={className}>
            <div className="top">
              <div className="logo">
                <img src="/logo-compat.svg" alt="Reach4Help Logo" />
                <LogoType className="logo-type" />
              </div>
              <h1 className="title">{t(lang, s => s.title)}</h1>
              {this.addActions(lang, false)}
              <button type="button" className="hamburger" onClick={this.toggle}>
                {open ? <Cross /> : <Hamburger />}
              </button>
            </div>
            <div className={`secondary ${open ? 'open' : ''}`}>
              {this.addActions(lang, true)}
              <div className="menu">
                {MENU.map(p => (
                  <button
                    key={p}
                    className={page.page === p ? 'selected' : ''}
                    type="button"
                    onClick={() => {
                      trackEvent('nav', 'main', p);
                      setPage({ page: p });
                      this.setState({ open: false });
                    }}
                  >
                    {t(lang, s => s.menu[p])}
                  </button>
                ))}
              </div>
              <SocialIcons className="social-icons" />
            </div>
          </header>
        )}
      </AppContext.Consumer>
    );
  };
}

const TOP_HEIGHT = '70px';
const PADDING_HORIZONTAL = '50px';

export default styled(Header)`
  .actions {
    margin: 0 -6px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > .languages {
      margin: 6px;
    }

    > button {
      margin: 6px;
      background: ${p => p.theme.colors.brand.primaryDark};
      padding: 11px 30px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      color: #fff;
      outline: none;
      border: none;
      cursor: pointer;
      box-sizing: border-box;
      border-radius: 6px;
      white-space: nowrap;

      &: hover, &:focus {
        background: ${p => p.theme.colors.brand.primary};
      }
    }
  }

  > .top {
    z-index: ${Z_INDICES.HEADER_PRIMARY};
    height: ${TOP_HEIGHT};
    width: 100%;
    box-sizing: border-box;
    padding: 0 ${PADDING_HORIZONTAL};
    display: flex;
    align-items: center;
    position: relative;

    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(31, 0, 41, 0.3);

    ${NON_LARGE_DEVICES} {
      padding: 0 15px;
    }

    > .logo {
      flex-grow: 1;
      display: flex;
      align-items: center;

      img {
        width: 40px;
      }
      .logo-type {
        margin-left: 8px;
        margin-right: 8px;
        width: 108px;
      }

      ${NON_LARGE_DEVICES} {
        flex-grow: 0;
        img {
          width: 30px;
        }
        .logo-type {
          display: none;
        }
      }
    }

    > .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      margin: 0;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      line-height: ${TOP_HEIGHT};
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: -0.015em;
      pointer-events: none;

      ${NON_LARGE_DEVICES} {
        flex-grow: 1;
        position: relative;
        font-size: 20px;
      }

      ${SMALL_DEVICES} {
        font-size: 16px;
      }
    }

    > .actions {
      ${NON_LARGE_DEVICES} {
        display: none;
      }
    }

    > .hamburger {
      display: none;

      ${NON_LARGE_DEVICES} {
        display: block;
        margin: -10px;
        width: 50px;
        height: 50px;
        color: ${p => p.theme.colors.brand.primaryDark};
        background: none;
        border: none;
        outline: none;
        cursor: pointer;

        &:hover,
        &:focus {
          color: ${p => p.theme.colors.brand.primaryLight};
        }

        svg {
          width: 25px;
        }
      }
    }
  }

  > .secondary {
    position: relative;
    height: ${p => p.theme.secondaryHeaderSizePx}px;
    background: rgba(129, 30, 120, 0.95);
    box-shadow: 0px 4px 10px rgba(31, 0, 41, 0.1);
    margin-bottom: -40px;
    z-index: ${Z_INDICES.HEADER_SECONDARY};

    > .actions {
      justify-content: center;
      margin: 20px 0 10px;

      ${LARGE_DEVICES} {
        display: none;
      }
    }

    .menu {
      display: flex;
      justify-content: center;
      height: 100%;

      button {
        height: ${p => p.theme.secondaryHeaderSizePx}px;
        position: relative;
        margin: 0 25px;
        border: none;
        background: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.6);
        outline: none;

        &:hover,
        &:focus {
          color: #fff;
        }

        &.selected {
          color: #fff;

          &::after {
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -10px;
            display: block;
            content: '';
            width: 20px;
            height: 5px;
            background-color: ${p => p.theme.colors.brand.secondaryDark};
          }
        }
      }
    }

    > .social-icons {
      color: #fff;
      position: absolute;
      right: ${PADDING_HORIZONTAL};
      top: 0;
      bottom: 0;
      color: #fff;
      display: flex;
      align-items: center;

      [dir='rtl'] & {
        right: initial;
        left: ${PADDING_HORIZONTAL};
      }
    }

    ${NON_LARGE_DEVICES} {
      display: none;

      &.open {
        display: block;
        height: initial;
        position: absolute;
        background: #f8f8f8;
        top: ${TOP_HEIGHT};
        left: 0;
        right: 0;
      }

      .menu {
        flex-direction: column;

        button {
          margin: 10px 0;
          color: rgba(129, 30, 120, 0.6);

          &:hover,
          &:focus,
          &.selected {
            color: ${p => p.theme.colors.brand.primaryDark};
          }
        }
      }

      .social-icons {
        color: ${p => p.theme.colors.brand.primaryDark1};
        position: initial;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
`;

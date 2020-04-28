import React from 'react';
import LogoType from 'src/components/assets/logo-type';
import { AppContext } from 'src/components/context';
import Languages from 'src/components/languages';
import { t } from 'src/i18n';
import { Page } from 'src/state';
import styled from 'src/styling';

interface Props {
  className?: string;
  page: Page;
  setPage: (page: Page) => void;
}

const Header = (props: Props) => {
  const { className, page, setPage } = props;
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
            <div className="actions">
              <Languages className="languages" />
              <button
                className="add"
                type="button"
                onClick={() =>
                  setPage(
                    page.page === 'add-information'
                      ? {
                          page: 'map',
                        }
                      : {
                          page: 'add-information',
                          step: 'information',
                        },
                  )
                }
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
          </div>
          <div className="secondary" />
        </header>
      )}
    </AppContext.Consumer>
  );
};

export default styled(Header)`
  z-index: 150;
  > .top {
    height: 70px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 50px;
    display: flex;
    align-items: center;
    position: relative;

    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(31, 0, 41, 0.3);

    > * {
      z-index: 300;
    }

    > .title {
      z-index: 90;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      margin: 0;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      line-height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: -0.015em;
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
    }

    > .actions {
      display: flex;
      align-items: center;

      > .languages {
        margin: 0 24px;
        width: 130px;
      }

      > button {
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

        &: hover {
          background: ${p => p.theme.colors.brand.primary};
        }
      }
    }
  }

  > .secondary {
    height: ${p => p.theme.secondaryHeaderSizePx}px;
    background: rgba(129, 30, 120, 0.95);
    box-shadow: 0px 4px 10px rgba(31, 0, 41, 0.1);
    margin-bottom: -40px;
  }
`;

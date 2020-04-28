import React from 'react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { Filter } from 'src/data';
import { t } from 'src/i18n';
import { buttonPrimary, iconButton } from 'src/styling/mixins';

import styled, { SMALL_DEVICES } from '../styling';
import { AppContext } from './context';
import Filters, { FilterMutator } from './filters';

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
  fullScreen: boolean;
  toggleFullscreen: () => void;
}

const Header = (props: Props) => {
  const {
    className,
    filter,
    updateFilter,
    fullScreen,
    toggleFullscreen,
  } = props;
  const FullScreenIcon = fullScreen ? MdFullscreenExit : MdFullscreen;
  return (
    <AppContext.Consumer>
      {({ lang }) => (
        <header className={className}>
          {!fullScreen && (
            <div className="row">
              <div className="logo">
                <img src="/logo-compat.svg" alt="Reach4Help Logo" />
              </div>
              <div className="info">
                <h1>{t(lang, s => s.title)} - Reach4Help</h1>
                <p>{t(lang, s => s.info)}</p>
                <p className="muted">
                  {t(lang, s => s.about, {
                    reach4Help: key => (
                      <a key={key} href="https://reach4help.org">
                        reach4help.org
                      </a>
                    ),
                    githubSource: key => (
                      <a
                        key={key}
                        href="https://github.com/reach4help/reach4help/tree/master/map"
                      >
                        {t(lang, s => s.githubSourceLabel)}
                      </a>
                    ),
                    email: key => (
                      <a key={key} href="mailto:map@reach4help.org">
                        map@reach4help.org
                      </a>
                    ),
                  })}
                </p>
              </div>
            </div>
          )}
          <div className="tools">
            <Filters
              className="filters"
              filter={filter}
              updateFilter={updateFilter}
            />
            <div className="grow" />
            <button className="fs" type="button" onClick={toggleFullscreen}>
              <FullScreenIcon className="icon icon-start" />
              <span>
                {t(lang, s =>
                  fullScreen ? s.buttons.exitFullScreen : s.buttons.fullScreen,
                )}
              </span>
            </button>
          </div>
        </header>
      )}
    </AppContext.Consumer>
  );
};

export default styled(Header)`
  border-bottom: 1px solid ${p => p.theme.colors.grayLight2};

  .row {
    padding: ${p => p.theme.spacingPx / 2}px;
    display: flex;
    align-items: center;

    > .logo {
      padding: ${p => p.theme.spacingPx / 2}px;

      img {
        height: 150px;
      }
    }

    > .info {
      padding: ${p => p.theme.spacingPx / 2}px;
      flex-grow: 1;
      flex-basis: 0;
      > h1 {
        margin: 0;
        padding: 0 0 ${p => p.theme.spacingPx}px;
      }

      > p {
        margin: 0;
        padding: 0 0 ${p => p.theme.spacingPx}px;

        &.muted {
          color: ${p => p.theme.textColorLight};
          font-style: italic;

          a {
            color: ${p => p.theme.textColor};
          }
        }

        &:last-child {
          padding-bottom: 0;
        }
      }
    }
  }

  .tools {
    padding: 0 ${p => p.theme.spacingPx / 4}px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1px solid ${p => p.theme.colors.grayLight2};
    background: ${p => p.theme.colors.grayLight3};

    > .filters {
      padding: ${p => p.theme.spacingPx / 2}px;
    }

    .grow {
      flex-grow: 1;
    }

    > .fs,
    > .add {
      margin: ${p => p.theme.spacingPx / 2}px ${p => p.theme.spacingPx / 4}px;
      ${buttonPrimary};
      ${iconButton};
    }
  }

  ${SMALL_DEVICES} {
    .row {
      flex-direction: column;
    }

    .tools {
      display: none;
    }
  }
`;

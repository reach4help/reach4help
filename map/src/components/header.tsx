import React from 'react';
import { MdAdd, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { Filter } from 'src/data';
import { Internationalization, t } from 'src/i18n';
import { buttonPrimary, iconButton } from 'src/styling/mixins';

import styled, { CLS_SCREEN_LG_ONLY, SMALL_DEVICES } from '../styling';
import Filters, { FilterMutator } from './filters';
import Languages, { TranslateMutator } from './languages';

interface Props {
  className?: string;
  filter: Filter;
  i18n: Internationalization;
  updateFilter: (mutator: FilterMutator) => void;
  setAddInstructionsOpen: (open: boolean) => void;
  updateI18n: (mutator: TranslateMutator) => void;
  fullScreen: boolean;
  toggleFullscreen: () => void;
}

const Header = (props: Props) => {
  const {
    className,
    filter,
    updateFilter,
    setAddInstructionsOpen,
    fullScreen,
    toggleFullscreen,
    i18n,
    updateI18n,
  } = props;
  const FullScreenIcon = fullScreen ? MdFullscreenExit : MdFullscreen;
  return (
    <header className={className}>
      {!fullScreen && (
        <div className="row">
          <div className="logo">
            <img src="/logo-compat.svg" alt="Reach4Help Logo" />
          </div>
          <div className="info">
            <h1>{t(s => s.title)} - Reach4Help</h1>
            <p>{t(s => s.info)}</p>
            <p className="muted">
              {t(s => s.source1)}&nbsp;
              <a href="https://reach4help.org">reach4help.org</a>
              {t(s => s.source2)}&nbsp;
              <a href="https://github.com/reach4help/reach4help/tree/master/map">
                {t(s => s.source3)}
              </a>
              {t(s => s.source4)}&nbsp;
              <a href="mailto:map@reach4help.org">map@reach4help.org</a>.
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
        <Languages className="filters" i18n={i18n} updateI18n={updateI18n} />
        <div className="grow" />
        <button className="fs" type="button" onClick={toggleFullscreen}>
          <FullScreenIcon className="icon icon-left" />
          <span>
            {t(s =>
              fullScreen ? s.buttons.exitFullScreen : s.buttons.fullScreen,
            )}
          </span>
        </button>
        <button
          className="add"
          type="button"
          onClick={() => setAddInstructionsOpen(true)}
        >
          <MdAdd className="icon icon-left" />
          <span>
            {t(s => s.mdAdd1)}
            <span className={CLS_SCREEN_LG_ONLY}>&nbsp;{t(s => s.mdAdd2)}</span>
          </span>
        </button>
      </div>
    </header>
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

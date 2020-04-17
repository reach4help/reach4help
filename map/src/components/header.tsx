import React from 'react';
import { MdAdd, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { Filter } from 'src/data';
import { buttonPrimary, iconButton } from 'src/styling/mixins';

import styled, { CLS_SCREEN_LG_ONLY, SMALL_DEVICES } from '../styling';
import Filters, { FilterMutator } from './filters';

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
  setAddInstructionsOpen: (open: boolean) => void;
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
            <h1>COVID-19 Mutual Aid Map - Reach4Help</h1>
            <p>
              To help people find and join mutual aid efforts where they live,
              offer inspiration to start their own, and/or simply lift spirits,
              below is a growing list of mutual aid pandemic disaster care
              projects. Note: Each project is autonomous and self-organized;
              many use public spreadsheets to share information, so be careful
              when entering private information that you don&apos;t want to be
              public.
            </p>
            <p className="muted">
              This map is part of&nbsp;
              <a href="https://reach4help.org">reach4help.org</a>, a
              volunteer-run project. It is open source and can be&nbsp;
              <a href="https://github.com/reach4help/reach4help/tree/master/map">
                found on GitHub
              </a>
              . For any enquiries, you can reach us as at&nbsp;
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
        <div className="grow" />
        <button className="fs" type="button" onClick={toggleFullscreen}>
          <FullScreenIcon className="icon icon-left" />
          <span>{fullScreen && 'Exit '}Fullscreen</span>
        </button>
        <button
          className="add"
          type="button"
          onClick={() => setAddInstructionsOpen(true)}
        >
          <MdAdd className="icon icon-left" />
          <span>
            Add information
            <span className={CLS_SCREEN_LG_ONLY}>&nbsp;to this map</span>
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

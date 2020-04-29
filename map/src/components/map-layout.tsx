import React from 'react';
import MapLoader from 'src/components/map-loader';
import { Page } from 'src/state';
import styled, { LARGE_DEVICES } from 'src/styling';

import MyLocation from './my-location-button';
import Search from './search';

interface Props {
  className?: string;
  page: Page;
  components: {
    map: () => JSX.Element;
    results: (props: { className: string }) => JSX.Element;
  };
}

const MapLayout = (props: Props) => {
  const { className, components, page } = props;
  return (
    <div className={`${className} page-${page.page}`}>
      <MapLoader className="map" child={components.map} />
      <div className="overlay">
        <div className="panel">
          <div className="controls">
            <Search className="search" searchInputId="main" />
            <div className="row">
              <MyLocation className="my-location" />
            </div>
          </div>
          {components.results({
            className: 'results',
          })}
        </div>
      </div>
    </div>
  );
};

export default styled(MapLayout)`
  position: relative;
  margin-right: 0;
  transition: none;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  > .map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  > .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: ${p => p.theme.overlayPaddingPx}px;
    pointer-events: none;
    opacity: 0;
    transition: ${p => p.theme.opacityTransition};
    pointer-events: none;

    ${LARGE_DEVICES} {
      top: ${p => p.theme.secondaryHeaderSizePx}px;
    }

    > .panel {
      width: ${p => p.theme.overlayPanelWidthPx}px;
      display: flex;
      flex-direction: column;

      > .controls {
        background: #fff;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 9px 8px;
        display: flex;
        flex-direction: column;

        .row {
          display: flex;
        }

        .search,
        .my-location {
          margin: 9px 8px;
        }
      }

      > .results {
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        overflow: hidden;
      }
    }
  }

  &.page-map {
    > .overlay {
      opacity: 1;
      > .panel {
        pointer-events: initial;
      }
    }
  }
`;

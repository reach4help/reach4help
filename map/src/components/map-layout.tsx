import React from 'react';
import MapLoader from 'src/components/map-loader';
import { Filter } from 'src/data';
import { Page } from 'src/state';
import styled, { LARGE_DEVICES, SMALL_DEVICES } from 'src/styling';

import FilterType, { FilterMutator } from './filter-type';
import MyLocation from './my-location-button';
import Search from './search';

interface Props {
  className?: string;
  page: Page;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
  components: {
    map: () => JSX.Element;
    results: (props: { className: string }) => JSX.Element;
  };
}

const MapLayout = (props: Props) => {
  const { className, components, page, filter, updateFilter } = props;
  return (
    <div className={`${className} page-${page.page}`}>
      <MapLoader className="map" child={components.map} />
      <div className="overlay">
        <div className="panel">
          <div className="controls">
            <div className="row">
              <Search className="search" searchInputId="main" />
            </div>
            <div className="row">
              <FilterType
                className="filter-type"
                filter={filter}
                updateFilter={updateFilter}
              />
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
    opacity: 0;
    transition: opacity ${p => p.theme.transitionSpeedNormal};
    pointer-events: none;

    ${LARGE_DEVICES} {
      top: ${p => p.theme.secondaryHeaderSizePx}px;
      padding: ${p => p.theme.overlayPaddingLargePx}px;
    }

    > .panel {
      width: ${p => p.theme.overlayPanelWidthPx}px;
      display: flex;
      flex-direction: column;

      ${SMALL_DEVICES} {
        width: initial;
        flex-grow: 1;
      }

      > .controls {
        background: #fff;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 9px 8px;
        display: flex;
        flex-direction: column;
        pointer-events: initial;

        .row {
          display: flex;
          flex-wrap: wrap;
        }

        .search,
        .my-location,
        .filter-type {
          margin: 9px 8px;
          flex-grow: 1;
          flex-basis: 40%;
        }
      }
    }
  }

  &.page-map {
    > .overlay {
      opacity: 1;
    }
  }
`;

import React from 'react';
import MapLoader from 'src/components/map-loader';
import { Page } from 'src/state';
import styled from 'src/styling';

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
    padding: 40px;
    pointer-events: none;
    opacity: 0;
    transition: ${p => p.theme.opacityTransition};
    pointer-events: none;

    > .panel {
      width: 320px;
      display: flex;
      flex-direction: column;

      > .results {
        height: 0;
        flex-grow: 1;
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

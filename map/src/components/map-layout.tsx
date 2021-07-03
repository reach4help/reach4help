/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/destructuring-assignment */
import {
  MARKER_TYPE_STRINGS,
  SERVICE_STRINGS,
} from '@reach4help/model/lib/markers/type';
import React from 'react';
import Chevron from 'src/components/assets/chevron';
import MapLoader from 'src/components/map-loader';
import * as dataDriver from 'src/data/dataDriver';
import { Filter, Page, UpdateFilter } from 'src/state';
import styled, { LARGE_DEVICES, SMALL_DEVICES } from 'src/styling';

import DropDown from './drop-down';
import MyLocation from './my-location-button';
import Search from './search';

interface Props {
  className?: string;
  page: Page;
  filter: Filter;
  updateFilter: UpdateFilter;
  searchOpen: boolean;
  setSearchOpen: (searchOpen: boolean) => void;
  components: {
    map: () => JSX.Element;
    results: (props: { className: string }) => JSX.Element;
  };
}

interface State {
  includingHidden: boolean;
}

class MapLayout extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      includingHidden: dataDriver.includingHidden(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount() {
    dataDriver.addInformationListener(this.dataDriverInformationUpdated);
  }

  public componentWillUnmount() {
    dataDriver.removeInformationListener(this.dataDriverInformationUpdated);
  }

  private dataDriverInformationUpdated: dataDriver.InformationListener = update =>
    this.setState({ includingHidden: update.includingHidden });

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const textValue = e.target.value;
    this.props.updateFilter('searchText', textValue);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.props.updateFilter('filterExecuted', false);
    e.preventDefault();
  }

  public render() {
    const {
      className,
      components,
      page,
      filter,
      updateFilter,
      searchOpen,
      setSearchOpen,
    } = this.props;
    const { includingHidden } = this.state;
    return (
      <div className={`${className} page-${page.page}`}>
        <MapLoader className="map" child={components.map} />
        <div className="overlay">
          <div className="panel">
            <div
              className={`controls ${searchOpen ? 'open' : ''}
            `}
            >
              <button
                type="button"
                className="header"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <span className="count">
                  {/* {format(
                  lang,
                  s =>
                    selectedResult
                      ? s.results.backToResults
                      : open
                      ? s.results.closeResults
                      : s.results.openResults,
                  {
                    results: (results?.results || []).length,
                  },
                )} */}
                  Placeholder for search bar.
                </span>
                <span className="grow" />
                <Chevron className="toggle chevron" />
              </button>
              <form onSubmit={this.handleSubmit} className="form">
                <div className="row">
                  <Search className="search" searchInputId="main" />
                </div>
                <div className="row">
                  <MyLocation className="my-location" />
                </div>
                <div className="row">
                  <input
                    type="text"
                    className="filter"
                    placeholder="Search text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="row">
                  <DropDown
                    className="filter"
                    translationKey="markerTypes"
                    filterScreenField="markerTypes"
                    dropDownValues={MARKER_TYPE_STRINGS}
                    filter={filter}
                    updateFilter={updateFilter}
                  />
                  <DropDown
                    className="filter"
                    translationKey="services"
                    filterScreenField="services"
                    dropDownValues={SERVICE_STRINGS}
                    filter={filter}
                    updateFilter={updateFilter}
                  />
                </div>
                {includingHidden && (
                  <div className="row">
                    <DropDown
                      className="filter"
                      translationKey="hiddenMarkers.filter"
                      filterScreenField="hiddenMarkers"
                      dropDownValues={['visible', 'hidden']}
                      filter={filter}
                      updateFilter={updateFilter}
                    />
                  </div>
                )}
                <input type="submit" value="Search" />
              </form>
            </div>
            {components.results({
              className: 'results',
            })}
          </div>
        </div>
      </div>
    );
  }
}

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

        > .row {
          display: flex;
          flex-wrap: wrap;
        }

        > .search,
        > .my-location,
        > .filter {
          margin: 9px 8px;
          flex-grow: 1;
          flex-basis: 40%;
        }

        > button.header {
          background: #d9bbd6;
          cursor: pointer;
          outline: none;
          border: none;
          display: flex;
          color: ${p => p.theme.colors.brand.primaryDark};
          padding: 5px 8px;
          align-items: center;
          pointer-events: initial;

          > .chevron,
          .count {
            margin: 0 8px;
          }

          > .count {
            font-weight: bold;
            font-size: 14px;
            line-height: 22px;
            white-space: nowrap;
          }

          > .grow {
            flex-grow: 1;
          }

          > .chevron.toggle {
            transition: opacity ${p => p.theme.transitionSpeedQuick};
          }

          &:hover,
          &:focus {
            color: rgb(129, 30, 120, 0.7);
          }
        }

        > .form {
          display: none;
        }

        &.open {
          > .header > .chevron.toggle {
            transform: rotate(180deg);
          }

          > .form {
            display: block;
          }
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
